export const ACCOUNT_TYPES = ["traveler", "owner", "concierge"] as const;
export type AccountType = typeof ACCOUNT_TYPES[number];

// A self-declared LE GOLFE preference. Never use this metadata for authorization.
// House access remains enforced by owner_id/RLS; moderation by its own allowlist.
export function accountType(value: unknown): AccountType | null {
  return value === "traveler" || value === "owner" || value === "concierge" ? value : null;
}

export function accountTypeLabel(type: AccountType, fr: boolean): string {
  return {
    traveler: fr ? "Voyageur / touriste" : "Traveler",
    owner: fr ? "Propriétaire" : "Property owner",
    concierge: fr ? "Conciergerie / agence" : "Concierge / agency",
  }[type];
}

export function matchingPasswords(password: string, confirmation: string): boolean {
  return password.length >= 12 && password.length <= 128 && password === confirmation;
}
