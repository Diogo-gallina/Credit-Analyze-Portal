import React from 'react';
import ResultItem from './ResultItem';

interface AnalyzedResult {
  id: string;
  userId: string;
  invoiceId: string;
  invoiceWasApproved: boolean;
  createdAt: Date;
}

interface ResultCardProps {
  result: AnalyzedResult;
  onClick: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onClick }) => {
  const bgColor = result.invoiceWasApproved ? 'bg-green-300' : 'bg-red-300';

  return (
    <div
      role="button"
      onClick={onClick}
      className={`flex flex-col gap-3 w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 shadow-md ${bgColor}`}
    >
      <ResultItem label="Date" value={new Date(result.createdAt).toLocaleString()} />
      <ResultItem label="Invoice ID" value={result.invoiceId} />
      <ResultItem label="Approved" value={result.invoiceWasApproved ? 'Yes' : 'No'} />
    </div>
  );
};

export default ResultCard;
