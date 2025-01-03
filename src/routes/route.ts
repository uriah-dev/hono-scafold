import { newRoute } from "../utils/route";
import main from "./route/index";
import session from "./route/session";

const allRoutes = [main, session];

export const routes = () => {
  allRoutes.map(async (routes) => {
    const paths = Object.keys(routes) as ["get"];

    await Promise.allSettled([
      paths.map((key) => {
        const { route, ...param } = routes[key];
        newRoute(param, route);
      }),
    ]);
  });
};
