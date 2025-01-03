import { api } from "../../utils/route";

const get = api({ path: "/" }, async () => {
  return { ok: true, message: "Welcome!" };
});

export default { get };
