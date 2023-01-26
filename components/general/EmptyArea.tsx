import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const EmptyArea: React.FC<Props> = ({ children }) => (
  <div className="ml-[100px] mt-[100px] p-5">{children}</div>
);

export default EmptyArea;
