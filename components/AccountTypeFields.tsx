"use client";
import { ACCOUNT_TYPES, accountTypeLabel, type AccountType } from "../lib/accountTypes";

export default function AccountTypeFields({ value, onChange, fr }: {
  value: AccountType; onChange: (value: AccountType) => void; fr: boolean;
}) {
  return <fieldset className="mt-7">
    <legend className="lg-kicker">{fr ? "VOTRE PROFIL LE GOLFE" : "YOUR LE GOLFE PROFILE"}</legend>
    <div className="mt-4 grid gap-3">
      {ACCOUNT_TYPES.map(type => <label key={type} className={"flex cursor-pointer items-center gap-3 border p-4 text-sm font-bold " + (value === type ? "border-black bg-neutral-50" : "border-black/20")}>
        <input type="radio" name="legolfe-account-type" value={type} checked={value === type} onChange={() => onChange(type)} />
        {accountTypeLabel(type, fr)}
      </label>)}
    </div>
  </fieldset>;
}
