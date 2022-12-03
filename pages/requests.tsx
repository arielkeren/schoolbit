import Head from "next/head";
import ClassroomInterface from "../types";
import Title from "../components/Title";
import RequestList from "../components/RequestList";

interface Props {
  requests: ClassroomInterface[];
}

const RequestsPage: React.FC<Props> = ({ requests }) => {
  return (
    <>
      <Head>
        <title>Coding Classroom | Requests</title>
      </Head>

      <Title title="Requests" />

      <RequestList requests={requests} />
    </>
  );
};

export default RequestsPage;
