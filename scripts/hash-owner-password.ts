import { hashOwnerPassword } from "../src/auth/password";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run owner:hash-password -- "choose-a-strong-password"');
  process.exit(1);
}

hashOwnerPassword(password)
  .then((hash) => {
    console.log("Set this as WONDER_OWNER_PASSWORD_HASH (keep the password itself private):");
    console.log(hash);
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
