import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="p-6 shadow">
      <div className="flex item-center justify-end max-w-7xl mx-auto gap-4">
        <Link className="hover:underline text-gray-600" to={"/"}>
          Home
        </Link>
        <Link className="hover:underline text-gray-600" to={"/issues"}>
          Issues
        </Link>
      </div>
    </nav>
  );
}
