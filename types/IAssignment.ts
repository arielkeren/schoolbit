import IAnswer from "./IAnswer";

export default interface IAssignment {
  name: string;
  question: string;
  until: string;
  language: string;
  isLanguageLocked: boolean;
  answers: IAnswer[];
  id: string;
}
