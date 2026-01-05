import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wallet,
  LogOut,
  Search,
  Plus,
  MoveRight,
  Loader2,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState("User");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idempotencyKey, setIdempotencyKey] = useState("");

  const [amount, setAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);

  const [addAmount, setAddAmount] = useState("");
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addMoneyLoading, setAddMoneyLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const initData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const balRes = await axios.get(
          "http://localhost:5001/api/v1/account/balance",
          config
        );
        setBalance(balRes.data.balance);
        if (balRes.data.name) setUserName(balRes.data.name);

        const historyRes = await axios.get(
          "http://localhost:5001/api/v1/account/history",
          config
        );
        setTransactions(historyRes.data.transactions);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5001/api/v1/users/bulk?filter=${searchTerm}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUsers(response.data.data.users || []);
        } catch (error) {
          console.error(error);
        }
      } else {
        setUsers([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const openTransferDialog = (user) => {
    setSelectedUser(user);
    setIdempotencyKey(uuidv4());
    setIsDialogOpen(true);
  }

  const handleAddMoney = async () => {
    if (!addAmount || Number(addAmount) <= 0) {
      toast.error("Enter valid amount");
      return;
    }
    setAddMoneyLoading(true);

    try {
      const token = localStorage.getItem("token");

      const orderRes = await axios.post(
        "http://localhost:5001/api/v1/payment/create-order",
        { amount: Number(addAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderData = orderRes.data.order;

      const options = {
        key: "rzp_test_YOUR_ACTUAL_KEY_HERE", 
        amount: orderData.amount,
        currency: "INR",
        name: "PayCore",
        description: "Add Funds",
        order_id: orderData.id,
       
        handler: async function (response) {
          try {
            await axios.post(
              "http://localhost:5001/api/v1/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: Number(addAmount),
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            setBalance((prev) => prev + Number(addAmount));
            setIsAddMoneyOpen(false);
            setAddAmount("");
            toast.success("Payment Successful!");

            const historyRes = await axios.get(
              "http://localhost:5001/api/v1/account/history",
              { headers: { Authorization: `Bearer ${token}` } }
            );
            setTransactions(historyRes.data.transactions);
          } catch (verifyError) {
            toast.error("Payment Verification Failed");
          }
        },
        theme: { color: "#000000" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment");
    } finally {
      setAddMoneyLoading(false);
    }
  };

  const handleTransfer = async () => {
    setTransferLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/v1/account/transfer",
        { to: selectedUser._id, amount: Number(amount) },
        { headers: {
           Authorization: `Bearer ${token}`,
           'Idempotency-Key': idempotencyKey
          } 
        }
      );

      setIsDialogOpen(false);
      setAmount("");
      setBalance((prev) => prev - Number(amount));
      toast.success("Transfer Successful");

      const historyRes = await axios.get(
        "http://localhost:5001/api/v1/account/history",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(historyRes.data.transactions);
    } catch (error) {
      toast.error(
        "Transfer Failed: " + (error.response?.data?.message || "Error")
      );
    } finally {
      setTransferLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      <nav className="border-b border-zinc-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-1.5 rounded-md">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg tracking-tight">PayCore</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-semibold text-zinc-900">
                {userName}
              </span>
              <span className="text-xs text-zinc-500">Personal Account</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-zinc-500 hover:text-black hover:bg-zinc-100"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-6 py-12 space-y-12">
        <section className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-zinc-500 font-medium mb-1">Total Balance</h2>
            <div className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900">
              {loading ? "..." : `₹${balance.toLocaleString("en-IN")}`}
            </div>
          </div>
          <div className="flex gap-3">
            <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
              <DialogTrigger asChild>
                <Button className="h-12 px-6 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full text-md font-medium transition-transform active:scale-95">
                  <Plus className="w-4 h-4 mr-2" /> Add Money
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Funds</DialogTitle>
                  <DialogDescription>
                    Add money via Razorpay securely.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-8 flex justify-center items-center gap-2">
                  <span className="text-3xl text-zinc-400">₹</span>
                  <input
                    type="number"
                    placeholder="500"
                    className="text-5xl font-bold text-center w-48 outline-none bg-transparent placeholder:text-zinc-200"
                    autoFocus
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    className="w-full h-11 bg-black hover:bg-zinc-800 text-white"
                    onClick={handleAddMoney}
                    disabled={addMoneyLoading}
                  >
                    {addMoneyLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      "Confirm Deposit"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="h-12 px-6 border-zinc-300 hover:bg-zinc-100 rounded-full text-md font-medium text-zinc-700"
            >
              Withdraw
            </Button>
          </div>
        </section>

        <div className="h-px bg-zinc-200 w-full" />

        {/* TABS */}
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="bg-zinc-100 p-1 rounded-lg mb-8">
            <TabsTrigger value="send" className="px-6">
              Send Money
            </TabsTrigger>
            <TabsTrigger value="history" className="px-6">
              Transactions
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="send"
            className="animate-in fade-in-50 duration-500"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-4">
                <h3 className="text-xl font-semibold">Find People</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Name or username"
                    className="pl-10 h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <p className="text-sm text-zinc-500">
                  Search for users to transfer money instantly.
                </p>
              </div>

              <div className="md:col-span-2">
                <Card className="border shadow-sm">
                  <div className="max-h-[400px] overflow-y-auto">
                    {users.length === 0 ? (
                      <div className="py-12 flex flex-col items-center justify-center text-zinc-400">
                        <Search className="h-10 w-10 mb-3 opacity-20" />
                        <p>Search for a user to start</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-100">
                        {users.map((user) => (
                          <div
                            key={user._id}
                            className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center font-semibold">
                                {user.fullname[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="font-medium">{user.fullname}</p>
                                <p className="text-xs text-zinc-500">
                                  @{user.username}
                                </p>
                              </div>
                            </div>

                            <Dialog
                              open={
                                isDialogOpen && selectedUser?._id === user._id
                              }
                              onOpenChange={(open) => {
                                setIsDialogOpen(open);
                                if (!open) setSelectedUser(null);
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setIsDialogOpen(true);
                                  }}
                                >
                                  Send <MoveRight className="w-4 h-4 ml-2" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Transfer Money</DialogTitle>
                                  <DialogDescription>
                                    Sending to{" "}
                                    <span className="font-bold text-black">
                                      {user.fullname}
                                    </span>
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-8 flex justify-center items-center gap-2">
                                  <span className="text-3xl text-zinc-400">
                                    ₹
                                  </span>
                                  <input
                                    type="number"
                                    placeholder="0"
                                    className="text-5xl font-bold text-center w-48 outline-none bg-transparent"
                                    autoFocus
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                  />
                                </div>
                                <DialogFooter>
                                  <Button
                                    className="w-full bg-black hover:bg-zinc-800 text-white"
                                    onClick={handleTransfer}
                                    disabled={transferLoading}
                                  >
                                    {transferLoading
                                      ? "Processing..."
                                      : "Pay Now"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-8">
                      No transactions yet
                    </p>
                  ) : (
                    transactions.map((tx) => (
                      <div
                        key={tx._id}
                        className="flex justify-between items-center border-b border-zinc-100 pb-4 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              tx.type === "DEPOSIT"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {tx.type === "DEPOSIT" ? (
                              <ArrowDownLeft className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {tx.type === "DEPOSIT"
                                ? "Received Money"
                                : "Sent Money"}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {new Date(
                                tx.timestamp || tx.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`font-semibold text-sm ${
                            tx.type === "DEPOSIT"
                              ? "text-green-600"
                              : "text-black"
                          }`}
                        >
                          {tx.type === "DEPOSIT" ? "+" : "-"} ₹{tx.amount}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
