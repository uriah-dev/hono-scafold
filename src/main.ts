import { Hono } from "hono";
import { auth } from "./lib/auth";
import { start } from "./routes/main";

export interface AuthType {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export const app = new Hono<AuthType>();

start();
