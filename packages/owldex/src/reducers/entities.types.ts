export interface EntitiesState {
  card: { [id: string]: {} };
  ui: {
    market: {
      loading: boolean;
      alert: string;
    };
  };
  sets: {
    rna: {
      cards: string[];
    };
  };
  decks: { initial: { cards: string[] } };
}
