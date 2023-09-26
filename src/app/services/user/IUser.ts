import {Product} from "../product/product";

export interface IUser{
  id: string | null,
  email: string  | null;
  senha: string | null
}

export interface IUserRequest {
  name: string;
  email: string;
  password: string
}

export interface UserResponse {
  statusCode: number,
  data: User[]
}


export interface User {
  id: number,
  name: number,
  email: string
}
