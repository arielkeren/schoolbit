interface Props {
  question: string;
}

const Question: React.FC<Props> = ({ question }) => (
  <div className="flex justify-center bg-gray-900 rounded">
    <div className="w-4/5 m-5 p-2">
      <p className="text-xl text-gray-100 break-all whitespace-pre-wrap">
        {question}
      </p>
    </div>
  </div>
);

export default Question;
