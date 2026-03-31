import process from "node:process";

import { startErpProUiMcpServer } from "./server.js";

async function main(): Promise<void> {
  await startErpProUiMcpServer();
}

void main().catch((error: unknown) => {
  const message =
    error instanceof Error
      ? `${error.message}${error.stack ? `\n${error.stack}` : ""}`
      : String(error);

  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
