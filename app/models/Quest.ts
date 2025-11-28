import { Step } from "./Step";
import { User } from "./User";

export type Quest = {
  id: number;
  uuid: string;
  author?: User;
  name: string;
  lore: string;
  firstStep?: Step;
  valid?: boolean;
};
