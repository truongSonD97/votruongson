import { createContext as originCreateContext, useContext } from "react";
export function createContext() {
  const context = originCreateContext({});
  return [context.Provider, () => useContext(context), context];
}
