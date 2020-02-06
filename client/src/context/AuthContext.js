import { createContext } from "react";

const noop = () => {};

export const AuthContext = createContext({
  login: noop,
  logout: noop,
  token: null,
  userId: null,
  isAuthenticated: false
});
