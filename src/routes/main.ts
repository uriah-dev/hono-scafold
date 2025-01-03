import { auth } from "../lib/auth";
import { cors } from "hono/cors";
import { corsOpts } from "../utils";
import { env } from "../env";
import { app } from "../main";
import { routes } from "./route";
import { serve } from "@hono/node-server";
import { contextStorage } from "hono/context-storage";

export const start = async () => {
  app.use("*", cors(corsOpts));

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return await next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return await next();
  });

  app.use(contextStorage());

  app.on(["POST", "GET"], ["/api/auth/**"], (c) => {
    return auth.handler(c.req.raw);
  });

  // Registers defined routes
  routes();

  const port = Number(env.PORT);
  console.log(`Running => http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
};
