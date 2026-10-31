"use server";
import { redirect } from "next/navigation";
import { destroySession } from "@/lib/server/auth";
export async function logout() { await destroySession(); redirect("/admin/login"); }
