import fetch from "./fetch";
import { Card, FetchOptions } from "./fetch.types";

const getBaseUrl = () => "https://api.magicthegathering.io/";
const generatePath = (path: string) => `${getBaseUrl()}v1${path}`;

export const get = (
  path: string,
  params?: {},
  options?: FetchOptions["options"]
) =>
  fetch<{ cards: Card[] }>({
    path: generatePath(path),
    method: "GET",
    params,
    options
  });
