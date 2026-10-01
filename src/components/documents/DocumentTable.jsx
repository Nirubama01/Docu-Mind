import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FileCode,
  Image,
  Eye,
  MessageSquare,
  Trash2,
  ExternalLink,
  MoreVertical,
  Download,
} from 'lucide-react';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import Modal from '../common/Modal';
import Button from '../common/Button';

export const DocumentTable = ({
  documents = [],
  onDelete,
  isLoading = false,
  emptyMessage = 'No documents found matching your criteria.',
}) => {
  const navigate = useNavigate();
  const [deleteModalDoc, setDeleteModalDoc] = useState(null);

  const getFileIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t === 'pdf') return <FileText className="w-5 h-5 text-red-500" />;
    if (t === 'jpg' || t === 'png') return <Image className="w-5 h-5 text-purple-500" />;
    if (t === 'txt') return <FileCode className="w-5 h-5 text-sky-500" />;
    return <FileText className="w-5 h-5 text-slate-500" />;
  };

  const confirmDelete = () => {
    if (deleteModalDoc && onDelete) {
      onDelete(deleteModalDoc.id);
    }
    setDeleteModalDoc(null);
  };

  if (!isLoading && documents.length === 0) {
    return (
      <EmptyState
        title="No documents to display"
        description={emptyMessage}
        actionLabel="Upload a Document"
        onAction={() => navigate('/upload')}
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200/80">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Document
              </th>
              <th scope="col" className="px-6 py-3.5">
                Type
              </th>
              <th scope="col" className="px-6 py-3.5">
                Uploaded
              </th>
              <th scope="col" className="px-6 py-3.5">
                Status
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Document Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-white group-hover:shadow-sm border border-slate-200/60 transition-all shrink-0">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => navigate(`/documents/${doc.id}`)}
                        className="font-medium text-slate-900 hover:text-brand-600 transition-colors block truncate max-w-xs text-left"
                      >
                        {doc.name}
                      </button>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {doc.size} &bull; {doc.pageCount ? `${doc.pageCount} page${doc.pageCount > 1 ? 's' : ''}` : 'Document'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Type Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge type={doc.type} />
                </td>

                {/* Uploaded Column */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                  {doc.uploadedAt}
                </td>

                {/* Status Column */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge status={doc.status} />
                </td>

                {/* Actions Column */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                  <div className="flex items-center justify-end gap-1">
                    {/* View Details */}
                    <button
                      type="button"
                      title="View Details"
                      onClick={() => navigate(`/documents/${doc.id}`)}
                      className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Ask AI */}
                    <button
                      type="button"
                      title="Ask AI"
                      onClick={() => navigate(`/ask-ai?docId=${doc.id}`)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      title="Delete document"
                      onClick={() => setDeleteModalDoc(doc)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteModalDoc)}
        onClose={() => setDeleteModalDoc(null)}
        title="Delete Document"
        subtitle="This action cannot be undone."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteModalDoc(null)}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete{' '}
          <strong className="text-slate-900">{deleteModalDoc?.name}</strong>?
          All extracted metadata, vectors, and chat history for this document will be permanently removed.
        </p>
      </Modal>
    </>
  );
};

export default DocumentTable;
