import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { tokenState, userState } from "../utils/recoil";
import { requestLogout } from "../utils/utils";

export default function Header() {
  const [visible, setVisible] = useState<Boolean>(false);
  const [token, setToken] = useRecoilState(tokenState);
  const route = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  return (
    <header className="h-[60px] shadow-bottom fixed top-0 w-full font-bold bg-slate-50 px-4">
      <div className="max-w-screen-xl w-full flex justify-between m-auto items-center h-full">
        <div className="md:hidden cursor-pointer w-[21px]" onClick={() => setVisible((prev) => !prev)}>
          {visible ? (
            <FontAwesomeIcon className="text-2xl" icon={faTimes} />
          ) : (
            <FontAwesomeIcon className="text-2xl" icon={faBars} />
          )}
        </div>
        <div className="flex items-center justify-center">
          <h1 className="text-2xl absolute md:relative">
            <Link href="/">Logo</Link>
          </h1>
          <nav className="md:flex items-center hidden">
            <ul className="flex">
              <li className="ml-3">
                <Link href="/record">기록</Link>
              </li>
              <li className="ml-3">
                <Link href="/community">커뮤니티</Link>
              </li>
            </ul>
          </nav>
        </div>
        {token ? (
          <button
            className="font-bold"
            onClick={() => {
              requestLogout(setToken);
              route.push("/");
            }}
          >
            로그아웃
          </button>
        ) : (
          <a
            className="w-[55.37px] text-center"
            href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_URL}/signin&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`}
          >
            로그인
          </a>
        )}
      </div>
      <ul
        className={`${
          visible ? "block" : "hidden"
        } md:hidden absolute w-full bg-slate-50 font-bold left-0 p-2 text-center shadow-bottom`}
      >
        <li className="mb-3" onClick={() => setVisible(false)}>
          <Link href="/record">기록</Link>
        </li>
        <li onClick={() => setVisible(false)}>
          <Link href="/community">커뮤니티</Link>
        </li>
      </ul>
    </header>
  );
}
