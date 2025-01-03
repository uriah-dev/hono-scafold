import { api } from "../../utils/route";

const get = api({ path: "/session" }, async () => {
  return { ok: true, message: "Session!" };
});

export default { get };
