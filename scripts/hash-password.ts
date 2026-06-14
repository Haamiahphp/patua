import bcrypt from "bcryptjs";

const plain = process.argv[2];
if (!plain) {
  console.error("uso: bun run scripts/hash-password.ts <senha>");
  process.exit(1);
}
console.log(await bcrypt.hash(plain, 10));
