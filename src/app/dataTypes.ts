export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  emailOrName: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity: undefined | number;
}

export interface Cart {
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  quantity: undefined | number;
  id: number | undefined;
  userId: number;
  productId: number;
}
export interface User {
  name: string;
  email: string;
  password: string;
  id: number;
}
export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number | undefined;
}
// json-server --watch db.json
