"use client"
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [form, setForm] = useState({email: "", password: ""});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try{
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if(!res.ok){
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setSuccess("Welcome back! Taking you to your next adventure...");
      setTimeout(() => {
        router.push('/explore');
      }, 900);
    }catch(err){
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0F4C5C] transition"
        aria-label="Back to home"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>
      <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl border border-gray-100">
        {success && (
          <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Sign In
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Enter your credentials to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-[#0F4C5C] transition">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-sm"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#0F4C5C] hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-[#0F4C5C] transition">
            <Lock size={18} className="text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#0F4C5C] text-white py-3 rounded-2xl font-medium hover:bg-[#0C3D4A] transition shadow-md"
        >
          Sign In
        </button>
      </form>
      
      {/* Footer */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <Link href="/register" className="text-[#0F4C5C] font-medium">
          Sign up
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Login;