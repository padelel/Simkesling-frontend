import { useState, createContext, useContext } from "react";

export const UserContext = createContext({
  name: "aaa",
  age: 122,
});

export const changeUserContext = (name: string) => {
  // ?
};
