import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-4xl font-bold text-stone-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-lg mb-6 text-center text-stone-400">
        The page youre looking for doesnt exist or an error occurred. Please try
        again or return to the homepage.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-stone-500 text-white rounded-lg shadow hover:bg-stone-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
