import fetch from "./fetch";
import { FetchOptions } from "./fetch.types";

const getBaseUrl = () => "https://api.magicthegathering.io/";
const generatePath = (path: string) => `${getBaseUrl()}v1${path}`;

export const get = <T>(
  path: string,
  params?: {},
  options?: FetchOptions["options"]
) =>
  fetch<T>({
    path: generatePath(path),
    method: "GET",
    params,
    options
  });
