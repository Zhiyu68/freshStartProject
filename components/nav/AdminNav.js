import Link from "next/link";

export default function AdminNav() {
  return (
    <nav className="nav justify-content-center mb-3">
      <Link className="nav-link" href="/dashboard/admin">
        Admin
      </Link>
      <Link className="nav-link" href="/dashboard/admin/category">
        Categories
      </Link>
      <Link className="nav-link" href="/dashboard/admin/tag">
        Tags
      </Link>
      <Link className="nav-link" href="/dashboard/admin/product">
        Add Products
      </Link>
      <Link className="nav-link" href="/dashboard/admin/products">
        Products
      </Link>
      <Link className="nav-link" href="/dashboard/admin/orders">
        Orders
      </Link>
    </nav>
  );
}
