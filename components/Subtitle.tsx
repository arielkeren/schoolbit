interface Props {
  subtitle: string;
}

const Subtitle: React.FC<Props> = ({ subtitle }) => {
  return <h3 className="text-center text-3xl text-gray-600">{subtitle}</h3>;
};

export default Subtitle;
