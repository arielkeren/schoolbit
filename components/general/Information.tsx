interface Props {
  primary: string;
  secondary: string;
}

const Information: React.FC<Props> = ({ primary, secondary }) => (
  <>
    <p className="text-3xl font-medium">{primary}</p>
    <p className="text-xl">{secondary}</p>
  </>
);

export default Information;
