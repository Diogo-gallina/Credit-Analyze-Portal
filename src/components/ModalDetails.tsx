import React from 'react';
import Modal from 'react-modal';
import ResultItem from './ResultItem';

interface AnalyzedResult {
  id: string;
  userId: string;
  invoiceId: string;
  invoiceWasApproved: boolean;
  createdAt: Date;
}

interface ModalDetailsProps {
  result: AnalyzedResult | null;
  onClose: () => void;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ result, onClose }) => {
  if (!result) return null;

  return (
    <Modal
      isOpen={!!result}
      onRequestClose={onClose}
      contentLabel="Result Details"
      className="flex flex-col bg-white rounded-lg p-7 max-w-md mx-auto my-4"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
    >
      <h2 className="text-2xl font-bold mb-4">Result Details</h2>
      <ResultItem label="Date" value={new Date(result.createdAt).toLocaleString()} />
      <ResultItem label="Invoice ID" value={result.invoiceId} />
      <ResultItem label="Approved" value={result.invoiceWasApproved ? 'Yes' : 'No'} />
      <button
        onClick={onClose}
        className="bg-red-400
         text-white rounded p-2 mt-4 hover:bg-red-700 transition-all"
      >
        Close
      </button>
    </Modal>
  );
};

export default ModalDetails;
