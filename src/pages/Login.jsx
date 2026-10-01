import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import Button from '../components/common/Button';

export const Login = () => {
  const [email, setEmail] = useState('arun.kumar@documind.ai');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useDocuments();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/');
    }, 600);
  };

  const handleDemoLogin = () => {
    setEmail('arun.kumar@documind.ai');
    setPassword('demo12345');
    setIsLoading(true);
    setTimeout(() => {
      login('arun.kumar@documind.ai', 'demo12345');
      setIsLoading(false);
      navigate('/');
    }, 400);
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
            Sign in to your account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Welcome back! Access your intelligent document dashboard.
          </p>

          {/* Quick Demo Access banner */}
          <div className="mt-5 p-3.5 bg-brand-50/70 border border-brand-200 rounded-xl flex items-center justify-between">
            <div className="text-xs">
              <span className="font-semibold text-brand-900 block">Reviewer Demo Access</span>
              <span className="text-brand-700 text-[11px]">Instant 1-click test login</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={Sparkles}
              onClick={handleDemoLogin}
              className="text-xs bg-white text-brand-700 border-brand-300 hover:bg-brand-50"
            >
              Quick Login
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                >
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Password reset is simulated for this academic prototype.');
                  }}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium"
                >
                  Forgot password?
                </a>
              </div>
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

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-xs text-slate-600"
              >
                Remember me for 30 days
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
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-600">
            Don't have an account yet?{' '}
            <Link
              to="/register"
              className="font-semibold text-brand-600 hover:text-brand-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Decorative Academic Project Banner */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 h-full flex flex-col justify-between max-w-lg mx-auto">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" /> 2-Week Project
            </span>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight leading-tight text-white">
              AI-Powered Document Intelligence at Your Fingertips.
            </h1>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Upload invoices, certificates, and reports. Extract structured fields, chat with your documents using RAG, and perform intelligent side-by-side comparisons.
            </p>
          </div>

          <div className="space-y-4 my-8">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">Structured Data Extraction</h4>
                <p className="text-[11px] text-slate-300">Extract invoice numbers, totals, GST, dates, and line items automatically.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">Interactive Natural Language Q&A</h4>
                <p className="text-[11px] text-slate-300">Ask questions and receive precise answers with verified page-level source citations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">Multi-Document Variance Analysis</h4>
                <p className="text-[11px] text-slate-300">Compare invoices and purchase orders to catch price and date mismatches instantly.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
            <span>DocuMind Project Team</span>
            <span>Frontend Prototype</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
