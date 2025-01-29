import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import { Link } from "react-router-dom";
import { LogOut, Wallet } from "lucide-react";
import axios from "axios";
import { SendMoney } from "../components/SendMoney";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showSendMoney, setShowSendMoney] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [balance, setBalance] = useState(0); 
    const [loadingBalance, setLoadingBalance] = useState(true);
    const [balanceError, setBalanceError] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setBalanceError("Authentication required");
                    setLoadingBalance(false);
                    return;
                }
    
                const response = await axios.get(
                    "http://localhost:5001/api/v1/account/balance",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
    
                
                if (response.data?.success && response.data.balance !== undefined) {
                    setBalance(response.data.balance);
                    setBalanceError("");
                } else {
                    throw new Error("Invalid balance response format");
                }
            } catch (error) {
                console.error("Balance fetch error:", error);
                setBalanceError(error.response?.data?.message || error.message);
                setBalance(0);
            } finally {
                setLoadingBalance(false);
            }
        };
    
        fetchBalance();
    }, []);

    useEffect(() => {
        const searchUsers = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(
                        `http://localhost:5001/api/v1/users/bulk?filter=${searchTerm}`
                    );
                    setUsers(response.data.data.users || []);
                } catch (error) {
                    console.error("Search error:", error);
                    setUsers([]);
                }
            } else {
                setUsers([]);
            }
        };

        
        const debounceTimer = setTimeout(() => {
            searchUsers();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSendMoneyClick = (user) => {
        setSelectedUser(user);
        setShowSendMoney(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-400">
            <nav className="bg-white/10 backdrop-blur-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/dashboard" className="flex items-center">
                        <Wallet className="h-6 w-6 text-white mr-2" />
                        <span className="text-xl font-bold text-white">Walley</span>
                    </Link>
                    <div className="relative">
                        <button className="flex items-center gap-2 p-2 bg-white/20 rounded-full focus:outline-none">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-700">U</span>
                            </div>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                            <div className="p-2">
                                <p className="font-medium text-gray-800">User</p>
                                <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto mt-8 p-4">
            <Balance 
                value={balance} 
                loading={loadingBalance} 
                error={balanceError} 
            />
                
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-6">
                    <Users 
                        users={users} 
                        onSendMoneyClick={handleSendMoneyClick}
                        onSearch={setSearchTerm}
                    />
                    
                    {showSendMoney && selectedUser && (
                        <SendMoney 
                            user={selectedUser} 
                            onClose={() => setShowSendMoney(false)}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}


