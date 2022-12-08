import { RequestInterface } from "../types";
import Request from "./Request";
import styles from "../styles/RequestList.module.css";

interface Props {
  requests: RequestInterface[];
  classroomName: string;
  classroomID: string;
}

const RequestList: React.FC<Props> = ({
  requests,
  classroomName,
  classroomID,
}) => {
  return (
    <div className={styles.container}>
      {requests.length === 0 ? (
        <p>There are no join requests currently...</p>
      ) : (
        <>
          {requests.map((request, index) => (
            <Request
              request={request}
              requests={requests}
              classroomName={classroomName}
              classroomID={classroomID}
              key={index}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default RequestList;
