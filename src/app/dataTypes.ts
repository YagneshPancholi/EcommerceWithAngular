export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  emailOrName: string;
  password: string;
}

// json-server --watch db.json
