import { AiOutlinePlus } from "react-icons/ai";
import styles from "../styles/OpenMenuButton.module.css";
import { useRouter } from "next/router";

interface Props {
  classroomID: string;
}

const CreateAssignmentButton: React.FC<Props> = ({ classroomID }) => {
  const router = useRouter();

  const redirectToAssignmentCreation = () =>
    router.push(`/classrooms/${classroomID}/create-assignment`);

  return (
    <button onClick={redirectToAssignmentCreation} className={styles.button}>
      <AiOutlinePlus className={styles.icon} />
    </button>
  );
};

export default CreateAssignmentButton;
