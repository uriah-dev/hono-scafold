import { env } from "../env";

export const corsOpts = {
  origin: env.BETTER_AUTH_URL,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
};

export const respond = (success: boolean, message: string, data?: any) => {
  return { success, message, data };
};

export const isString = (v: string | null | undefined) => {
  return v !== undefined && v !== null && v !== "";
};

export const isNull = (v: any | null) => {
  return v === null;
};

export const manageProcess = (fnc: Function) => {
  try {
    fnc();
  } catch (e: any) {
    console.log(`${e.message}`, e);
    process.exit(-1)
  } finally {
    process.exit(0);
  }
};
