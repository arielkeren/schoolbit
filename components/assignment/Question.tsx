interface Props {
  question: string;
}

const Question: React.FC<Props> = ({ question }) => {
  return (
    <div className="flex justify-center">
      <div className="w-4/5 m-5 p-2">
        <p className="text-3xl break-all whitespace-pre-wrap">{question}</p>
      </div>
    </div>
  );
};

export default Question;
