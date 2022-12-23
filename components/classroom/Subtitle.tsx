interface Props {
  subtitle: string;
}

const Subtitle: React.FC<Props> = ({ subtitle }) => {
  return <h2 className="text-center text-3xl text-gray-700">{subtitle}</h2>;
};

export default Subtitle;
