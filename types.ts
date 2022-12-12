export interface RequestInterface {
  senderName: string;
  senderID: string;
}

export interface AnswerInterface {
  text: string;
  senderName: string;
  id: string;
}

export interface AssignmentInterface {
  name: string;
  question: string;
  answers: AnswerInterface[];
  id: string;
}

export interface ClassroomDataInterface {
  classroomName: string;
  description: string;
  color: string;
  ownerName: string;
  ownerID: string;
  assignments: AssignmentInterface[];
  participants: string[];
  requests: RequestInterface[];
}

export interface ClassroomInterface {
  classroomName: string;
  ownerName: string;
  description: string;
  color: string;
  classroomID: string;
}
