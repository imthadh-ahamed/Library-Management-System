import { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <p>&copy; 2024 Library Management System</p>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="#" className="hover:underline">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
