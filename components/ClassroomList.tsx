import { ClassroomInterface } from "../types";
import AddClassroom from "./AddClassroom";
import Classroom from "./Classroom";

interface Props {
  classrooms: ClassroomInterface[];
  classroomsType: "owned" | "attended";
  openClassroomCreationMenu: () => void;
  openClassroomJoinMenu: () => void;
}

const ClassroomList: React.FC<Props> = ({
  classrooms,
  classroomsType,
  openClassroomCreationMenu,
  openClassroomJoinMenu,
}) => {
  return (
    <div className="m-10 grid grid-cols-4 gap-5">
      {classrooms.map((classroom) => (
        <Classroom classroom={classroom} key={classroom.classroomID} />
      ))}

      <AddClassroom
        openMenu={
          classroomsType === "owned"
            ? openClassroomCreationMenu
            : openClassroomJoinMenu
        }
      />
    </div>
  );
};

export default ClassroomList;
