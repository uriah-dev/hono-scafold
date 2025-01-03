import { respond } from "../utils";
import { app, type AuthType } from "../main";
import { error, type StatusError } from "../utils/error";
import { getContext } from "hono/context-storage";

export type RouteType = {
  path: string;
  auth?: boolean;
};

export type CallbackType = () => Promise<{
  ok: boolean;
  status?: StatusError;
  message: string;
  data?: any;
}>;

export const api = (params: RouteType, cb: CallbackType) => {
  return {
    ...params,
    route: cb,
  };
};

export const getAuthValues = () => {
  const c = getContext<AuthType>();
  const session = c.get("session");
  const user = c.get("user");

  return { session, user };
};

export const newRoute = (
  { auth = false, path }: RouteType,
  callback: CallbackType
) => {
  app.get(path, async (c) => {
    if (auth) {
      const { user } = getAuthValues();
      if (!user)
        return c.json(
          respond(false, "UNAUTHORIZED"),
          error.CLIENT_UNAUTHED_CODE
        );
    }

    const { ok, message, data, status } = await callback();
    return c.json(respond(ok, message, data), status || 200);
  });
};
