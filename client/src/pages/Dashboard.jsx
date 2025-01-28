

import { useState } from "react";
import { Link } from 'react-router-dom'
import { Wallet, Search, User, LogOut } from "lucide-react";

// Mock data for demonstration
const currentUser = {
  name: "John Doe",
  email: "john@example.com",
  balance: 1000.0,
  avatar: "https://github.com/shadcn.png", 
};

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-400">
      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center">
            <Wallet className="h-6 w-6 text-white mr-2" />
            <span className="text-xl font-bold text-white">Walley</span>
          </Link>
          <div className="relative">
            <button className="flex items-center gap-2 p-2 bg-white/20 rounded-full focus:outline-none">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full"
              />
            </button>
       
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-8 p-4">
        {/* Balance Display */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Your Balance</h2>
          <p className="text-4xl font-bold text-white">${currentUser.balance.toFixed(2)}</p>
        </div>

        {/* User Search and Money Transfer */}
        <div className="bg-white/20 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Send Money</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none">
              <Search className="h-4 w-4" />
              Search
            </button>
          </div>

          {/* User List */}
          <div className="space-y-2 mb-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-2 rounded-md cursor-pointer ${
                  selectedUser?.id === user.id
                    ? "bg-blue-600 text-white"
                    : "bg-white/50 text-gray-800"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm">{user.email}</p>
              </div>
            ))}
          </div>

          {/* Send Money Button */}
          <button
            className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md ${
              selectedUser
                ? "bg-blue-600 hover:bg-blue-700 focus:outline-none"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedUser}
            onClick={() => {
              if (selectedUser) {
                alert(`Sending money to ${selectedUser.name}`);
              }
            }}
          >
            Send Money
          </button>
        </div>
      </main>
    </div>
  );
}
