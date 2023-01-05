export interface RequestInterface {
  senderName: string;
  senderID: string;
}

export interface AnswerInterface {
  code: string;
  senderName: string;
  senderID: string;
  checked: boolean;
}

export interface AssignmentInterface {
  name: string;
  question: string;
  until: string;
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
