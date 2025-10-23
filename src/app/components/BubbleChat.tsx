import { IChatRole } from "@/types/user";

interface IBubbleChat {
  chatRole: IChatRole;
  name: string;
  message: string;
}

export default function BubbleChat({ chatRole, name, message }: IBubbleChat) {
  return (
    <>
      {/* SENDER */}
      {chatRole.role === 1 && (
        <div className="mt-2 flex flex-col">
          <div>
            <div className="inline-block max-w-[70%] rounded-r-2xl rounded-bl-3xl p-3 bg-gray-100 shadow-sm wrap-break-word">
              <p>{message}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-2 gap-3">
                <p>{name}</p>
                <p>23:00</p>
              </div>
            </div>
          </div>
          <p className="mt-2 px-1 text-xs text-gray-500">23/10/2025</p>
        </div>
      )}
      {/* RESPONDER */}
      {chatRole.role === 0 && (
        <div className="flex justify-end mt-2">
          <div className="flex flex-col items-end">
            <div className="inline-block w-full rounded-l-2xl rounded-br-3xl p-3 bg-white shadow-sm wrap-break-words">
              <p>{message}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-2 gap-2">
                <p>23:00</p>
                <p>{name}</p>
              </div>
            </div>
            <p className="mt-1 px-1 text-xs text-gray-500 text-right">
              23/10/2025
            </p>
          </div>
        </div>
      )}
    </>
  );
}
