"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useProduct } from "@/context/product";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useCart } from "@/context/cart";

export default function TopNav() {
  const { data, status } = useSession();
  // console.log(data, status);
  const { cartItems } = useCart();
  const {
    productSearchQuery,
    setProductSearchQuery,
    fetchProductSearchResults,
  } = useProduct();

  return (
    <nav className="nav shadow p-2 justify-content-between mb-3">
      <div className="d-flex">
        <Link href="/" className="nav-link">
          <img
            src="/images/websiteNavLOGO.jpg"
            alt="logo"
            style={{ height: "40px" }}
          />
        </Link>

        <Link href="/shop" className="nav-link">
          SHOP
        </Link>
      </div>

      <form
        className="d-flex mx-2 mb-0"
        role="search"
        onSubmit={fetchProductSearchResults}
      >
        <input
          type="search"
          className="form-control"
          placeholder="Search products"
          aria-label="Search"
          onChange={(e) => setProductSearchQuery(e.target.value)}
          value={productSearchQuery}
        />
        <button className="btn rounded-pill" type="submit">
          &#128270;
        </button>
      </form>

      <div className="d-flex justify-content-end">
        <Link href="/cart" className="nav-link text-danger">
          <BsFillCartCheckFill size={25} /> {cartItems?.length}
        </Link>
        {status === "authenticated" ? (
          <>
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
          </>
        ) : status === "loading" ? (
          <a className="nav-link text-danger">Loading</a>
        ) : (
          <>
            <Link className="nav-link" href="/login">
              Login
            </Link>

            <Link className="nav-link" href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
