import IAssignment from "./IAssignment";
import IRequest from "./IRequest";
import IParticipant from "./IParticipant";

export default interface IClassroomData {
  classroomName: string;
  description: string;
  color: string;
  ownerName: string;
  ownerID: string;
  assignments: IAssignment[];
  participants: IParticipant[];
  requests: IRequest[];
}
