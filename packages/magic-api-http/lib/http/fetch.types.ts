export interface FetchOptions {
  path: string;
  method: string;
  params: {};
  bodyParams?: {};
  options: {
    credentials?: RequestCredentials;
    headers?: {};
  };
}

export interface ApiResponse<ResponseData> {
  pagination?: {
    link: string;
    pageSize: number;
    count: number;
    totalCount: number;
    ratelimitLimit: number;
    ratelimitRemaining: number;
  };
  items: ResponseData;
}

interface ForeignName {
  name: string;
  text: string;
  flavor?: string;
  imageUrl: string;
  language?: string;
  multiverseid?: number;
}

export interface Card {
  artist?: string;
  cmc?: number;
  colorIdentity?: string[];
  colors?: string[];
  flavor?: string;
  foreignNames?: ForeignName[];
  id: string;
  imageUrl?: string;
  layout?: string;
  legalities?: { format: string; legality: string }[];
  manaCost?: string;
  multiverseid?: number;
  name: string;
  number?: string;
  originalText?: string;
  originalType?: string;
  power?: string;
  printings?: string[];
  rarity?: string;
  rulings?: { date: string; text: string }[];
  set?: string;
  setName?: string;
  subtypes?: string[];
  supertypes?: [];
  text: string;
  toughness?: string;
  type: string;
  types?: string[];
}
