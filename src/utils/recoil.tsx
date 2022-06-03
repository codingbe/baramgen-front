import { atom } from "recoil";
import { TokenState, UserState } from "./typeDefs";

export const userState = atom<UserState>({
  key: "userState",
  default: null,
});

export const tokenState = atom<TokenState>({
  key: "tokenState",
  default: null,
});
