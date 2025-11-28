import { Puzzle } from "./Puzzle";

export type Step = {
  id: number;
  questUuid: string;
  puzzle?: Puzzle;
  stepNumber?: number;
  previousStep?: Step;
  longitude?: number;
  latitude?: number;
  altitude?: number;
  valid?: boolean;
};
