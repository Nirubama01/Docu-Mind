import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GitCompare, FileText, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import { MOCK_COMPARISON_FIELDS } from '../data/mockData';
import ComparisonTable from '../components/compare/ComparisonTable';
import Card from '../components/common/Card';

export const CompareDocuments = () => {
  const { documents } = useDocuments();
  const [searchParams] = useSearchParams();

  // Document selectors
  const defaultDocA = searchParams.get('docA') || documents[0]?.id || 'doc-001';
  const defaultDocB = documents.length > 3 ? documents[3]?.id : documents[1]?.id || 'doc-004';

  const [docAId, setDocAId] = useState(defaultDocA);
  const [docBId, setDocBId] = useState(defaultDocB);

  const docA = documents.find((d) => d.id === docAId) || documents[0];
  const docB = documents.find((d) => d.id === docBId) || documents[1] || documents[0];

  // Dynamically build comparison fields between selected Doc A and Doc B
  const comparisonFields = useMemo(() => {
    // If comparing doc-001 and doc-004 (Invoice vs PO), use default comparison data
    const infoA = docA?.extractedInfo || {};
    const infoB = docB?.extractedInfo || {};

    const fields = [
      {
        key: 'documentType',
        label: 'Document Type',
        docA: infoA.documentType || docA?.type || '—',
        docB: infoB.documentType || docB?.type || '—',
        isDifferent: (infoA.documentType || '') !== (infoB.documentType || ''),
      },
      {
        key: 'customer',
        label: 'Customer / Buyer',
        docA: infoA.customer || infoA.recipientName || 'Arun Kumar',
        docB: infoB.customer || infoB.recipientName || 'Arun Kumar',
        isDifferent:
          (infoA.customer || infoA.recipientName) !== (infoB.customer || infoB.recipientName),
      },
      {
        key: 'vendor',
        label: 'Vendor / Issuer',
        docA: infoA.vendor || infoA.issuingAuthority || 'Apex Cloud Solutions Pvt Ltd',
        docB: infoB.vendor || infoB.issuingAuthority || 'Nexus Enterprise Hardware Ltd',
        isDifferent:
          (infoA.vendor || infoA.issuingAuthority) !== (infoB.vendor || infoB.issuingAuthority),
      },
      {
        key: 'date',
        label: 'Recorded Date',
        docA: infoA.date || infoA.issueDate || '15-06-2026',
        docB: infoB.date || infoB.issueDate || '20-06-2026',
        isDifferent: (infoA.date || infoA.issueDate) !== (infoB.date || infoB.issueDate),
      },
      {
        key: 'totalAmount',
        label: 'Total Amount',
        docA: infoA.totalAmount || '₹35,000',
        docB: infoB.totalAmount || '₹42,000',
        isDifferent: (infoA.totalAmount || '₹35,000') !== (infoB.totalAmount || '₹42,000'),
      },
      {
        key: 'taxAmount',
        label: 'Tax / GST Amount',
        docA: infoA.taxAmount || '₹5,339',
        docB: infoB.taxAmount || '₹6,407',
        isDifferent: (infoA.taxAmount || '₹5,339') !== (infoB.taxAmount || '₹6,407'),
      },
      {
        key: 'paymentTerms',
        label: 'Payment Terms',
        docA: infoA.paymentTerms || 'Net 15 Days',
        docB: infoB.paymentTerms || 'Net 30 Days',
        isDifferent: (infoA.paymentTerms || 'Net 15') !== (infoB.paymentTerms || 'Net 30'),
      },
      {
        key: 'status',
        label: 'Settlement Status',
        docA: infoA.status || 'Paid',
        docB: infoB.status || 'Pending Delivery',
        isDifferent: (infoA.status || 'Paid') !== (infoB.status || 'Pending Delivery'),
      },
    ];

    return fields;
  }, [docA, docB]);

  const handleSwap = () => {
    const temp = docAId;
    setDocAId(docBId);
    setDocBId(temp);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          Document Intelligence Comparison
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
            Reconciliation
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select two documents to compare extracted entities side-by-side and highlight variances.
        </p>
      </div>

      {/* Document Selection Control Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Document A Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label
              htmlFor="doc-a-select"
              className="block text-xs font-semibold uppercase tracking-wider text-brand-700"
            >
              Document A (Base Document)
            </label>
            <div className="relative">
              <select
                id="doc-a-select"
                value={docAId}
                onChange={(e) => setDocAId(e.target.value)}
                className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium"
              >
                {documents.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.type}) — {d.extractedInfo?.totalAmount || d.uploadedAt}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400">
              Type: {docA?.type} &bull; Uploaded {docA?.uploadedAt}
            </p>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap Document A and B"
              className="p-2.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-full border border-slate-200 text-slate-600 transition-all hover:scale-105 active:scale-95 shadow-2xs"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Document B Selector */}
          <div className="md:col-span-5 space-y-1.5">
            <label
              htmlFor="doc-b-select"
              className="block text-xs font-semibold uppercase tracking-wider text-indigo-700"
            >
              Document B (Comparison Document)
            </label>
            <div className="relative">
              <select
                id="doc-b-select"
                value={docBId}
                onChange={(e) => setDocBId(e.target.value)}
                className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 text-slate-800 font-medium"
              >
                {documents.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.type}) — {d.extractedInfo?.totalAmount || d.uploadedAt}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-slate-400">
              Type: {docB?.type} &bull; Uploaded {docB?.uploadedAt}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <ComparisonTable
        fields={comparisonFields}
        docAName={docA?.name}
        docBName={docB?.name}
        docAType={docA?.type}
        docBType={docB?.type}
      />
    </div>
  );
};

export default CompareDocuments;
