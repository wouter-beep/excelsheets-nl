import { allArticles, TOPICS, SERVICE_LINK_LABEL } from "../src/content/articles";
import { demoModels } from "../src/content/models";
const nums = allArticles.map(a=>a.number); const slugs = new Set<string>();
const topicSet = new Set<string>(TOPICS.map(t=>t.slug)); const svc = new Set(Object.keys(SERVICE_LINK_LABEL));
const models = new Set((demoModels as any[]).map(m=>m.slug));
const articleSlugs = new Map(allArticles.map(a=>[a.slug,a.subjectYear]));
let wcs:number[]=[]; let problems:string[]=[];
for (const a of allArticles) {
  if (slugs.has(a.slug)) problems.push("dup slug "+a.slug); slugs.add(a.slug);
  const wc = (a.summary+" "+a.body+" "+a.practice).split(/\s+/).length; wcs.push(wc);
  if (wc<400||wc>800) problems.push(`${a.number} words ${wc}`);
  a.topics.forEach(t=>{ if(!topicSet.has(t)) problems.push(`${a.number} topic ${t}`)});
  a.serviceLinks.forEach(t=>{ if(!svc.has(t)) problems.push(`${a.number} svc ${t}`)});
  for (const m of a.body.matchAll(/\]\((\/[^)]*)\)/g)) {
    const h=m[1]; let mm;
    if ((mm=/^\/diensten\/(.+)$/.exec(h)) && !svc.has(mm[1])) problems.push(`${a.number} link ${h}`);
    if ((mm=/^\/voorbeelden\/(.+)$/.exec(h)) && !models.has(mm[1])) problems.push(`${a.number} link ${h}`);
    if ((mm=/^\/excel-door-de-jaren\/(\d{4})\/(.+)$/.exec(h)) && articleSlugs.get(mm[2])!==+mm[1]) problems.push(`${a.number} link ${h}`);
  }
}
for (let i=1;i<=100;i++) if(!nums.includes(i)) problems.push("missing "+i);
console.log("count",allArticles.length,"min",Math.min(...wcs),"max",Math.max(...wcs),"avg",Math.round(wcs.reduce((a,b)=>a+b)/wcs.length));
console.log("REVIEW", allArticles.filter(a=>a.status==="REVIEW").map(a=>a.number).join(","));
console.log(problems.join("\n")||"no problems");
