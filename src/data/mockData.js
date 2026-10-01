/**
 * Centralized Mock Data for DocuMind Frontend
 * Contains documents, extracted entities, AI Q&A responses, comparison schemas, and metrics.
 */

export const MOCK_DOCUMENTS = [
  {
    id: 'doc-001',
    name: 'Invoice.pdf',
    type: 'PDF',
    size: '1.2 MB',
    uploadedAt: '2026-06-15 10:24 AM',
    status: 'Processed', // Processed | Processing | Failed
    pageCount: 2,
    confidenceScore: '98.5%',
    extractedInfo: {
      documentType: 'Tax Invoice',
      invoiceNumber: 'INV-2026-0894',
      date: '15-06-2026',
      dueDate: '30-06-2026',
      customer: 'Arun Kumar',
      vendor: 'Apex Cloud Solutions Pvt Ltd',
      gstin: '33AABCA1234F1Z8',
      currency: 'INR (₹)',
      subtotal: '₹29,661',
      taxAmount: '₹5,339 (18% GST)',
      totalAmount: '₹35,000',
      paymentTerms: 'Net 15 Days',
      status: 'Paid',
      lineItems: [
        { description: 'Cloud Infrastructure Hosting (Q2)', qty: 1, rate: '₹18,500', amount: '₹18,500' },
        { description: 'AI API Endpoint Credits (Tier 2)', qty: 1, rate: '₹8,500', amount: '₹8,500' },
        { description: 'Technical Consultation & Setup', qty: 2, rate: '₹1,330.50', amount: '₹2,661' },
      ],
    },
    summary: 'Tax Invoice INV-2026-0894 issued by Apex Cloud Solutions Pvt Ltd to Arun Kumar for Cloud Infrastructure and AI API Credits totaling ₹35,000 with 18% GST.',
    rawText: `TAX INVOICE
Invoice No: INV-2026-0894
Date: 15-06-2026
Due Date: 30-06-2026

Billed To:
Arun Kumar
Tech Innovators Lab, Chennai, India

Billed From:
Apex Cloud Solutions Pvt Ltd
GSTIN: 33AABCA1234F1Z8

Items:
1. Cloud Infrastructure Hosting (Q2) - ₹18,500
2. AI API Endpoint Credits (Tier 2) - ₹8,500
3. Technical Consultation & Setup (2 hrs) - ₹2,661

Subtotal: ₹29,661
IGST @ 18%: ₹5,339
Total Invoice Amount: ₹35,000 (INR)
Payment Mode: UPI / Bank Transfer
Status: Settled`,
  },
  {
    id: 'doc-002',
    name: 'Certificate.jpg',
    type: 'JPG',
    size: '850 KB',
    uploadedAt: '2026-06-18 03:40 PM',
    status: 'Processed',
    pageCount: 1,
    confidenceScore: '96.2%',
    extractedInfo: {
      documentType: 'Accreditation Certificate',
      certificateNumber: 'CERT-AI-9021',
      recipientName: 'Arun Kumar',
      issuingAuthority: 'National Institute of Artificial Intelligence',
      issueDate: '10-05-2026',
      validUntil: 'Lifetime',
      courseTitle: 'Advanced Deep Learning & Document Intelligence',
      grade: 'Distinction (A+)',
      credentialId: 'NIAI-VERIFIED-8910',
    },
    summary: 'Certificate of completion awarded to Arun Kumar for Advanced Deep Learning & Document Intelligence by the National Institute of Artificial Intelligence.',
    rawText: `CERTIFICATE OF EXCELLENCE
Presented To: Arun Kumar
For successfully completing the Advanced Deep Learning & Document Intelligence Master Program.
Grade: Distinction (A+)
Issue Date: 10-05-2026
Verified by NIAI Board of Directors.
Credential ID: NIAI-VERIFIED-8910`,
  },
  {
    id: 'doc-003',
    name: 'Report.txt',
    type: 'TXT',
    size: '120 KB',
    uploadedAt: '2026-06-20 11:15 AM',
    status: 'Processed',
    pageCount: 3,
    confidenceScore: '99.1%',
    extractedInfo: {
      documentType: 'Quarterly Audit Report',
      reportTitle: 'Q2 AI Model Performance & Latency Report',
      author: 'DocuMind Engineering Team',
      date: '20-06-2026',
      totalDocumentsEvaluated: '1,450 Documents',
      averageProcessingTime: '1.2 seconds / doc',
      accuracyRate: '98.7%',
      findingsCount: '3 Recommendations',
    },
    summary: 'Internal performance audit report evaluating document ingestion latency and extraction accuracy for DocuMind OCR and NLP models during Q2.',
    rawText: `DOCUMIND QUARTERLY AUDIT REPORT
Date: 20-06-2026
Author: Engineering Team

1. EXECUTIVE SUMMARY
DocuMind ingested 1,450 documents across PDF, JPG, and TXT formats.
Average extraction time: 1.2s per page.
Total accuracy score: 98.7% across 15 standard schema fields.

2. OBSERVATIONS
- PDF parsing shows highest fidelity (99.1%).
- Image OCR accuracy improved by 4.2% after adaptive binarization.
- Latency meets standard SLA of < 2.0s.`,
  },
  {
    id: 'doc-004',
    name: 'PurchaseOrder.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedAt: '2026-06-20 02:10 PM',
    status: 'Processed',
    pageCount: 2,
    confidenceScore: '97.8%',
    extractedInfo: {
      documentType: 'Purchase Order',
      orderNumber: 'PO-2026-4412',
      date: '20-06-2026',
      deliveryDate: '05-07-2026',
      customer: 'Arun Kumar',
      vendor: 'Nexus Enterprise Hardware Ltd',
      currency: 'INR (₹)',
      subtotal: '₹35,593',
      taxAmount: '₹6,407',
      totalAmount: '₹42,000',
      paymentTerms: 'Net 30 Days',
      status: 'Pending Delivery',
    },
    summary: 'Purchase Order PO-2026-4412 placed by Arun Kumar with Nexus Enterprise Hardware for server workstations totaling ₹42,000.',
    rawText: `PURCHASE ORDER
PO Number: PO-2026-4412
Date: 20-06-2026
Delivery Date: 05-07-2026

Vendor: Nexus Enterprise Hardware Ltd
Buyer: Arun Kumar
Total Amount: ₹42,000
Status: Confirmed`,
  },
  {
    id: 'doc-005',
    name: 'Contract_Agreement.pdf',
    type: 'PDF',
    size: '3.1 MB',
    uploadedAt: '2026-06-22 09:05 AM',
    status: 'Processing',
    pageCount: 8,
    confidenceScore: 'In progress...',
    extractedInfo: {
      documentType: 'Service Level Agreement',
      contractId: 'SLA-2026-004',
      date: '22-06-2026',
      parties: 'DocuMind Corp & Global Logistics Ltd',
      status: 'Extracting entities & vectors...',
    },
    summary: 'Master Service Level Agreement undergoing text chunking and vector embedding generation.',
    rawText: `[DOCUMENT PROCESSING IN PROGRESS]
Parsing page 4 of 8...
Extracting legal clauses, obligations, and signatures.`,
  },
  {
    id: 'doc-006',
    name: 'Corrupted_Scan.png',
    type: 'PNG',
    size: '4.8 MB',
    uploadedAt: '2026-06-21 04:30 PM',
    status: 'Failed',
    pageCount: 1,
    confidenceScore: '0%',
    extractedInfo: {
      error: 'Low contrast scan or unsupported font encoding. Please re-upload with 300+ DPI.',
    },
    summary: 'Processing failed due to excessive blurriness and skewed alignment beyond OCR threshold.',
    rawText: `[ERROR: OCR ENGINE COULD NOT DETECT READABLE CHARACTERS]`,
  },
];

