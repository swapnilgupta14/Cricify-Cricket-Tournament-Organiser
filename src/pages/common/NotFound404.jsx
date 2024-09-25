import { Link } from "react-router-dom";

function NotFound404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="4041.png"
        alt="404 Not Found"
        className="w-[50vh] h-[50vh] mb-8"
      />
      <h1 className="text-4xl font-bold text-center mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-center mb-4">
        The page you are looking for could not be found.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Return to Homepage
      </Link>
    </div>
  );
}

export default NotFound404;
