import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Github,
  Linkedin,
  Smartphone,
  Lock,
  Clock,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-black selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="bg-black text-white p-2 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">PayCore</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-black transition">
              Features
            </a>
            
            <a href="#faq" className="hover:text-black transition">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/signin">
              <Button
                variant="ghost"
                className="hidden md:inline-flex text-zinc-600 hover:text-black"
              >
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full px-6 bg-black hover:bg-zinc-800 transition-all hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        <section className="relative max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-sm bg-zinc-100 text-zinc-600 hover:bg-zinc-200 rounded-full border border-zinc-200"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Live v2.0
            </Badge>

            <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter leading-[1.1]">
              The future of <br />
              <span className="text-zinc-400">payments is here.</span>
            </h1>

            <p className="text-xl text-zinc-500 max-w-lg leading-relaxed">
              Stop waiting 3 days for bank transfers. Send money globally in
              milliseconds with zero friction and 100% security.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-14 px-8 rounded-full text-base bg-black hover:bg-zinc-800 w-full"
                >
                  Create Free Account
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 rounded-full text-base border-zinc-200 w-full"
                >
                  View Demo
                </Button>
              </a>
            </div>

            <div className="pt-8 border-t border-zinc-100 flex items-center gap-8 text-zinc-500">
              <div>
                <p className="text-2xl font-bold text-black">₹10M+</p>
                <p className="text-xs uppercase tracking-wider">Processed</p>
              </div>
              <div className="w-px h-10 bg-zinc-200"></div>
              <div>
                <p className="text-2xl font-bold text-black">50k+</p>
                <p className="text-xs uppercase tracking-wider">Users</p>
              </div>
              <div className="w-px h-10 bg-zinc-200"></div>
              <div>
                <p className="text-2xl font-bold text-black">0.4s</p>
                <p className="text-xs uppercase tracking-wider">Latency</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30 mix-blend-multiply"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 mix-blend-multiply"></div>

            <Card className="relative bg-zinc-950 text-white border-zinc-800 shadow-2xl overflow-hidden rounded-[40px]">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="space-y-1">
                    <p className="text-zinc-400 text-sm">Total Balance</p>
                    <p className="text-4xl font-bold tracking-tight">
                      ₹ 24,500.00
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-2 rounded-full">
                    <Wallet className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                          AS
                        </div>
                        <div>
                          <p className="font-medium text-sm">Adarsh Tiwary</p>
                          <p className="text-xs text-zinc-400">Transfer</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-mono text-sm">
                        + ₹500.00
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-sm text-zinc-400">
                  <span>**** 4218</span>
                  <span>VISA</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="border-y border-zinc-100 bg-zinc-50/50 py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-6">
              Powered by modern infrastructure
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Globe className="w-5 h-5" /> Razorpay
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <ShieldCheck className="w-5 h-5" /> AWS
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Zap className="w-5 h-5" /> MongoDB
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                <Lock className="w-5 h-5" /> Auth0
              </div>
            </div>
          </div>
        </div>

        <section
          id="features"
          className="py-32 bg-zinc-950 text-white relative overflow-hidden"
        >

          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <Badge
                variant="outline"
                className="border-zinc-700 text-zinc-300 mb-6"
              >
                What sets us apart
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                Banking infrastructure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  re-imagined for speed.
                </span>
              </h2>
              <p className="text-xl text-zinc-400 leading-relaxed">
                We've rebuilt the payment stack from the ground up to be faster,
                safer, and simpler than anything else.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-10 h-10 text-white" />,
                  color: "from-amber-400/20 to-orange-400/0",
                  title: "Blazing Fast Settlement",
                  desc: "Optimized Node.js architecture ensures your money moves in milliseconds, not days.",
                },
                {
                  icon: <ShieldCheck className="w-10 h-10 text-white" />,
                  color: "from-blue-400/20 to-indigo-400/0",
                  title: "Bank-Grade Security",
                  desc: "ACID-compliant transactions and AES-256 encryption keep your funds completely safe.",
                },
                {
                  icon: <Smartphone className="w-10 h-10 text-white" />,
                  color: "from-green-400/20 to-emerald-400/0",
                  title: "Mobile-First Design",
                  desc: "A powerful, minimalist interface crafted perfectly for the device in your pocket.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/80"
                >

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                  ></div>

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-24 bg-zinc-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Get started in 3 minutes
                </h2>
                <p className="text-zinc-400 max-w-md">
                  No paperwork, no branch visits. Just download and go.
                </p>
              </div>
              <Link to="/signup">
                <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8">
                  Join Now
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-zinc-800 via-zinc-500 to-zinc-800 z-0"></div>

              {[
                {
                  step: "01",
                  title: "Create Account",
                  desc: "Sign up with your email and set a secure PIN.",
                },
                {
                  step: "02",
                  title: "Add Money",
                  desc: "Top up your wallet securely via our Razorpay integration.",
                },
                {
                  step: "03",
                  title: "Send Instantly",
                  desc: "Find friends by name and send money with one tap.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-zinc-900 border-4 border-zinc-950 flex items-center justify-center text-3xl font-bold mb-6 shadow-xl">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-zinc-400 max-w-xs">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                Is my money safe?
              </AccordionTrigger>
              <AccordionContent className="text-zinc-500 leading-relaxed">
                Absolutely. We use industry-standard encryption and verify every
                transaction with a 2-factor PIN system. Your wallet balance is
                stored in an immutable ledger.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                Are there any transaction fees?
              </AccordionTrigger>
              <AccordionContent className="text-zinc-500 leading-relaxed">
                No. Peer-to-peer (P2P) transfers on PayCore are completely free.
                We believe you shouldn't pay to send your own money.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">
                How do I add money?
              </AccordionTrigger>
              <AccordionContent className="text-zinc-500 leading-relaxed">
                You can add money via UPI, Credit Card, or Net Banking through
                our secure Razorpay integration. The balance reflects instantly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="py-24 bg-zinc-50 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="text-4xl font-bold tracking-tighter">
              Ready to upgrade your financial life?
            </h2>
            <p className="text-xl text-zinc-500">
              Join the thousands of users who have switched to a faster, cleaner
              way to pay.
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                className="h-14 px-10 mt-3 rounded-full text-lg bg-black hover:bg-zinc-800 shadow-xl hover:shadow-2xl transition-all"
              >
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>

        <footer className="py-8 border-t border-zinc-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
            <p>© 2024 PayCore Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-black">
                Terms
              </a>
              <a href="#" className="hover:text-black">
                Privacy
              </a>
              <a
                href="https://github.com/Adarsh311002"
                target="_blank"
                className="hover:text-black flex items-center gap-2"
              >
                <Github className="w-4 h-4" />  
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
