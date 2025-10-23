export enum UserRole {
  Admin = 0,
  Agent = 1,
  Customer = 2,
}

export enum ChatRole {
  Responder = 0,
  Sender = 1,
}

export interface IUserRole {
  role: UserRole;
}

export interface IChatRole {
  role: ChatRole;
}
