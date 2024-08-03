import React from 'react';
import ResultCard from './ResultCard';

interface AnalyzedResult {
  id: string;
  userId: string;
  invoiceId: string;
  invoiceWasApproved: boolean;
  createdAt: Date;
}

interface ResultListProps {
  results: AnalyzedResult[];
  onItemClick: (result: AnalyzedResult) => void;
}


const ResultList: React.FC<ResultListProps> = ({ results, onItemClick }) => (
  <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
    <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
      {results.map(result => (
        <ResultCard key={result.id} result={result} onClick={() => onItemClick(result)} />
      ))}
    </nav>
  </div>
);

export default ResultList;
