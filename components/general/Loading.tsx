import Logo from "../../public/Logo.svg";
import Image from "next/image";
import { VscLoading } from "react-icons/vsc";
import Head from "next/head";

const Loading: React.FC = () => {
  return (
    <>
      <Head>
        <title>SchoolBit</title>
      </Head>

      <div className="h-[100dvh] w-screen bg-gray-900 flex justify-center items-center">
        <VscLoading className="animate-spin text-gray-400 text-9xl" />
        <Image
          src={Logo}
          alt=""
          height="55"
          priority
          className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2"
        />
      </div>
    </>
  );
};

export default Loading;
