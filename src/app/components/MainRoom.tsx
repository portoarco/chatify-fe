"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, EllipsisVertical, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BubbleChat from "./BubbleChat";
import ScrollToBottom from "./ScrollToBottom";
import UploadMenu from "./UploadMenu";

const dummyChat = [
  {
    id: 885512,
    type: "text",
    message: "Selamat",
    sender: "customer@mail.com",
    chatRole: 0,
  },
  {
    id: 885513,
    type: "text",
    message: "Malam",
    sender: "agent@mail.com",
    chatRole: 1,
  },
  {
    id: 885514,
    type: "text",
    message: "Ada yang bisa saya bantu?",
    sender: "agent@mail.com",
    chatRole: 1,
  },
  {
    id: 885515,
    type: "text",
    message:
      "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagalSaya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagalSaya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagalSaya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagalSaya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagalSaya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
    sender: "customer@mail.com",
    chatRole: 0,
  },
  {
    id: 885516,
    type: "text",
    message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
    sender: "agent@mail.com",
    chatRole: 1,
  },
];

export default function MainRoom() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [openUpload, setOpenUpload] = useState(false);

  return (
    <section className="flex items-center justify-center pt-20 md:pt-0  pb-10 ">
      <div className="  bg-white shadow-xl inset-shadow-2xs   ">
        <section
          id="header"
          className="p-3 md:px-5  fixed md:static w-full top-0 bg-white"
        >
          <div className="mb-2 flex justify-center sm:hidden">
            <Image
              src="/logowithname-r.png"
              alt="logowithname"
              width={1000}
              height={1000}
              className="w-20"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-5">
              <div>
                <ArrowLeft className="size-5 text-gray-600" />{" "}
              </div>
              <Avatar className="size-10">
                <AvatarImage
                  src="https://picsum.photos/id/237/200/300"
                  alt="avatar-img"
                />
                <AvatarFallback>ID</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">Produk A</p>
                <p className="text-xs">Room 5111</p>
              </div>
            </div>
            <div>
              <EllipsisVertical />
            </div>
          </div>
        </section>

        <section
          id="content"
          ref={contentRef}
          className="bg-sky-200/50   px-3 md:px-7 pb-7 pt-5 md:h-[70vh] overflow-auto "
        >
          {dummyChat.map((chat, idx) => (
            <BubbleChat
              key={idx}
              chatRole={{ role: chat.chatRole }}
              name={chat.sender}
              message={chat.message}
            />
          ))}
          {/* <ScrollToBottom containerRef={contentRef} /> */}
        </section>
        {/* Footer */}
        <section
          id="footer"
          className="mt-10 md:mt-0 fixed md:static bg-white  w-full h-15 bottom-0 flex items-center justify-around md:rounded-xl md:overflow-hidden  "
        >
          <button
            id="attachment"
            type="button"
            className="cursor-pointer   p-2"
            onClick={() => setOpenUpload(true)}
          >
            <Paperclip className="size-5" />
          </button>
          <div id="text" className="w-[65%] md:w-[75%] xl:w-[80%]">
            <Input
              className="bg-gray-100 rounded-xl border-none "
              placeholder="Tulis pesan Anda ..."
            />
          </div>
          <button
            id="send"
            className="  p-2 rounded-full bg-gray-200 cursor-pointer"
          >
            <Send className="size-5 text-gray-700" />
          </button>
        </section>
      </div>
      {/* Upload Menu */}
      <UploadMenu open={openUpload} setOpen={setOpenUpload} />
    </section>
  );
}
