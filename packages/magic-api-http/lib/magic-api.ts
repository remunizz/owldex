import { get } from "./http";

interface fetchCardsParams {
  set?: string;
  name?: string;
  page?: number;
}

export const fetchCards = (params?: fetchCardsParams) =>
  get("/cards", {
    ...params,
    ...params && params.page ? { page: params.page.toString() } : {}
  });
