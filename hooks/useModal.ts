import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const tupleToReturn: [boolean, () => void, () => void] = [
    isModalOpen,
    openModal,
    closeModal,
  ];

  return tupleToReturn;
};

export default useModal;
