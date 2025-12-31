"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTokens = pathname === "/tokens";

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/logo.svg" alt="CoinCT" width={100} height={100} />
        </Link>

        <nav className="nav">
          <ul className="flex">
            <li>
              <Link
                href="/"
                className={cn("nav-link", {
                  "is-active": isHome,
                  "is-home": true,
                })}
              >
                Home
              </Link>
            </li>

            <button>Search</button>

            <li>
              <Link
                href="/tokens"
                className={cn("nav-link", {
                  "is-active": isTokens,
                })}
              >
                Tokens
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
