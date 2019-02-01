export interface EntitiesState {
  card: { [id: string]: {} };
  ui: {
    market: {
      loading: boolean;
    };
  };
  sets: {
    rna: {
      cards: string[];
    };
  };
  decks: { initial: { cards: string[] } };
}
