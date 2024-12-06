import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="animate-spin">
      <FaSpinner className="text-4xl" />
    </div>
  );
}
