import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../utils/recoil";
import { getCode, requestLogin } from "../utils/utils";

export default function Signin() {
  const setToken = useSetRecoilState(tokenState);
  const route = useRouter();

  async function fetchData() {
    const code = getCode();
    const token = await requestLogin(code);
    if (token) {
      setToken(token);
      route.push("/");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-20 flex justify-center items-center text-3xl font-bold">
      로그인중...
    </div>
  );
}
