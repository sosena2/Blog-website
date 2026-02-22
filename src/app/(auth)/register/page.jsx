"use client"
import {useState} from 'react'
import Link from "next/link";
import { User, Mail, Lock } from "lucide-react";
import { useRouter } from 'next/navigation';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setForm(prev => ({...prev, [name]: value}));
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // basic validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try{
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
         
      });

      const data = await res.json();

      if(!res.ok){
        setError(data.message || "Registration failed");
        return;
      }
      setSuccess("Account created! Redirecting you to sign in...");
      setTimeout(() => {
        router.push('/login');
      }, 1200);
    }catch(err){
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
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
        <h2 className="text-3xl font-semibold">Create Account</h2>
        <p className="text-gray-500 text-sm mt-2">
          Join our community of travelers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input Component Style */}
        {[
          { label: "Full Name", type: "text", icon: User, placeholder: "John Doe", name:"name" },
          { label: "Email", type: "email", icon: Mail, placeholder: "you@example.com", name: "email" },
          { label: "Password", type: "password", icon: Lock, placeholder: "•••••••", name: "password"},
          { label: "Confirm Password", type: "password", icon: Lock, placeholder: "••••••••", name: "confirmPassword" },
        ].map((field, i) => {
          const Icon = field.icon;
          return (
            <div key={i}>
              <label className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-[#0F4C5C] transition">
                <Icon size={18} className="text-gray-400" />
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>
          );
        })}

        {/* Terms */}
        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" className="mt-1 accent-[#0F4C5C]" />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-gray-700 font-medium">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-700 font-medium">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#0F4C5C] text-white py-3 rounded-2xl font-medium hover:bg-[#0C3D4A] transition shadow-md"
        >
          Create Account
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-gray-700 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;