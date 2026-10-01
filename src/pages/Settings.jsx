import React, { useState } from 'react';
import {
  User,
  Sliders,
  Server,
  Shield,
  Save,
  CheckCircle2,
  Database,
  Key,
} from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export const Settings = () => {
  const { user } = useDocuments();
  const [name, setName] = useState(user?.name || 'Arun Kumar');
  const [email, setEmail] = useState(user?.email || 'arun.kumar@documind.ai');
  const [apiBaseUrl, setApiBaseUrl] = useState('http://localhost:8000/api/v1');
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Settings & Configuration
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your account profile, OCR parameters, and backend FastAPI connectivity.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-emerald-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Card */}
        <Card
          title="User Profile"
          subtitle="Personal information and credentials for your DocuMind workspace"
          bodyClassName="p-6 space-y-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80'}
              alt={name}
              className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <p className="text-sm font-semibold text-slate-800">{name}</p>
              <p className="text-xs text-slate-500">{user?.role || 'Lead Researcher'}</p>
              <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Role: Academic Lead
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>
          </div>
        </Card>

        {/* Backend Integration (FastAPI readiness) */}
        <Card
          title="Backend API Connection (FastAPI)"
          subtitle="Configure the REST API endpoint that will connect to FastAPI in the next phase"
          bodyClassName="p-6 space-y-4"
        >
          <div className="text-xs space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                FastAPI Base URL
              </label>
              <div className="relative">
                <Server className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={apiBaseUrl}
                  onChange={(e) => setApiBaseUrl(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-mono text-xs"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Ready for Axios client integration in <code className="bg-slate-100 px-1 py-0.5 rounded">src/api/axiosClient.js</code>.
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-semibold text-slate-700">API Connection Status:</span>
                <span className="text-slate-600">Frontend Simulation Mode (Standby)</span>
              </div>
              <span className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded font-mono text-slate-600">
                Mock Mode Active
              </span>
            </div>
          </div>
        </Card>

        {/* OCR & AI Extraction Preferences */}
        <Card
          title="OCR & Extraction Parameters"
          subtitle="Fine-tune confidence limits and default language preferences"
          bodyClassName="p-6 space-y-4"
        >
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">
                  Minimum Confidence Threshold
                </label>
                <span className="font-mono text-brand-600 font-bold">
                  {confidenceThreshold}%
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="99"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Entities extracted with scores below this percentage will be flagged with a review badge.
              </p>
            </div>
          </div>
        </Card>

        {/* Save CTA */}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
