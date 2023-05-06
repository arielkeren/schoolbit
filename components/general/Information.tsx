interface Props {
  primary: string;
  secondary: string;
}

const Information: React.FC<Props> = ({ primary, secondary }) => (
  <>
    <p className="text-3xl font-medium text-gray-100">{primary}</p>
    <p className="text-xl text-gray-100">{secondary}</p>
  </>
);

export default Information;
