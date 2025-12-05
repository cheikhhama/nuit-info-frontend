import { useEffect, useState } from "react";
import CustomQuizCard from "../../components/quiz/CustomQuizCard";
import goldCoin from "../../assets/quiz/coin.png";
import { apiGet } from "../../services/apiService";
import { BASE_URL, Category_ENDPOINTS, QUIZ_ENDPOINTS } from "../../api/endPoints";
import { CustomCategory } from "../../components/quiz/CustomCategory";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../components/shared/Navbar";
import { Link } from "react-router-dom";

export default function QuizPage() {
  const [totalScore, setTotalScore] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quizzesPerPage] = useState(10);

  // Fetch quizzes with pagination
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        let url = `${BASE_URL}${QUIZ_ENDPOINTS.GET_ALL}?page=${currentPage}`;
        if (selectedCategory) {
          url += `&categorie=${selectedCategory}`;
        }

        const response = await apiGet(url);
        const data = response.data;

        if (data.results) {
          setQuizzes(data.results);
          setTotalPages(Math.ceil(data.count / quizzesPerPage));
        } else {
          setQuizzes(data);
          setTotalPages(1);
        }

      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [selectedCategory, currentPage, quizzesPerPage]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGet(
          `${BASE_URL}${Category_ENDPOINTS.GET_ALL}`
        );
        setCategories(response.data.results || response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleScoreUpdate = (quizScore) => {
    setTotalScore((prev) => prev + quizScore);
    setAnsweredCount((prev) => prev + 1);
  };

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
    setCurrentPage(1);
    setAnsweredCount(0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setAnsweredCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="bg-gray-50 pt-16 min-h-screen py-4 px-4 sm:px-6 lg:px-8">
        <Navbar/>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Page de quiz
          </h1>
          <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
           
              {totalScore == null ?  <Link to="/auth/login." className="text-xl sm:text-sm text-gray-900">Inscrivez-vous pour enregistrer vos réussites</Link> : totalScore}
            
            {totalScore >= 5 && (
              <img className="w-8 h-8 sm:w-10 sm:h-10" src={goldCoin} alt="coin" />
            )}
          </div>
        </div>

       

        {/* Quizzes Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : quizzes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 auto-rows-max mb-8">
              {quizzes.map((quiz) => (
                <CustomQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onScoreUpdate={handleScoreUpdate}
                />
              ))}
            </div>

            {/* Pagination - Show after 2 answers or if multiple pages */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 flex-wrap">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-200 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition font-medium text-sm sm:text-base"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-2 sm:px-3 py-2 rounded-lg transition font-medium text-sm sm:text-base ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
                  <span className="hidden sm:inline">Next</span>
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
            <p className="text-gray-500 text-sm sm:text-base">
              {selectedCategory ? "No quizzes found in this category" : "No quizzes found"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}