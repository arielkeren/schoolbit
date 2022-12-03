import styles from "../styles/Subtitle.module.css";

interface Props {
  subtitle: string;
}

const Subtitle: React.FC<Props> = ({ subtitle }) => {
  return <h3 className={styles.subtitle}>{subtitle}</h3>;
};

export default Subtitle;
