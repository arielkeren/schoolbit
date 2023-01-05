import { useState } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";

const ScrollButton: React.FC = () => {
  const [scrollUp, setScrollUp] = useState(false);

  const scroll = () => {
    if (scrollUp) window.scrollTo(0, 0);
    else window.scrollTo(0, 10000);
    setScrollUp((previousScrollUp) => !previousScrollUp);
  };

  return (
    <button onClick={scroll} className="fixed bottom-5 right-5">
      <FaLongArrowAltDown
        className={
          "text-4xl transition-transform " + (scrollUp ? "rotate-180" : "")
        }
      />
    </button>
  );
};

export default ScrollButton;
