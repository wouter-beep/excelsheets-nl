"use client";
import { useActionState } from "react";
import { login } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="mt-6 space-y-4">
      <div><label htmlFor="email" className="label">E-mailadres</label><input id="email" name="email" type="email" autoComplete="username" required className="input" /></div>
      <div><label htmlFor="password" className="label">Wachtwoord</label><input id="password" name="password" type="password" autoComplete="current-password" required className="input" /></div>
      {state?.error && <p role="alert" className="rounded-lg bg-coral-100 px-3 py-2 text-[14px] text-coral">{state.error}</p>}
      <button disabled={pending} className="btn-dark w-full">{pending ? "Bezig…" : "Inloggen"}</button>
    </form>
  );
}
