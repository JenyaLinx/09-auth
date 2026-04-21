import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <ul className={css.navigationList}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.link}>
              Home
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.link}>
              Notes
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}