import Image from "next/image";
import React from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="max-sm:hidden flex justify-center  my-5">
        <Image
          src="/logowithname-r.png"
          alt="logowithname"
          width={1000}
          height={1000}
          className="w-50"
        />
      </section>
      <section className="md:w-[90vw] lg:w-[80vw] xl:w-[60vw] mx-auto rounded-md overflow-hidden flex justify-center">
        {children}
      </section>
    </>
  );
}
