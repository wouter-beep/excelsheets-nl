/**
 * E-mail verzenden.
 * - Productie: SMTP via SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS (werkt met o.a. Postmark,
 *   Mailgun, Amazon SES, Microsoft 365 of de eigen mailserver) en EMAIL_FROM.
 * - Lokale demomodus (geen SMTP_HOST): e-mails worden NIET verstuurd maar als HTML-bestand
 *   bewaard in storage/private/outbox, zodat je ze kunt bekijken. Dit staat duidelijk in de log.
 * Logregels bevatten nooit e-mailadressen of inhoud, alleen het onderwerp-type en aanvraagnummer.
 */
import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";

export type Mail = { to: string | string[]; subject: string; html: string; text: string; replyTo?: string; tag: string; attachments?: { filename: string; content: Buffer }[] };

export const emailMode = () => (process.env.SMTP_HOST ? "smtp" : "demo") as "smtp" | "demo";

let transport: nodemailer.Transporter | null = null;
function getTransport() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }
  return transport;
}

export async function sendMail(m: Mail): Promise<{ ok: boolean; mode: "smtp" | "demo" }> {
  const recipients = (Array.isArray(m.to) ? m.to : [m.to]).filter(Boolean);
  if (recipients.length === 0 && emailMode() === "smtp") return { ok: false, mode: "smtp" };
  if (emailMode() === "demo") {
    const dir = path.resolve(process.env.STORAGE_DIR || path.join(process.cwd(), "storage", "private"), "outbox");
    await mkdir(dir, { recursive: true });
    const file = path.join(dir, `${new Date().toISOString().replace(/[:.]/g, "-")}-${m.tag}.html`);
    await writeFile(file, `<!-- DEMOMODUS: niet verzonden. Aan: ${recipients.join(", ") || "(nog geen ontvanger ingesteld: ADMIN_NOTIFY_EMAILS)"} | Onderwerp: ${m.subject} -->\n${m.html}`);
    console.info(`[e-mail:demo] "${m.tag}" niet verzonden (geen SMTP_HOST); opgeslagen in outbox.`);
    return { ok: true, mode: "demo" };
  }
  try {
    await getTransport().sendMail({
      from: process.env.EMAIL_FROM || "ExcelSheets.nl <no-reply@excelsheets.nl>",
      to: recipients, subject: m.subject, html: m.html, text: m.text, replyTo: m.replyTo, attachments: m.attachments,
    });
    return { ok: true, mode: "smtp" };
  } catch (e) {
    console.error(`[e-mail] verzenden "${m.tag}" mislukt: ${(e as Error).message}`);
    return { ok: false, mode: "smtp" };
  }
}

/* ---------- Sjablonen in de huisstijl ---------- */
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

