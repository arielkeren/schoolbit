import styles from "../styles/Question.module.css";

interface Props {
  question: string;
}

const Question: React.FC<Props> = ({ question }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{question}</p>
    </div>
  );
};

export default Question;