export const MOCK_STATISTICS = {
  totalDocuments: 12,
  processedDocuments: 9,
  questionsAsked: 48,
  avgProcessingTime: '1.4s',
  successRate: '92%',
  storageUsed: '42.8 MB',
};

// Preset questions and answers for Ask AI page
export const MOCK_CHAT_SESSIONS = {
  'doc-001': [
    {
      id: 'm-1',
      sender: 'user',
      text: 'What is the total invoice amount?',
      timestamp: '10:25 AM',
    },
    {
      id: 'm-2',
      sender: 'ai',
      text: 'The total invoice amount is ₹35,000.',
      source: 'Invoice.pdf — Page 1',
      confidence: '99%',
      timestamp: '10:25 AM',
      metadata: {
        highlight: 'Total Invoice Amount: ₹35,000 (INR)',
        field: 'totalAmount',
      },
    },
    {
      id: 'm-3',
      sender: 'user',
      text: 'Who is the customer and vendor listed on this document?',
      timestamp: '10:27 AM',
    },
    {
      id: 'm-4',
      sender: 'ai',
      text: 'The invoice is billed to customer Arun Kumar (Tech Innovators Lab) and issued by vendor Apex Cloud Solutions Pvt Ltd (GSTIN: 33AABCA1234F1Z8).',
      source: 'Invoice.pdf — Page 1',
      confidence: '98%',
      timestamp: '10:27 AM',
    },
  ],
  'doc-002': [
    {
      id: 'm-5',
      sender: 'user',
      text: 'What course is this certificate for and what was the grade?',
      timestamp: '03:45 PM',
    },
    {
      id: 'm-6',
      sender: 'ai',
      text: 'The certificate was awarded to Arun Kumar for completing "Advanced Deep Learning & Document Intelligence" with a grade of Distinction (A+).',
      source: 'Certificate.jpg — Page 1',
      confidence: '96%',
      timestamp: '03:45 PM',
    },
  ],
  'doc-003': [
    {
      id: 'm-7',
      sender: 'user',
      text: 'What was the average document processing time reported?',
      timestamp: '11:20 AM',
    },
    {
      id: 'm-8',
      sender: 'ai',
      text: 'According to Section 1 (Executive Summary), the average processing time achieved was 1.2 seconds per page across 1,450 evaluated documents.',
      source: 'Report.txt — Section 1',
      confidence: '99%',
      timestamp: '11:20 AM',
    },
  ],
};

