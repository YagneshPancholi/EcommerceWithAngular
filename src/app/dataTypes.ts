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
  name: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
}
// json-server --watch db.json
