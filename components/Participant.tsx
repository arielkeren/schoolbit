import styles from "../styles/Participant.module.css";

interface Props {
  name: string;
}

const Participant: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default Participant;
