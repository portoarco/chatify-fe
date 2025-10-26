export interface IChat {
  message: string;
  created_at?: string;
  type?: "TEXT" | "IMAGE" | "VIDEO" | "FILE";
  user: {
    email: string;
  };
  sender?: string;
  fileName?: string;
}
