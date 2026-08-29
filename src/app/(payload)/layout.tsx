import "@payloadcms/next/css";
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClientArgs } from "payload";
import type { ReactNode } from "react";

import { importMap } from "./admin/importMap";

export default function Layout({ children }: { children: ReactNode }) {
  async function serverFunction(args: ServerFunctionClientArgs) {
    "use server";

    return handleServerFunctions({
      ...args,
      config,
      importMap,
    });
  }

  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
    >
      {children}
    </RootLayout>
  );
}
