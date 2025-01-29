import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = ({ onSendMoneyClick }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5001/api/v1/users/bulk?filter=${filter}`
        );
        setUsers(response.data.data.users || []);
        setError("");
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (filter.trim()) {
        fetchUsers();
      } else {
        setUsers([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [filter]);

  return (
    <div className="rounded-lg p-6">
      <div className="text-2xl font-semibold text-white mb-4">Users</div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {loading && <div className="text-center text-white py-4">Loading...</div>}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      <div className="space-y-4">
        {users.length > 0
          ? users.map((user) => (
              <User
                key={user._id}
                user={user}
                onSendMoneyClick={onSendMoneyClick}
              />
            ))
          : !loading && (
              <div className="text-center text-white py-4">
                {filter ? "No users found" : "Start typing to search users"}
              </div>
            )}
      </div>
    </div>
  );
};

function User({ user, onSendMoneyClick }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center p-4 bg-white/50 rounded-md shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-full h-12 w-12 bg-blue-500 flex justify-center items-center text-xl font-bold text-white">
          {user?.username?.[0]?.toUpperCase() ||
            user?.fullName?.[0]?.toUpperCase() ||
            "?"}
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-gray-800">{user.fullName}</div>
          <div className="text-sm text-gray-600">
            @{user.username || "user"}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          navigate(
            `/send-money?id=${user._id}&name=${encodeURIComponent(
              user.fullname
            )}`
          );
        }}
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
      >
        Send Money
      </button>
    </div>
  );
}
