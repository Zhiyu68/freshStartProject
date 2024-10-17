"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function TopNav() {
  const { data, status } = useSession();
  console.log(data, status);

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <Link href="/" className="nav-link">
        🛒 NEXTECOM
      </Link>

      {status === "authenticated" ? (
        <div className="d-flex justify-content-end">
          <Link
            className="nav-link"
            href={`/dashboard/${
              data?.user?.role === "admin" ? "admin" : "user"
            }`}
          >
            {data?.user?.name} ({data?.user?.role})
          </Link>
          <a
            className="nav-link pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </a>
        </div>
      ) : status === "loading" ? (
        <a className="nav-link text-danger">Loading</a>
      ) : (
        <div className="d-flex">
          <Link className="nav-link" href="/login">
            Login
          </Link>

          <Link className="nav-link" href="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
