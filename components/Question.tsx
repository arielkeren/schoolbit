interface Props {
  question: string;
}

const Question: React.FC<Props> = ({ question }) => {
  return (
    <div className="m-10 flex justify-center">
      <div>
        <p className="text-3xl break-all whitespace-pre-wrap">{question}</p>
      </div>
    </div>
  );
};

export default Question;
