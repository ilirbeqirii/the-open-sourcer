export interface UserEntity extends UserInfo {
  id: string;
  passwordHash: string;
}

export interface User {
  id: string;
  username: string;
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
  age?: number;
  location?: string;
}

export interface UserResponse {
  user: User;
}
