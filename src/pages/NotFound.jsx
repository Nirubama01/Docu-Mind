import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        The page you are looking for doesn't exist or has been relocated in DocuMind.
      </p>
      <div className="mt-6">
        <Button
          variant="primary"
          size="md"
          icon={Home}
          onClick={() => navigate('/')}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
