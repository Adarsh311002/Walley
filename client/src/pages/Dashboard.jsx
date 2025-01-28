

import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, Search, User, LogOut } from "lucide-react";

// Mock data for demonstration
const currentUser = {
  name: "John Doe",
  email: "john@example.com",
  balance: 1000.0,
  avatar: "https://github.com/shadcn.png", // example avatar URL
};

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMoney = () => {
    if (selectedUser && amount) {
      alert(`Sending $${amount} to ${selectedUser.name}`);
      setIsDialogOpen(false);
      setAmount("");
    }
  };

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
            <div className="absolute right-0 mt-0 w-48 rounded-md bg-white shadow-lg">
              <div className="p-2">
                <p className="font-medium text-gray-800">{currentUser.name}</p>
                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
                
              </div>
              
              
                </div>
          
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

          {/* Send Money Button and Dialog */}
          <div className="w-full mt-4">
            <button
              className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md ${
                selectedUser
                  ? "bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedUser}
              onClick={() => setIsDialogOpen(true)}
            >
              Send Money
            </button>

            {isDialogOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                <div className="bg-white p-6 rounded-lg w-[400px]">
                  <h2 className="text-xl font-semibold mb-4">
                    Send Money to {selectedUser?.name}
                  </h2>
                  <p className="text-sm mb-4">Enter the amount you want to send.</p>
                  <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      id="amount"
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 bg-gray-300 text-sm rounded-md"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md"
                      onClick={handleSendMoney}
                    >
                      Initiate Transaction
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
