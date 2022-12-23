interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex justify-center m-5">
      <h1 className="text-center text-5xl font-extrabold text-gray-900 uppercase">
        {title}
      </h1>
    </div>
  );
};

export default Title;
