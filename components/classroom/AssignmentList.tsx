import { useRouter } from "next/router";
import useAppContext from "../../hooks/useAppContext";
import Assignment from "./Assignment";

const AssignmentList: React.FC = () => {
  const { user, classroom } = useAppContext();

  const router = useRouter();
  const { classroomID } = router.query as { classroomID: string };

  const ownerID = classroom?.ownerID;
  const isOwner = user?.uid === ownerID;

  return (
    <>
      {classroom ? (
        <>
          {classroom.assignments.length !== 0 ? (
            <div className="flex flex-col gap-2 m-3">
              {classroom.assignments.map((assignment) => (
                <Assignment
                  assignment={assignment}
                  classroomID={classroomID}
                  isOwner={isOwner}
                  key={assignment.id}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl">
              Looks like there are no assignments yet
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-2xl">Failed to load the assignments</p>
      )}
    </>
  );
};

export default AssignmentList;
