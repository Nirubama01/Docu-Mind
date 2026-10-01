import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import Button from '../components/common/Button';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useDocuments();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      register(name, email, password);
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo & Header */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                DocuMind
              </span>
              <span className="ml-1.5 text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                AI Intelligence
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Create your account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Join DocuMind to test document intelligence and analysis tools.
          </p>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900"
                  placeholder="Arun Kumar"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900"
                  placeholder="arun.kumar@documind.ai"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                defaultChecked
                required
                className="h-4 w-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-slate-600">
                I agree to the academic research use and privacy policies.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-brand-600 hover:text-brand-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Decorative Academic Project Banner */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 h-full flex flex-col justify-center max-w-lg mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 w-fit">
            Academic Project Overview
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
            Designed for Modern Academic & Enterprise Document Workflows.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            DocuMind bridges the gap between raw unstructured files and structured intelligence. Designed with a clean modular React frontend ready for FastAPI backend integration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
