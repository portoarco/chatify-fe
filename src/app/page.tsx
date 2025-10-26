"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiCall } from "@/helper/apiCall";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import LayoutWrapper from "./components/LayoutWrapper";
import Link from "next/link";
import { isValidEmail } from "@/lib/utils";

export default function Home() {
  const inRoomCodeRef = useRef<HTMLInputElement>(null);
  const inEmailRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handlerSubmit = async () => {
    try {
      const code = inRoomCodeRef.current?.value;

      const email = inEmailRef.current?.value;
      const isEmailValid = isValidEmail(email?.toString() ?? "");
      if (!isEmailValid) return alert("Invalid");
      const res = await apiCall.post(`/room/${code}`, { email: email });
      if (!res) return alert("There is something wrong");
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          roomCode: code,
        })
      );
      router.push(`/chat-room/${code}`);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 404)
        return alert("Room Invalid /  Not Found");
    }
  };

  return (
    <>
      <LayoutWrapper>
        <section className="flex justify-center items-center h-screen md:h-full">
          <section className="bg-white shadow-xl inset-shadow-2xs p-5 w-[90vw] md:w-full rounded-md  ">
            <form>
              <div>
                <h1 className="text-2xl font-bold mb-2 text-center">
                  Join Chat Room
                </h1>
                <div>
                  <label>Email</label>
                  <Input
                    placeholder="Masukkan Email"
                    type="email"
                    ref={inEmailRef}
                  />
                </div>
              </div>
              <p>Input Your Room Code</p>

              <div className="flex flex-col gap-3">
                <Input
                  placeholder="Input Your Room Code"
                  type="number"
                  ref={inRoomCodeRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handlerSubmit();
                    }
                  }}
                />
                <Button
                  className="cursor-pointer"
                  type="button"
                  onClick={handlerSubmit}
                >
                  Enter Chat Room
                </Button>
                <Link
                  href="/sample"
                  className="hover:underline-offset-1 hover:underline"
                >
                  Klik ini untuk contoh chat room
                </Link>
                <p className="text-xs font-light">
                  For testing, input code{" "}
                  <span className="font-medium">88</span>{" "}
                </p>
              </div>
            </form>
          </section>
        </section>
      </LayoutWrapper>
    </>
  );
}
