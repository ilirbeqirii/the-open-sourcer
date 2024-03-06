import { AuthModel } from "../../api/models/login";
import { RegisterModel } from "../../api/models/register";

export type LoginFormProps = {
  onSubmit: (data: AuthModel) => Promise<void>;
};

export type LoginFormType = {
  username: string;
  password: string;
};

export type RegisterFormProps = {
  onSubmit: (registerInfo: RegisterModel) => Promise<void>;
};

export type RegisterFormType = {
  username: string;
  password: string;
  "confirm-password": string;
  termsOfUse: boolean;
};

export type EditUserFormFields = {
  username: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
  age?: number;
  location?: string;
};
