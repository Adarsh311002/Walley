import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTransfer = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(
        "http://localhost:5001/api/v1/account/transfer",
        { to: id, amount: Number(amount) },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setSuccess("Transfer successful!");
      setAmount("");
    } catch (error) {
      console.error("Transfer error:", error);
      setError(
        error.response?.data?.message || "Transfer failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 flex items-center justify-center p-4">
      <div className="bg-white/20 backdrop-blur-md rounded-xl w-full max-w-md p-6 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Send Money</h2>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-2xl text-white">
              {name?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-white">
            {name || "Unknown User"}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-white"
            >
              Amount (in ₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-red-200 text-sm text-center">{error}</div>
          )}

          {success && (
            <div className="text-green-200 text-sm text-center">{success}</div>
          )}

          <button
            onClick={handleTransfer}
            disabled={loading || !amount}
            className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md transition-colors
                            ${
                              loading || !amount
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }
                        `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Initiate Transfer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
