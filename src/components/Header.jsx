import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between border-b-2 text-gray-600 mx-auto mb-6">
      <div className="px-5 xl:px-12 py-2 flex w-full items-center">
        <Link to="/" className="font-bold text-2xl">
          Demo
        </Link>
        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12"></ul>
        <div className="hidden xl:flex items-center space-x-5">
          <Link to="/" className="font-bold text-lg">
            Home
          </Link>
        </div>
      </div>
      <Link to="/" className="font-bold  xl:hidden flex mr-6 items-center">
        Home
      </Link>
    </nav>
  );
};

export default Header;
