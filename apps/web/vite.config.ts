import path from "path";
import { createReactAppViteConfig } from "@erp-pro/vite-config";

const uiPackageRoot = path.resolve(__dirname, "../../packages/ui");

export default createReactAppViteConfig({
  appDir: __dirname,
  uiPackageRoot,
  base: "/erp-pro-ui/",
});
