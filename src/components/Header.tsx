import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [visible, setVisible] = useState<Boolean>(false);
  return (
    <>
      <header className="h-[60px] shadow--bottom fixed top-0 w-full font-bold bg-slate-50 px-4">
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
              <Link href="/">바연젠</Link>
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
          <button className="font-bold">로그인</button>
        </div>
      </header>
      <nav
        className={`${
          visible ? "block" : "hidden"
        } md:hidden absolute w-full bg-slate-50 shadow--bottom flex justify-center font-bold p-2`}
      >
        <ul>
          <li className="mb-3" onClick={() => setVisible(false)}>
            <Link href="/record">기록</Link>
          </li>
          <li onClick={() => setVisible(false)}>
            <Link href="/community">커뮤니티</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
