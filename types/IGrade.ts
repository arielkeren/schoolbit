import IComment from "./IComment";

export default interface IGrade {
  assignmentName: string;
  classroomName: string;
  teacherName: string;
  grade: string;
  language: string;
  code: string;
  comments: IComment[];
}
