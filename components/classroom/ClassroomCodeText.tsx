interface Props {
  code: string;
}

const ClassroomCodeText: React.FC<Props> = ({ code }) => {
  return (
    <p className="text-gray-700 text-3xl absolute bottom-5 right-1/2 translate-x-1/2">
      Code: {code}
    </p>
  );
};

export default ClassroomCodeText;
