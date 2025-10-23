import Image from "next/image";
import MainRoom from "./components/MainRoom";

export default function Home() {
  return (
    <section className="">
      <header className="max-sm:hidden flex justify-center  my-5">
        <Image
          src="/logowithname-r.png"
          alt="logowithname"
          width={1000}
          height={1000}
          className="w-50"
        />
      </header>
      <main className="md:w-[90vw] lg:w-[80vw] xl:w-[60vw] mx-auto rounded-md overflow-hidden">
        <MainRoom />
      </main>
      <footer></footer>
    </section>
  );
}
