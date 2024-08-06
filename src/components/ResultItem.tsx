import React from 'react';

interface ResultItemProps {
  label: string;
  value: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ label, value }) => (
  <div className="flex justify-between gap-3">
    <label className="text-md font-bold text-gray-700">{label}:</label>
    <span className="text-md font-semibold text-gray-500">{value}</span>
  </div>
);

export default ResultItem;
