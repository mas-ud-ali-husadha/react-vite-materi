interface Access {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  photo_url: string;
  phone_number: string | null;
  updated_security: string;
  user_roles_id: string;
  access: {
    user: Access;
    roles: Access;
  };
}

interface Meta {
  links: string[];
  total: number;
}

interface Data {
  list: User[];
  meta: Meta;
}

export interface UserResponse {
  data: Data;
  message: string;
  settings: any[]; // Change 'any[]' to a more specific type if you know the structure of settings.
}

export interface ListData {
  id?: number | null;
  email: string;
  name: string;
  password?: string;
  phone_number: string | null;
  user_roles_id: "0" | "1" | null;
  photo?: Blob | MediaSource | string | any;
}
export interface UserParams {
  [key: string]: string | number;
  per_page: number;
  page: number;
}
