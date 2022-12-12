import { randomBytes } from "crypto";
import { writeFile } from "fs/promises";

//Do it first or use a temp file to reinject temp var of .env
await writeFile(
  ".env",
  `JWT_SECRET='${randomBytes(128).toString("hex")}'`,
  "utf-8"
  //   { flag: "a+" } supposed to write at the end of file but not working
);
