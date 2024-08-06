import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AccountContext from '../context/AccountContext';
import ResultList from './ResultList';
import ModalDetails from './ModalDetails';
import { toast } from 'react-toastify';

interface AnalyzedResult {
  id: string;
  userId: string;
  invoiceId: string;
  invoiceWasApproved: boolean;
  createdAt: Date;
}

export const InvoiceHistory: React.FC = () => {
  const [results, setResults] = useState<AnalyzedResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResult, setSelectedResult] = useState<AnalyzedResult | null>(null);
  const accountContext = useContext(AccountContext);
  const RESULTS_PER_PAGE = 5;
  const BACKEND_URL = 'http://localhost:8080/credit-analyze/analyze-history';

  useEffect(() => {
    if (accountContext?.token) {
      axios.get(BACKEND_URL, {
        headers: {
          Authorization: `Bearer ${accountContext?.token}`,
        },
      })
      .then(response => {
        const formattedResults = response.data.map((result: any) => ({
          ...result,
          invoiceWasApproved: result.invoiveWasApproved,
        }));
        setResults(formattedResults);
      })
      .catch(error => {
        console.error('Error fetching analyze history:', error);
      });
    }
  }, [accountContext?.token]);

  const resendCode = async () => {
    const toastId = toast.loading('Updating results...', {
      position: 'bottom-right',
      autoClose: false,
    })

    try {
      if (accountContext?.token) {
        axios.get(BACKEND_URL, {
          headers: {
            Authorization: `Bearer ${accountContext?.token}`,
          },
        })
        .then(response => {
          const formattedResults = response.data.map((result: any) => ({
            ...result,
            invoiceWasApproved: result.invoiveWasApproved,
          }));
          setResults(formattedResults);
          toast.update(toastId, {
            render: 'Results updated successfully!',
            type:'success',
            position: 'bottom-right',
            autoClose: 5000,
            isLoading: false,
          });
        })
        .catch(error => {
          console.error('Error fetching analyze history:', error);
          toast.update(toastId, {
            render: 'Failed to update results',
            type:'error',
            position: 'bottom-right',
            autoClose: 5000,
            isLoading: false,
          });
        });
      }
    } catch (err) {
      toast.error('Failed to update results', {
        position: 'bottom-right',
        autoClose: 5000,
      });
    }
  };

  const handleItemClick = (result: AnalyzedResult) => {
    setSelectedResult(result);
  };

  const closeModal = () => {
    setSelectedResult(null);
  };

  const totalPages = Math.ceil(results.length / RESULTS_PER_PAGE);
  const currentResults = results.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex flex-col items-center gap-2">
        <label className="text-lg font-semibold text-gray-700">
          Analyze History
        </label>
      </div>

      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={resendCode}
          className="bg-sky-500 rounded font-semibold text-white h-10 hover:bg-sky-700 w-full"
        >
          Update Results
        </button>
      </div>

      <ResultList results={currentResults} onItemClick={handleItemClick} />

      <div className="flex justify-between gap-4 mt-4">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-300 rounded font-semibold text-gray-700 h-10 hover:bg-gray-400 w-full"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 rounded font-semibold text-gray-700 h-10 hover:bg-gray-400 w-full"
        >
          Next
        </button>
      </div>

      <ModalDetails result={selectedResult} onClose={closeModal} />
    </div>
  );
};
