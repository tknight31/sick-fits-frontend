import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick Fits</Link>
        <div className="sub-bar">
          <p>search</p>
        </div>
      </div>
      <Nav />
    </header>
  );
}
