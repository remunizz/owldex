import "isomorphic-fetch";
import { FetchOptions, ApiResponse } from "./fetch.types";
import { stringify } from "qs";

class CustomError extends Error {
  public response: string;
  public status: number;

  constructor(message: string, status: number, response: string) {
    super(message);

    this.response = response;
    this.status = status;
  }
}

const checkStatus = async (response: Response) => {
  if (response.ok) {
    return response;
  }

  const errorResponse = await response.text();

  const getResponse = () => {
    try {
      return JSON.parse(errorResponse);
    } catch (e) {
      return { error: errorResponse };
    }
  };

  throw new CustomError(response.statusText, response.status, getResponse());
};

const parseJSON = <ResponseData>(
  response: Response
): Promise<ApiResponse<ResponseData>> => {
  if (response.headers && response.headers.get("total-count")) {
    return response.json().then((json: ResponseData) => ({
      pagination: {
        link: response.headers.get("Link"),
        pageSize: parseInt(response.headers.get("page-size"), 10),
        count: parseInt(response.headers.get("Count"), 10),
        totalCount: parseInt(response.headers.get("total-count"), 10),
        ratelimitLimit: parseInt(response.headers.get("Ratelimit-Limit"), 10),
        ratelimitRemaining: parseInt(
          response.headers.get("Ratelimit-Remaining"),
          10
        )
      },
      items: json
    }));
  }

  return response.json().then((items: ResponseData) => ({ items }));
};

export default <ResponseData>({
  path,
  method,
  params,
  bodyParams,
  options = {}
}: FetchOptions) => {
  const credentials: RequestCredentials =
    options.credentials === undefined ? "omit" : options.credentials;

  const requestAttributes: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    mode: "cors",
    referrerPolicy: "no-referrer-when-downgrade",
    ...credentials ? { credentials } : {}
  };

  if (bodyParams) {
    requestAttributes.body = JSON.stringify(bodyParams);
  }

  const query = stringify(params) || "";

  return fetch(`${path}${query ? `?${query}` : ""}`, requestAttributes)
    .then(checkStatus)
    .then(response => parseJSON<ResponseData>(response));
};
