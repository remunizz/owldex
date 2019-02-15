import axios, { AxiosResponse } from "axios";
import { FetchOptions, ApiResponse } from "./fetch.types";
import { stringify } from "qs";

const parseJSON = <ResponseData>(
  response: AxiosResponse<ResponseData>
): ApiResponse<ResponseData> => {
  if (response.headers && response.headers["total-count"]) {
    return {
      pagination: {
        link: response.headers["link"],
        pageSize: parseInt(response.headers["page-size"], 10),
        count: parseInt(response.headers["count"], 10),
        totalCount: parseInt(response.headers["total-count"], 10),
        ratelimitLimit: parseInt(response.headers["ratelimit-limit"], 10),
        ratelimitRemaining: parseInt(
          response.headers["ratelimit-remaining"],
          10
        )
      },
      items: response.data
    };
  }

  return { items: response.data };
};

export default <ResponseData>({
  path,
  method,
  params,
  options = {}
}: FetchOptions) => {
  const query = stringify(params) || "";

  const requestAttributes = {
    url: `${path}${query ? `?${query}` : ""}`,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    mode: "cors",
    referrerPolicy: "no-referrer-when-downgrade",
    credentials: "omit"
  };

  return axios.request<ResponseData>(requestAttributes)
    .then(response => parseJSON<ResponseData>(response));
};
