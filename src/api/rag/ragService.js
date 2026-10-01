import axiosClient from '../axiosClient';

const ragService = {
  askQuestion: async (question, documentId = null) => {
    const response = await axiosClient.post('/rag/query', {
      question,
      document_id: documentId,
    });

    return response.data;
  },
};

export default ragService;