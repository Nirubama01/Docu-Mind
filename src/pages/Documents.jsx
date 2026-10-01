import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, UploadCloud, Filter, SlidersHorizontal } from 'lucide-react';
import { useDocuments } from '../context/DocumentContext';
import DocumentTable from '../components/documents/DocumentTable';
import DocumentFilter from '../components/documents/DocumentFilter';
import Button from '../components/common/Button';

export const Documents = () => {
  const { documents, deleteDocument } = useDocuments();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeFilter, setActiveFilter] = useState('All');

  // Update query when URL param changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Compute status counts for filter tabs
  const counts = useMemo(() => {
    return {
      all: documents.length,
      processed: documents.filter((d) => d.status.toLowerCase() === 'processed').length,
      processing: documents.filter((d) => d.status.toLowerCase() === 'processing').length,
      failed: documents.filter((d) => d.status.toLowerCase() === 'failed').length,
    };
  }, [documents]);

  // Filter and search documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Status filter
      if (activeFilter !== 'All' && doc.status.toLowerCase() !== activeFilter.toLowerCase()) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesType = doc.type.toLowerCase().includes(query);
        const matchesExtracted = doc.extractedInfo && JSON.stringify(doc.extractedInfo).toLowerCase().includes(query);
        return matchesName || matchesType || matchesExtracted;
      }
      return true;
    });
  }, [documents, activeFilter, searchQuery]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Document Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, inspect, and manage uploaded files and extracted intelligence.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={UploadCloud}
          onClick={() => navigate('/upload')}
        >
          Upload New Document
        </Button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        {/* Status Filter Tabs */}
        <DocumentFilter
          currentFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, type, entity..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Documents Table */}
      <DocumentTable
        documents={filteredDocuments}
        onDelete={deleteDocument}
        emptyMessage={
          searchQuery
            ? `No documents found matching "${searchQuery}" in ${activeFilter} filter.`
            : `No documents found under the "${activeFilter}" filter.`
        }
      />
    </div>
  );
};

export default Documents;
