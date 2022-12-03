import styles from "../styles/Title.module.css";

interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return <h2 className={styles.title}>{title}</h2>;
};

export default Title;
