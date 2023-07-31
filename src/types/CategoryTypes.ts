export interface Category {
  id: number;
  name: string;
}

interface Meta {
  links: string[];
  total: number;
}

export interface Data {
  list: Category[];
  meta: Meta;
}

export interface CategoryResponse {
  data: Data;
  message: string;
  settings: any[]; // Change 'any[]' to a more specific type if you know the structure of settings.
}

export interface ListData {
  id?: number | null;
  name: string;
}

export interface CategoryParams {
  [key: string]: string | number;
  per_page: number;
  page: number;
}
