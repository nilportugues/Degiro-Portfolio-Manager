import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
      <Link href="/">
        <a className="d-flex align-items-center text-dark text-decoration-none">
          <i className="bi bi-file-spreadsheet fs-3 me-1"></i>
          <span className="fs-4">Degiro Portfolio Manager</span>
        </a>
      </Link>
    </header>
  );
};

export default Header;
