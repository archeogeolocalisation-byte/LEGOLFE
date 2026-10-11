/* eslint-disable @typescript-eslint/no-require-imports */
// Execute the actual form handlers with isolated state and a mocked Auth service.
// No email, account or password is sent to a live Supabase project.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
for (const extension of [".ts", ".tsx"]) {
  require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, filename);
}
let values = [], index = 0, calls = [], result = { data: { session: null }, error: null };
const userId = "11111111-1111-4111-8111-111111111111";
let currentId = userId, authenticated = 0, saved = 0;
const auth = {
  signUp: async input => { calls.push(["signup", input]); return result; },
  signInWithPassword: async input => { calls.push(["signin", input]); return result; },
  resetPasswordForEmail: async (...input) => { calls.push(["reset", ...input]); return result; },
  getUser: async () => ({ data: { user: { id: currentId } }, error: null }),
  updateUser: async input => { calls.push(["update", input]); return result; },
};
const load = Module._load;
Module._load = function(request, parent, ...rest) {
  if (parent?.filename.includes("/components/Account") && request === "react") return {
    ...load.call(this, request, parent, ...rest),
    useState(initial) {
      const slot = index++;
      if (!(slot in values)) values[slot] = initial;
      return [values[slot], value => { values[slot] = typeof value === "function" ? value(values[slot]) : value; }];
    },
  };
  if (parent?.filename.includes("/components/Account") && request === "../lib/supabase") return { supabase: { auth } };
  return load.call(this, request, parent, ...rest);
};
global.window = { location: { origin: "https://www.legolfe.com" } };
const AuthForm = require("../components/AccountAuthForm.tsx").default;
const PasswordForm = require("../components/AccountPasswordForm.tsx").default;
const { accountType, matchingPasswords } = require("../lib/accountTypes.ts");
const render = (Component, props) => { index = 0; return Component(props); };
const props = { locale: "fr", onAuthenticated: () => { authenticated++; } };
function nodes(element) {
  if (!element || typeof element !== "object") return [];
  if (Array.isArray(element)) return element.flatMap(nodes);
  return [element, ...nodes(element.props?.children)];
}
const find = (tree, predicate) => {
  const node = nodes(tree).find(predicate);
  assert.ok(node, "Expected form control"); return node;
};
const input = (tree, predicate, value) => find(tree, n => n.type === "input" && predicate(n.props)).props.onChange({ target: { value } });
const submit = tree => find(tree, n => n.type === "form").props.onSubmit({ preventDefault() {} });
const reset = () => { values = []; calls = []; result = { data: { session: null }, error: null }; currentId = userId; };
let checks = 0;
function equal(a, b) { assert.deepEqual(a, b); checks++; }
(async () => {
  for (const invalid of ["admin", "moderator", "agency", {}, undefined]) equal(accountType(invalid), null);
  for (const valid of ["traveler", "owner", "concierge"]) equal(accountType(valid), valid);
  equal(matchingPasswords("a".repeat(12), "a".repeat(12)), true);
  equal(matchingPasswords("a".repeat(11), "a".repeat(11)), false);
  equal(matchingPasswords("a".repeat(129), "a".repeat(129)), false);
  equal(matchingPasswords("a".repeat(12), "b".repeat(12)), false);
  let tree = render(AuthForm, props);
  input(tree, p => p.type === "email", " guest@example.invalid ");
  input(tree, p => p.type === "password", "existing-password");
  await submit(render(AuthForm, props));
  equal(calls[0], ["signin", { email: "guest@example.invalid", password: "existing-password" }]);
  equal(authenticated, 1);
  equal(nodes(render(AuthForm, props)).find(n => n.type === "input" && n.props.type === "password").props.value, "");
  reset(); tree = render(AuthForm, props);
  find(tree, n => n.type === "button" && n.props.children === "Créer un compte").props.onClick();
  tree = render(AuthForm, props);
  input(tree, p => p.autoComplete === "nickname", "Guest");
  input(tree, p => p.type === "email", "guest@example.invalid");
  const passwords = nodes(tree).filter(n => n.type === "input" && n.props.type === "password");
  passwords[0].props.onChange({ target: { value: "safe-test-password" } });
  passwords[1].props.onChange({ target: { value: "different-test-password" } });
  await submit(render(AuthForm, props));
  equal(calls.length, 0);
  passwords[1].props.onChange({ target: { value: "safe-test-password" } });
  find(tree, n => typeof n.type === "function" && n.props.onChange && n.props.value === "traveler").props.onChange("concierge");
  await submit(render(AuthForm, props));
  equal(calls[0], ["signup", {
    email: "guest@example.invalid", password: "safe-test-password",
    options: { emailRedirectTo: "https://www.legolfe.com/fr/account", data: { legolfe_account_type: "concierge", legolfe_display_name: "Guest" } },
  }]);
  equal(authenticated, 1); // confirmation required: no session yet
  equal(nodes(render(AuthForm, props)).filter(n => n.type === "input" && n.props.type === "password").map(n => n.props.value), ["", ""]);
  reset(); tree = render(AuthForm, props);
  find(tree, n => n.type === "button" && typeof n.props.children === "string" && n.props.children.startsWith("Mot de passe oublié")).props.onClick();
  tree = render(AuthForm, props); input(tree, p => p.type === "email", "guest@example.invalid");
  await submit(render(AuthForm, props));
  equal(calls[0], ["reset", "guest@example.invalid", { redirectTo: "https://www.legolfe.com/fr/account/password" }]);
  reset();
  const passwordProps = { fr: true, recovery: true, userId, onSaved: () => { saved++; } };
  tree = render(PasswordForm, passwordProps);
  const newInputs = nodes(tree).filter(n => n.type === "input" && n.props.autoComplete === "new-password");
  for (const field of newInputs) field.props.onChange({ target: { value: "safe-test-password" } });
  currentId = "22222222-2222-4222-8222-222222222222";
  await submit(render(PasswordForm, passwordProps));
  equal(calls.length, 0); // account changed before submission
  currentId = userId;
  await submit(render(PasswordForm, passwordProps));
  equal(calls[0], ["update", { password: "safe-test-password" }]);
  equal(saved, 1);
  equal(nodes(render(PasswordForm, passwordProps)).filter(n => n.type === "input").map(n => n.props.value), ["", ""]);
  reset();
  tree = render(PasswordForm, { ...passwordProps, recovery: false });
  input(tree, p => p.autoComplete === "current-password", "old-test-password");
  for (const field of nodes(tree).filter(n => n.type === "input" && n.props.autoComplete === "new-password")) field.props.onChange({ target: { value: "safe-test-password" } });
  await submit(render(PasswordForm, { ...passwordProps, recovery: false }));
  equal(calls[0], ["update", { password: "safe-test-password", current_password: "old-test-password" }]);
  console.log("Account forms: " + checks + " assertions passed; no live Auth requests.");
})().catch(error => { console.error(error); process.exitCode = 1; });
