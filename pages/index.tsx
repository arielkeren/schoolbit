import Head from "next/head";
import Link from "next/link";
import {
  BsArrowRight,
  BsFileEarmarkCode,
  BsFillBarChartFill,
} from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { TbListCheck } from "react-icons/tb";
import { MdCreate } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import useAppContext from "../hooks/useAppContext";
import { useRouter } from "next/router";

const Homepage: React.FC = () => {
  const { user } = useAppContext();

  const router = useRouter();

  if (user) router.push("/my-classrooms");

  return (
    <>
      <Head>
        <title>SchoolBit</title>
      </Head>

      <div className="absolute top-0 right-0 p-5 flex gap-4 items-center">
        <Link href="/sign-in" className="uppercase text-xl text-gray-100">
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="uppercase bg-gray-100 rounded-sm py-2 px-3 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-200"
        >
          Sign Up
        </Link>
      </div>

      <section className="p-12 flex flex-col gap-6 justify-center items-center bg-gray-900 h-[550px]">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-gray-100 text-8xl font-bold">SchoolBit</h1>
          <p className="text-gray-200 text-xl">
            The modern way of creating digital classrooms for computer science
          </p>
        </div>
        <Link
          href="/sign-up"
          className="flex items-center gap-1 uppercase bg-gray-100 rounded-sm py-2 px-3 text-xl font-semibold text-gray-900 transition-colors hover:bg-gray-200"
        >
          Get Started <BsArrowRight className="text-2xl" />
        </Link>
      </section>

      <section className="p-12 flex flex-col gap-6 justify-center items-center bg-gray-100 h-[450px]">
        <h2 className="text-gray-900 text-6xl font-bold">
          Designed for Computer Science
        </h2>
        <p className="text-gray-800 text-xl">
          Using SchoolBit, you become much more productive with all of our
          unique features
        </p>
        <Link
          href="#benefits"
          className="flex items-center gap-1 uppercase bg-gray-900 rounded-sm py-2 px-3 text-xl font-semibold text-gray-100 transition-colors hover:bg-gray-800"
        >
          See Benefits <BsArrowRight className="text-2xl" />
        </Link>
      </section>

      <section
        id="benefits"
        className="p-12 flex flex-col gap-6 justify-center items-center bg-gray-900 h-[600px]"
      >
        <h2 className="text-gray-100 text-6xl font-bold">
          Built for <span className="underline">Students</span>
        </h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-gray-100 h-96 flex flex-col gap-2 items-center pt-20 px-5 relative">
            <MdCreate className="text-gray-900 text-5xl absolute top-3" />
            <h3 className="text-gray-100 text-2xl bg-gray-900 py-3 px-5 rounded-md uppercase">
              Write Code Faster
            </h3>
            <p className="text-gray-900 text-lg w-4/5">
              With our built-in code editor, you can expect an increase in
              productivity.
            </p>
          </div>

          <div className="bg-gray-200 h-96 flex flex-col gap-2 items-center pt-20 px-5 relative">
            <FaUsers className="text-gray-900 text-5xl absolute top-4" />
            <h3 className="text-gray-100 text-2xl bg-gray-900 py-3 px-5 rounded-md uppercase">
              Join Classrooms
            </h3>
            <p className="text-gray-900 text-lg w-4/5">
              Ask your teacher for the classroom code. Then, with one click of a
              button, send a join request.
            </p>
          </div>

          <div className="bg-gray-100 h-96 flex flex-col gap-2 items-center pt-20 px-5 relative">
            <BsFillBarChartFill className="text-gray-900 text-4xl absolute top-6" />
            <h3 className="text-gray-100 text-2xl bg-gray-900 py-3 px-5 rounded-md uppercase">
              See Your Grades
            </h3>
            <p className="text-gray-900 text-lg w-4/5">
              Easily access your grades from the app. With each grade, comes a
              copy of your submitted code with all your teacher&apos;s comments.
            </p>
          </div>
        </div>

        <Link
          href="/sign-up"
          className="flex items-center gap-1 uppercase rounded-sm py-2 px-3 text-2xl font-bold text-gray-100 transition-colors hover:bg-gray-800"
        >
          Jump In
        </Link>
      </section>

      <section className="p-12 flex flex-col gap-6 justify-center items-center bg-gray-100 h-[600px]">
        <h2 className="text-gray-900 text-6xl font-bold">
          Built for <span className="underline">Teachers</span>
        </h2>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-gray-900 h-96 flex flex-col gap-2 items-center pt-20 px-5 relative">
            <TbListCheck className="text-gray-100 text-5xl absolute top-4" />
            <h3 className="text-gray-900 text-2xl bg-gray-100 py-3 px-5 rounded-md uppercase">
              Grade Answers
            </h3>
            <p className="text-gray-100 text-lg w-4/5">
              Our built-in code editor not only helps students, but also
              teachers. Open any answer and instantly see the student&apos;s
              code.
            </p>
          </div>

          <div className="bg-gray-800 h-96 flex flex-col gap-2 items-center pt-20 px-5 relative">
            <IoMdAdd className="text-gray-100 text-5xl absolute top-4" />
            <h3 className="text-gray-900 text-2xl bg-gray-100 py-3 px-5 rounded-md uppercase">
              Create Classrooms
            </h3>
            <p className="text-gray-100 text-lg w-4/5">
              Easily create classrooms for your computer science students.
            </p>
          </div>

          <div className="bg-gray-900 h-96 flex flex-col gap-2 items-center pt-20 px-5 relative">
            <BsFileEarmarkCode className="text-gray-100 text-5xl absolute top-4" />
            <h3 className="text-gray-900 text-2xl bg-gray-100 py-3 px-5 rounded-md uppercase">
              Add Comments
            </h3>
            <p className="text-gray-100 text-lg w-4/5">
              Put comments in your student&apos;s code before sending it. Help
              that student improve for the next time by pointing out some
              mistakes.
            </p>
          </div>
        </div>

        <Link
          href="/sign-up"
          className="flex items-center gap-1 uppercase rounded-sm py-2 px-3 text-2xl font-bold text-gray-900 transition-colors hover:bg-gray-200"
        >
          Try It Out
        </Link>
      </section>
    </>
  );
};

export default Homepage;
