import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/index";
const devServer = setupWorker(...handlers);

await devServer.start({
  quiet: true,
  onUnhandledRequest: "bypass",
  serviceWorker: {
    url: "./mockServiceWorker.js",
  },
});

export * from "msw";
export { devServer };
