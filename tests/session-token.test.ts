import { beforeAll, describe, expect, it } from "vitest";
import { signSession, verifySession } from "@/lib/server/session-token";

beforeAll(() => { process.env.AUTH_SECRET = "test-secret-dat-lang-genoeg-is-voor-hs256-0123456789"; });

describe("session token", () => {
  it("ondertekent en controleert", async () => {
    const tok = await signSession({ sub: "u1", role: "ADMIN", v: 3 });
    expect(await verifySession(tok)).toEqual({ sub: "u1", role: "ADMIN", v: 3 });
  });
  it("weigert een gemanipuleerde token", async () => {
    const tok = await signSession({ sub: "u1", role: "SALES", v: 1 });
    const [h, p, s] = tok.split(".");
    const forged = Buffer.from(JSON.stringify({ ...JSON.parse(Buffer.from(p, "base64url").toString()), role: "OWNER" })).toString("base64url");
    expect(await verifySession(`${h}.${forged}.${s}`)).toBeNull();
  });
  it("weigert een token met een ander geheim", async () => {
    const tok = await signSession({ sub: "u1", role: "ADMIN", v: 1 });
    process.env.AUTH_SECRET = "een-heel-ander-geheim-van-minstens-32-tekens-lang";
    expect(await verifySession(tok)).toBeNull();
  });
  it("weigert een te kort geheim", async () => {
    process.env.AUTH_SECRET = "kort";
    await expect(signSession({ sub: "x", role: "ADMIN", v: 1 })).rejects.toThrow();
  });
});
