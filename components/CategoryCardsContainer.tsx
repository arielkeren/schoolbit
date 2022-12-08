import styles from "../styles/CategoryCardsContainer.module.css";
import CategoryCard from "./CategoryCard";

const CategoryCardsContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <CategoryCard
        title="My Classrooms"
        description="Browse the classrooms you own"
        link="my-classrooms"
      />
      <CategoryCard
        title="Attended Classrooms"
        description="Browse the classrooms you attended"
        link="attended-classrooms"
      />
      <CategoryCard
        title="Join Classroom"
        description="Enter a classroom code to join it"
        link="join-classroom"
      />
    </div>
  );
};

export default CategoryCardsContainer;
