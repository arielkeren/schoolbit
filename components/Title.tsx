interface Props {
  title: string;
}

const Title: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex justify-center m-7">
      <h2 className="bg-gradient-to-r from-cyan-400 to-cyan-300 text-center text-transparent bg-clip-text text-7xl font-extrabold p-3">
        {title}
      </h2>
    </div>
  );
};

export default Title;
