export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface User {
  id: number;
  username: string;
  avatar?: string;
}