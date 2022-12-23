interface Props {
  name: string;
}

const Participant: React.FC<Props> = ({ name }) => {
  return (
    <div className="bg-gray-900 p-5 rounded border-b-4 border-gray-700">
      <p className="text-slate-300 text-2xl">{name}</p>
    </div>
  );
};

export default Participant;
