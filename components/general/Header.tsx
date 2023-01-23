interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <div className="fixed top-0 left-0 bg-gray-900 w-screen h-[100px] flex items-center shadow-md">
    <h1 className="text-gray-100 text-3xl font-medium ml-[123px]">{title}</h1>
  </div>
);

export default Header;
