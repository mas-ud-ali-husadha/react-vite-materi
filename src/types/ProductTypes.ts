export interface Product {
  id?: number;
  name: string;
  photo_url: string;
  product_category_name: string;
  is_available: number;
  price: number | string;
}

interface Meta {
  links: string[];
  total: number;
}

interface Data {
  list: Product[];
  meta: Meta;
}

export interface ProductResponse {
  data: Data;
  message: string;
  settings: any[]; // Change 'any[]' to a more specific type if you know the structure of settings.
}

interface Details {
  description: string;
  type: string;
  price: string | number;
}
export interface FormData {
  id?: number;
  name: string;
  photo_url: Blob | MediaSource | string | any;
  product_category_id: string | number | null;
  is_available: number | null;
  price: number | string;
  description: any;
  details?: Details[];
}

export interface ProductParams {
  [key: string]: string | number;
  per_page: number;
  page: number;
}
