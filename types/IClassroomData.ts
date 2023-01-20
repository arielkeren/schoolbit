import IAssignment from "./IAssignment";
import IRequest from "./IRequest";

export default interface IClassroomData {
  classroomName: string;
  description: string;
  color: string;
  ownerName: string;
  ownerID: string;
  assignments: IAssignment[];
  participants: string[];
  requests: IRequest[];
}
