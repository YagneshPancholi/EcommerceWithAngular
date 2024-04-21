export interface SignUp {
  Name: string;
  Email: string;
  Password: string;
}

export interface Login {
  Name: string;
  Password: string;
}

export interface Product {
  Id: number;
  Name: string;
  Price: number;
  Category: string;
  Color: string;
  Description: string;
  Image: string;
  Quantity: undefined | number;
}

export interface Cart {
  Name: string;
  Price: number;
  Category: string;
  Color: string;
  Description: string;
  Image: string;
  Quantity: undefined | number;
  Id: number | undefined;
  UserId: number;
  ProductId: number;
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