export function layout(opts: { preheader: string; title: string; body: string; footer?: string }) {
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(opts.title)}</title></head>
<body style="margin:0;background:#F8FAF7;font-family:Inter,Segoe UI,Arial,sans-serif;color:#14231C">
<span style="display:none;max-height:0;overflow:hidden">${esc(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAF7;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #E3E9E5">
<tr><td style="background:#073B2A;padding:22px 28px">
 <table role="presentation" cellpadding="0" cellspacing="0"><tr>
  <td style="padding-right:10px"><table role="presentation" cellpadding="0" cellspacing="2">${[0, 1, 2].map((r) => `<tr>${[0, 1, 2].map((c) => `<td style="width:7px;height:7px;border-radius:2px;background:${(r === 2 && c === 0) || (r === 1 && c <= 1) || (r === 0) ? (r + c >= 2 ? "#18B979" : "#147D52") : "#0E5A3E"}"></td>`).join("")}</tr>`).join("")}</table></td>
  <td style="font-family:Manrope,Segoe UI,Arial,sans-serif;font-size:18px;font-weight:800;color:#ffffff">Excel<span style="color:#18B979">Sheets</span><span style="color:#CBF8E0;font-weight:500;font-size:14px">.nl</span></td>
 </tr></table>
</td></tr>
<tr><td style="padding:32px 28px 8px"><h1 style="margin:0 0 16px;font-family:Manrope,Segoe UI,Arial,sans-serif;font-size:24px;line-height:1.25;color:#073B2A">${esc(opts.title)}</h1>${opts.body}</td></tr>
<tr><td style="padding:20px 28px 28px;font-size:12px;line-height:1.6;color:#6B7A72;border-top:1px solid #EEF2EF">${opts.footer ?? "ExcelSheets.nl · Excel op maat voor bedrijven. Je ontvangt deze e-mail omdat je een aanvraag deed via excelsheets.nl."}</td></tr>
</table></td></tr></table></body></html>`;
}

type SummaryRow = [string, string];
const table = (rows: SummaryRow[]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:8px 0 20px">${rows
  .filter(([, v]) => v)
  .map(([k, v], i) => `<tr><td style="width:34%;padding:10px 12px;vertical-align:top;background:${i % 2 ? "#ffffff" : "#F2FDF7"};color:#4A5A52;font-weight:600;border-bottom:1px solid #E3E9E5">${esc(k)}</td><td style="padding:10px 12px;vertical-align:top;background:${i % 2 ? "#ffffff" : "#F2FDF7"};border-bottom:1px solid #E3E9E5">${nl2br(v)}</td></tr>`)
  .join("")}</table>`;
const button = (href: string, label: string) => `<p style="margin:24px 0"><a href="${esc(href)}" style="display:inline-block;background:#18B979;color:#073B2A;font-weight:700;text-decoration:none;padding:13px 22px;border-radius:999px">${esc(label)}</a></p>`;

export function confirmationEmail(p: { name: string; number: string; summary: string; rows: SummaryRow[]; downloadUrl: string; responseTime: string; files: number }) {
  const first = p.name.split(" ")[0];
  const body = `<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Hoi ${esc(first)},</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Bedankt voor je aanvraag. We hebben hem goed ontvangen onder nummer <strong style="font-family:JetBrains Mono,Consolas,monospace">${esc(p.number)}</strong>. ${esc(p.responseTime)}</p>
<div style="margin:20px 0;padding:16px 18px;border-left:4px solid #18B979;background:#F2FDF7;border-radius:8px;font-size:16px;line-height:1.5;font-weight:600;color:#073B2A">${nl2br(p.summary)}</div>
${table(p.rows)}
${p.files ? `<p style="margin:0 0 14px;font-size:14px;color:#4A5A52">Je hebt ${p.files} bestand(en) meegestuurd. Die zijn afgeschermd opgeslagen en alleen zichtbaar voor de mensen die je aanvraag behandelen.</p>` : ""}
${button(p.downloadUrl, "Download je samenvatting (.xlsx)")}
<p style="margin:0 0 14px;font-size:15px;line-height:1.6"><strong>Wat gebeurt er nu?</strong><br>We lezen je aanvraag door en nemen contact met je op voor een kort kennismakingsgesprek. Daarin stellen we de vragen die nodig zijn om een goed voorstel te maken. Je zit nergens aan vast.</p>
<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Wil je iets aanvullen? Beantwoord deze e-mail en vermeld je aanvraagnummer.</p>`;
  const text = `Hoi ${first},\n\nBedankt voor je aanvraag (${p.number}). ${p.responseTime}\n\n${p.summary}\n\n${p.rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nSamenvatting downloaden: ${p.downloadUrl}\n\nWil je iets aanvullen? Beantwoord deze e-mail en vermeld je aanvraagnummer.\n\nExcelSheets.nl`;
  return { subject: `Je Excel-aanvraag ${p.number} is ontvangen`, html: layout({ preheader: `Aanvraag ${p.number} ontvangen: ${p.summary.slice(0, 90)}`, title: "We hebben je aanvraag ontvangen", body }), text };
}

export function adminNotificationEmail(p: { number: string; adminUrl: string; contact: { name: string; company: string; email: string; phone?: string; preferred: string }; summary: string; classification: { type: string; complexity: string; urgency: string; expertise: string[]; followUps: string[] }; files: { name: string; scan: string }[]; rows: SummaryRow[] }) {
  const c = p.classification;
  const body = `<p style="margin:0 0 6px;font-size:13px;color:#6B7A72;font-family:JetBrains Mono,Consolas,monospace">${esc(p.number)}</p>
<div style="margin:0 0 18px;padding:14px 16px;border-left:4px solid #18B979;background:#F2FDF7;border-radius:8px;font-size:15px;font-weight:600;color:#073B2A">${nl2br(p.summary)}</div>
${table([["Contact", `${p.contact.name} (${p.contact.company})`], ["E-mail", p.contact.email], ["Telefoon", p.contact.phone ?? ""], ["Voorkeur", p.contact.preferred === "telefoon" ? "Telefonisch" : "E-mail"], ["Type", c.type], ["Complexiteit", c.complexity], ["Urgentie", c.urgency], ["Expertise", c.expertise.join(", ")], ...p.rows])}
${p.files.length ? `<p style="font-size:14px;margin:0 0 6px"><strong>Bijlagen</strong></p><ul style="font-size:14px;margin:0 0 16px;padding-left:18px">${p.files.map((f) => `<li>${esc(f.name)} · scan: ${esc(f.scan)}</li>`).join("")}</ul>` : ""}
${c.followUps.length ? `<p style="font-size:14px;margin:0 0 6px"><strong>Voorgestelde vervolgvragen</strong></p><ul style="font-size:14px;margin:0 0 16px;padding-left:18px">${c.followUps.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
${button(p.adminUrl, "Open in het beheer")}
<p style="font-size:12px;color:#6B7A72">Bijlagen worden niet per e-mail meegestuurd. Download ze in het beheer.</p>`;
  return {
    subject: `Nieuwe aanvraag ${p.number}: ${c.type} (${c.complexity.toLowerCase()})`,
    html: layout({ preheader: p.summary.slice(0, 100), title: "Nieuwe Excel-aanvraag", body, footer: "Interne melding ExcelSheets.nl. Bevat persoonsgegevens: niet doorsturen buiten de organisatie." }),
    text: `Nieuwe aanvraag ${p.number}\n${p.summary}\n\n${p.contact.name} (${p.contact.company}) ${p.contact.email}\nType: ${c.type} · Complexiteit: ${c.complexity} · Urgentie: ${c.urgency}\n\n${p.adminUrl}`,
  };
}
