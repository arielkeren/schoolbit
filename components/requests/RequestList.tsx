import useAppContext from "../../hooks/useAppContext";
import Information from "../general/Information";
import Request from "./Request";

const RequestList: React.FC = () => {
  const { classroom } = useAppContext();

  if (!classroom)
    return (
      <Information
        primary="This classroom couldn't be accessed"
        secondary="Check with your teacher if you were accepted into the classroom"
      />
    );

  if (classroom.requests.length === 0)
    return (
      <Information
        primary="Looks like there are no join requests currently"
        secondary="Future join requests will appear here"
      />
    );

  return (
    <div className="flex flex-col gap-3">
      {classroom.requests.map((request, index) => (
        <Request request={request} key={index} />
      ))}
    </div>
  );
};

export default RequestList;
