import { normalize, schema, denormalize } from "normalizr";
import { Card } from "magic-api-ts";

const card = new schema.Entity("card");
const mySchema = { cards: [card] };

type NormalizeCardsProps = { cards: Card[] };

export interface CardsResult {
  entities: {
    cards: {
      [id: string]: Card;
    };
  };
  result: {
    cards: string[];
  };
}

const normalizeCards = (data: NormalizeCardsProps): CardsResult =>
  normalize(data, mySchema);

export const denormalizeData = (result: {}, entities: {}) =>
  denormalize(result, mySchema, entities);

export default normalizeCards;
