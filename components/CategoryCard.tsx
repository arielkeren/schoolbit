import styles from "../styles/CategoryCard.module.css";
import { MdMailOutline } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { BsPeople } from "react-icons/bs";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  link: string;
}

const CategoryCard: React.FC<Props> = ({ title, description, link }) => {
  return (
    <Link href={`/${link}`} className={styles.linkWrapper}>
      <div className={styles.container}>
        {title === "My Classrooms" ? (
          <HiOutlineUser className={styles.icon} />
        ) : title === "Attended Classrooms" ? (
          <BsPeople className={styles.icon} />
        ) : (
          <MdMailOutline className={styles.icon} />
        )}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
