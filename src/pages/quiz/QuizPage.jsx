import { useEffect, useState } from "react";
import CustomQuizCard from "../../components/quiz/CustomQuizCard";
import goldCoin from "../../assets/quiz/coin.png";
import { apiGet, apiPost } from "../../services/apiService";
import { BASE_URL, Category_ENDPOINTS, QUIZ_ENDPOINTS } from "../../api/endPoints";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../components/shared/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Import your auth hook

export default function QuizPage() {
  const { isAuthenticated } = useAuth(); // Get auth status
  const [totalScore, setTotalScore] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
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
  }, [currentPage, quizzesPerPage]);

  const handleScoreUpdate = async (quizScore, quizData) => {
    
    // Si l'utilisateur est authentifié, enregistrez la réponse
    if (isAuthenticated) {
      try {
        const response = await apiPost(`${BASE_URL}${QUIZ_ENDPOINTS.VERIFY_RESPONSE}`, {
          reponse_id: 40,
          // reponse_id: quizData.id,
        });
        console.log("Réponse enregistrée:", response);
      } catch (error) {
        console.error("Error saving answer:", error);
      }
    } else {
      console.log("⚠️ Utilisateur invité - Non connecté (réponses non enregistrées)");
    }

    // Mettre à jour le score uniquement si l'utilisateur est authentifié
    if (isAuthenticated && quizScore) {
      setTotalScore((prev) => prev + quizScore);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Page de quiz
          </h1>

          {/* Score Display */}
          <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            {isAuthenticated ? (
              <>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {totalScore}
                </p>
                {totalScore >= 5 && (
                  <img
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    src={goldCoin}
                    alt="pièce"
                  />
                )}
              </>
            ) : (
              <Link
                to="/auth/login"
                className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-semibold"
              >
                Connectez-vous pour enregistrer la progression
              </Link>
            )}
          </div>
        </div>

        {/* Authentication Status Message */}
        {isAuthenticated !== undefined && (
          <div className={`mb-6 p-4 rounded-lg ${
            isAuthenticated
              ? "bg-green-50 border border-green-200"
              : "bg-yellow-50 border border-yellow-200"
          }`}>
            <p className={`text-sm font-medium ${
              isAuthenticated
                ? "text-green-800"
                : "text-yellow-800"
            }`}>
              {isAuthenticated
                ? " Vous êtes connecté - Vos réponses sont enregistrées"
                : " Vous n'êtes pas connecté - Les réponses ne seront pas enregistrées"}
            </p>
          </div>
        )}

        {/* Quizzes Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : quizzes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 auto-rows-max mb-8">
              {quizzes.map((quiz) => (
                <CustomQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onScoreUpdate={(score) =>
                    handleScoreUpdate(score, quiz)
                  }
                  isAuthenticated={isAuthenticated}
                />
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
                  <span className="hidden sm:inline">Suivant</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
              <div className="text-center text-gray-600 text-xs sm:text-sm mb-4">
                Page {currentPage} sur {totalPages}
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center py-12">
            <p className="text-gray-500">Aucun quiz disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}