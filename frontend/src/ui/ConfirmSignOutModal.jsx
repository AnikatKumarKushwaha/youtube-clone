/* eslint-disable react/prop-types */
export default function ConfirmSignOutModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Confirm Sign Out</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to sign out?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
