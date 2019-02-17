import { get } from "./http";
import { Card } from "./http/fetch.types";

interface fetchCardsParams {
  set?: string;
  name?: string;
  page?: number;
}

export const fetchCards = (params?: fetchCardsParams) =>
  get<{ cards: Card[] }>("/cards", { ...params });
