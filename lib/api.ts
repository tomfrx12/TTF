import { NextResponse } from "next/server";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function getRequiredString(value: unknown, fieldName: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${fieldName} est requis`);
  }

  return value.trim();
}

export function getOptionalString(value: unknown) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error("Valeur invalide");
  }

  return value.trim();
}

export function getOptionalBoolean(value: unknown) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "boolean") {
    throw new Error("Valeur booléenne invalide");
  }

  return value;
}

export function getOptionalNumberArray(value: unknown) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (!Array.isArray(value) || value.some((item) => typeof item !== "number" || !Number.isInteger(item))) {
    throw new Error("Tableau de nombres invalide");
  }

  return value;
}

export async function parseJsonBody(request: Request) {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    throw new Error("JSON invalide");
  }
}

export function toSafeUser<T extends { password: string }>(user: T) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function validatePassword(password: string) {
  if (password.length < 8) throw new Error("Le mot de passe doit faire au moins 8 caractères");
}

export function validateEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Email invalide");
}