// Fallback intelligent answers for arbitrary user queries in Ask AI
export const MOCK_GENERIC_ANSWERS = [
  {
    keywords: ['amount', 'total', 'cost', 'price', 'fee'],
    answer: (docName) => `Based on ${docName || 'the document'}, the identified financial total is ₹35,000, which includes applicable taxes.`,
    source: (docName) => `${docName || 'Selected Document'} — Page 1`,
  },
  {
    keywords: ['date', 'when', 'due', 'issue', 'expired'],
    answer: (docName) => `The document records an issue date of 15-06-2026 and payment/settlement due date of 30-06-2026.`,
    source: (docName) => `${docName || 'Selected Document'} — Header Section`,
  },
  {
    keywords: ['customer', 'who', 'client', 'buyer', 'arun'],
    answer: (docName) => `The verified party is Arun Kumar associated with Tech Innovators Lab.`,
    source: (docName) => `${docName || 'Selected Document'} — Entity Section`,
  },
  {
    keywords: ['vendor', 'seller', 'company', 'issued by'],
    answer: (docName) => `The document was issued by Apex Cloud Solutions Pvt Ltd, verified with valid tax registration.`,
    source: (docName) => `${docName || 'Selected Document'} — Vendor Header`,
  },
  {
    keywords: ['summary', 'summarize', 'overview', 'about'],
    answer: (docName) => `Summary of ${docName || 'document'}: A verified business record containing key structured metadata, party identification, line items, and audit timestamps. All entities have been extracted with high confidence.`,
    source: (docName) => `${docName || 'Selected Document'} — Full Ingestion Scope`,
  },
];

// Document comparison matrix for Compare page
export const MOCK_COMPARISON_FIELDS = [
  {
    key: 'documentType',
    label: 'Document Type',
    docA: 'Tax Invoice',
    docB: 'Purchase Order',
    isDifferent: true,
  },
  {
    key: 'customer',
    label: 'Customer / Buyer',
    docA: 'Arun Kumar',
    docB: 'Arun Kumar',
    isDifferent: false,
  },
  {
    key: 'vendor',
    label: 'Vendor / Supplier',
    docA: 'Apex Cloud Solutions Pvt Ltd',
    docB: 'Nexus Enterprise Hardware Ltd',
    isDifferent: true,
  },
  {
    key: 'date',
    label: 'Date',
    docA: '15-06-2026',
    docB: '20-06-2026',
    isDifferent: true,
  },
  {
    key: 'totalAmount',
    label: 'Total Amount',
    docA: '₹35,000',
    docB: '₹42,000',
    isDifferent: true,
  },
  {
    key: 'taxAmount',
    label: 'Tax Amount',
    docA: '₹5,339 (18%)',
    docB: '₹6,407 (18%)',
    isDifferent: true,
  },
  {
    key: 'paymentTerms',
    label: 'Payment Terms',
    docA: 'Net 15 Days',
    docB: 'Net 30 Days',
    isDifferent: true,
  },
  {
    key: 'status',
    label: 'Status',
    docA: 'Paid / Settled',
    docB: 'Pending Delivery',
    isDifferent: true,
  },
  {
    key: 'fileType',
    label: 'File Format',
    docA: 'PDF Document',
    docB: 'PDF Document',
    isDifferent: false,
  },
];

export const MOCK_USER = {
  name: 'Arun Kumar',
  email: 'arun.kumar@documind.ai',
  role: 'Project Lead & Researcher',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
};
