"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, EllipsisVertical, Paperclip, Send } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BubbleChat from "../components/BubbleChat";
import LayoutWrapper from "../components/LayoutWrapper";
import UploadMenu from "../components/UploadMenu";

const dummyChat: any = [
  {
    id: 885512,
    type: "TEXT",
    message: "Selamat Malam",
    sender: "customer@mail.com",
  },
  {
    id: 885513,
    type: "TEXT",
    message: "Malam",
    sender: "agent@mail.com",
  },
  {
    id: 885514,
    type: "TEXT",
    message: "Ada yang bisa saya bantu?",
    sender: "agent@mail.com",
  },
  {
    id: 885515,
    type: "TEXT",
    message:
      "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
    sender: "customer@mail.com",
  },
  {
    id: 885516,
    type: "TEXT",
    message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
    sender: "agent@mail.com",
  },
];

export default function MainRoom() {
  const currentUserEmail = "customer@mail.com"; //dummy login user
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [chats, setChats] = useState(dummyChat);
  console.log(chats);
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = () => {
    if (!newMessage.trim()) return;

    const messageObject = {
      id: Date.now(),
      type: "TEXT",
      message: newMessage,
      sender: currentUserEmail,
    };
    setChats([...chats, messageObject]);
    setNewMessage("");
  };

  // handle untuk upload file
  const handleUploadFile = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    const messageObject = {
      id: Date.now(),
      type: "FILE",
      message: fileUrl,
      sender: currentUserEmail,
      fileName: file.name,
    };

    setChats((prev: any) => [...prev, messageObject]);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  return (
    <LayoutWrapper>
      <section>
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
                  <motion.button
                    onClick={() => {
                      const confirm = window.confirm(
                        "Are you sure leave the chat room?"
                      );
                      if (!confirm) return;
                      router.replace("/");
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    className="cursor-pointer"
                  >
                    <ArrowLeft className="size-5 text-gray-600" />{" "}
                  </motion.button>
                  <Avatar className="size-10">
                    <AvatarImage
                      src="https://picsum.photos/id/237/200/300"
                      alt="avatar-img"
                    />
                    <AvatarFallback>ID</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">Produk A</p>
                    <p className="text-xs">
                      Room Code: <span className="font-bold">555</span>{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => alert("Opening")}
                    className="cursor-pointer"
                  >
                    <EllipsisVertical />
                  </button>
                </div>
              </div>
            </section>

            <section
              id="content"
              ref={contentRef}
              className="bg-sky-200/50   px-3 md:px-7 pb-7 pt-5 h-[90vh] md:h-[70vh] overflow-auto "
            >
              {chats.map((chat: any, idx: any) => {
                const isSender = chat.sender === currentUserEmail;
                return (
                  <BubbleChat
                    key={idx}
                    isSender={isSender}
                    email={chat.sender}
                    message={chat.message}
                    type={chat.type}
                  />
                );
              })}
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
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNewMessage();
                    }
                  }}
                />
              </div>
              <motion.button
                id="send"
                className="  p-2 rounded-full bg-gray-200 cursor-pointer"
                onClick={handleNewMessage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
              >
                <Send className="size-5 text-gray-700" />
              </motion.button>
            </section>
          </div>
          {/* Upload Menu */}
          <UploadMenu
            open={openUpload}
            setOpen={setOpenUpload}
            onUpload={handleUploadFile}
          />
        </section>
      </section>
    </LayoutWrapper>
  );
}
