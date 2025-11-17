// user.model.ts
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}

export interface ToDo{
    userId: number,
    id: number,
    title:string,
    completed: boolean
}

//We create an interface of the data we want to join
export interface UserTodo {
  user :User,
  todos:ToDo[],
  message?:string // we set a property to send any error message trying to get data for that user
}
