interface IBubbleChat {
  isSender: boolean;
  email: string;
  message: string;
  type?: "TEXT" | "IMAGE" | "VIDEO" | "FILE";
  fileName?: string;
  created_at?: string;
}

export default function BubbleChat({
  isSender,
  email,
  message,
  type,
  fileName,
  created_at,
}: IBubbleChat) {
  // console.log(type);
  return (
    <>
      {/* SENDER */}
      {isSender ? (
        <div className="flex justify-end mt-2">
          <div className="flex flex-col items-end">
            <div className="inline-block w-full rounded-l-2xl rounded-br-3xl p-3 bg-white shadow-sm wrap-break-words">
              {type === "TEXT" && <p>{message}</p>}
              {type === "FILE" && (
                <div>
                  <a
                    href={message}
                    download={fileName}
                    className="underline underline-offset-1 text-sm "
                    target="blank"
                  >
                    Klik untuk buka lampiran {fileName}
                  </a>
                </div>
              )}
              <div className="flex justify-between text-xs text-gray-500 mt-2 gap-2">
                <p>23:00</p>
                <p>{email}</p>
              </div>
            </div>
            <p className="mt-1 px-1 text-xs text-gray-500 text-right">
              {created_at}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col">
          <div>
            <div className="inline-block max-w-[70%] rounded-r-2xl rounded-bl-3xl p-3 bg-gray-100 shadow-sm wrap-break-word">
              {type === "TEXT" && <p>{message}</p>}
              {type === "FILE" && (
                <div>
                  <a
                    href={message}
                    download={fileName}
                    className="underline underline-offset-1 text-sm "
                    target="blank"
                  >
                    Klik untuk buka lampiran {fileName}
                  </a>
                </div>
              )}
              <div className="flex justify-between text-xs text-gray-500 mt-2 gap-3">
                <p>{email}</p>
                <p>23:00</p>
              </div>
            </div>
          </div>
          <p className="mt-2 px-1 text-xs text-gray-500">23/10/2025</p>
        </div>
      )}
    </>
  );
}
