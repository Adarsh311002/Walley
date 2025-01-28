import React from 'react'
import { Link } from 'react-router-dom'
import {Wallet , Github , Linkedin} from "lucide-react"
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-blue-300 to-green-400">
              <Navbar />
              <main className="flex-1 flex items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Send Money Instantly with Walley
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 mb-8">
            Fast, secure, and easy money transfers. Join thousands of satisfied users and experience the future of
            payments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/SignUp"
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-blue-600 shadow transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </Link>
            <Link
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </Link>
          </div>
          <div className="flex justify-center space-x-6">
          <a
  href="https://github.com/Adarsh311002"
  target="_blank" // Opens the link in a new tab
  rel="noopener noreferrer" // Improves security when opening external links
  className="text-white hover:text-blue-100"
>
  <Github className="h-8 w-8" />
  <span className="sr-only">GitHub</span>
</a>
            <a
              href="https://www.linkedin.com/in/adarsh-081533287"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-100"
            >
              <Linkedin className="h-8 w-8" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white">© 2024 Walley Inc. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-blue-100 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-blue-100 hover:text-white">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>

        </div>
      )
}

export default Home
