export type questRequest = {
  authorUuid: string;
  name: string;
  lore: string;
  firstStep: {
    puzzle: {
      riddle: string;
      clue: string;
    };
    previousStepId: number | null;
    longitude: number | null;
    latitude: number | null;
    radius: number | null;
  };
};
