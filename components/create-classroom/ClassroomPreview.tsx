import { IClassroom } from "../../types/types";

interface Props {
  name: string;
  description: string;
  owner: string;
  color: string;
}

const ClassroomPreview: React.FC<Props> = ({
  name,
  description,
  owner,
  color,
}) => (
  <div className="h-56 w-64 flex flex-col hover:scale-105 transition-transform">
    <div className="h-5/6 bg-gray-900 rounded-t-md">
      <div className="p-3">
        <h2 className="text-white text-lg">{name}</h2>
        <h3 className="text-gray-400">{owner}</h3>
        <p className="text-gray-500 mt-3">{description}</p>
      </div>
    </div>
    <div
      style={{ backgroundColor: color }}
      className="h-1/6 w-full rounded-b-md"
    ></div>
  </div>
);

export default ClassroomPreview;
