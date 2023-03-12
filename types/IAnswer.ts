import IComment from "./IComment";

export default interface IAnswer {
  code: string;
  language: string;
  senderName: string;
  senderID: string;
  grade: string;
  comments: IComment[];
  checked: boolean;
}
