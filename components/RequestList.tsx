import ClassroomInterface from "../types";
import Request from "./Request";
import styles from "../styles/RequestList.module.css";

interface Props {
  requests: ClassroomInterface[];
}

const RequestList: React.FC<Props> = ({ requests }) => {
  return (
    <div className={styles.container}>
      {requests.map((request) => (
        <Request
          classroomName={request.classroomName}
          ownerName={request.ownerName}
          key={request.classroomID}
        />
      ))}
    </div>
  );
};

export default RequestList;
