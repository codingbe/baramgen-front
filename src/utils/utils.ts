import { SetterOrUpdater } from "recoil";
import { TokenState, UserInfo } from "./typeDefs";

export async function requestLogin(code: string | null) {
  const { token }: { token: string; userInfo: UserInfo } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
    method: "POST",
    body: JSON.stringify({ code }),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.ok && res.json());

  localStorage.setItem("token", token);
  return token;
}

export function requestLogout(setToken: SetterOrUpdater<TokenState>) {
  localStorage.removeItem("token");
  setToken(null);
}

export function getCode() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  return code;
}
