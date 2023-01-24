interface Props {
  title: string;
}

const ParticipantTypeTitle: React.FC<Props> = ({ title }) => (
  <h4 className="text-2xl font-bold text-slate-500 uppercase mb-2">{title}</h4>
);

export default ParticipantTypeTitle;
