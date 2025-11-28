import { Quest } from "./Quest";
import { Step } from "./Step";
import { User } from "./User";

export type Adventure = {
  id: number;
  uuid: string;
  adventurer?: User;
  quest?: Quest;
  currentStep?: Step;
};
