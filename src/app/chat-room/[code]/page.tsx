"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowLeft, EllipsisVertical, Paperclip, Send } from "lucide-react";
import { motion, useDragControls } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BubbleChat from "../../components/BubbleChat";
import UploadMenu from "../../components/UploadMenu";
import { useParams, useRouter } from "next/navigation";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { apiCall } from "@/helper/apiCall";
import { IChat } from "@/types/message";

interface IRoomData {
  id: string;
  code: string;
  name: string;
  image_url: string;
  product: { name: string };
}

export default function MainRoom() {
  const [userData, setUserData] = useState(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const params = useParams<{ code: string }>();
  const roomcode = params?.code;
  const router = useRouter();
  const [chats, setChats] = useState<IChat[]>([]);
  const [roomData, setRoomData] = useState<IRoomData | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openUpload, setOpenUpload] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const currentUserEmail = userData?.email || "";

  useEffect(() => {
    if (!roomcode || !userData) return;
    (async () => {
      try {
        const res = await apiCall.get(`/room/room-data/${roomcode}`);
        setChats(res.data.Comments);
        setRoomData({
          id: res.data.id,
          code: res.data.code,
          name: res.data.name,
          image_url: res.data.image_url,
          product: { name: res.data.product.name },
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [roomcode, userData]);

  // handle untuk pesan baru
  const handleNewMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const messageObject: IChat = {
        type: "TEXT",
        message: newMessage,
        user: {
          email: currentUserEmail,
        },
      };
      setChats([...chats, messageObject]);
      setNewMessage("");
      const res = await apiCall.post(`/message/${roomData?.id}`, {
        data: messageObject,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // handle untuk pesan gambar/dokumen
  const handleUploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("roomId", roomData?.id ?? "");
      formData.append("userEmail", currentUserEmail);
      // upload ke BE
      const uploadResponse = await apiCall.post(
        `/message/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryUrl = uploadResponse.data.message;
      const messageObject: IChat = {
        type: "FILE",
        message: cloudinaryUrl,
        user: {
          email: currentUserEmail,
        },
      };
      setChats([...chats, messageObject]);
    } catch (error) {
      console.log(error);
    }
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
                        "Are you sure leave the room?"
                      );
                      if (!confirm) return;
                      router.replace("/");
                      localStorage.clear();
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
                    <p className="font-bold">
                      {roomData?.name} | {roomData?.product.name}
                    </p>
                    <p className="text-xs">
                      Room Code:{" "}
                      <span className="font-bold">{roomData?.code}</span>{" "}
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
              {chats.map((chat, idx) => {
                const isSender = chat.user.email === currentUserEmail;
                return (
                  <BubbleChat
                    key={idx}
                    isSender={isSender}
                    email={chat.user.email}
                    message={chat.message}
                    type={chat.type}
                    created_at={chat.created_at ?? ""}
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
