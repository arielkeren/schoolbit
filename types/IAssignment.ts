import IAnswer from "./IAnswer";

export default interface IAssignment {
  name: string;
  question: string;
  until: string;
  answers: IAnswer[];
  id: string;
}
