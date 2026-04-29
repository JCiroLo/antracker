import xiorClient from "xior";
import Env from "@/lib/env";

const xior = xiorClient.create({
  baseURL: Env.API_URL + "/v1",
});

export default xior;
