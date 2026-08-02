import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker">404</p>
        <h1>Nothing on the menu here.</h1>
        <p className="lede">
          This page doesn&rsquo;t exist —{" "}
          <Link href="/" className="text-link">
            head back home
          </Link>
          .
        </p>
      </header>
    </div>
  );
}
