import { useEffect, useState } from 'react';
import Navbar from '../../components/shared/Navbar';
import { BASE_URL, INFORMATIONS_ENDPOINTS } from '../../api/endPoints';
import { apiGet } from '../../services/apiService';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CustomLearnCard from '../../components/learn/CustomLearnCard';

export default function LearnPage() {
  const [information, setInformation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchInformation = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const url = `${BASE_URL}${INFORMATIONS_ENDPOINTS.GET_ALL}?limit=${itemsPerPage}&offset=${offset}`;
        
        const response = await apiGet(url);
        const data = response.data;

        setInformation(data.results || []);
        setTotalCount(data.count || 0);
        setTotalPages(Math.ceil((data.count || 0) / itemsPerPage));
      } catch (error) {
        console.error('Error fetching information:', error);
        setInformation([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInformation();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Page d'apprentissage
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Total: <span className="font-semibold">{totalCount}</span> articles
          </p>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : information.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max mb-8">
              {information.map((item) => (
                <CustomLearnCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 flex-wrap">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition font-medium text-sm sm:text-base"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Précédent</span>
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-2 sm:px-3 py-2 rounded-lg transition font-medium text-sm sm:text-base ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition font-medium text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <div className="text-center text-gray-600 text-xs sm:text-sm mb-4">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center py-12">
            <p className="text-gray-500 text-sm sm:text-base">Aucune information disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}