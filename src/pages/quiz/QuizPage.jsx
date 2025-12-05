import { useEffect, useState } from "react";
import CustomQuizCard from "../../components/quiz/CustomQuizCard";
import Navbar from "../../components/shared/Navbar";
import { apiGet, apiPost } from "../../services/apiService";
import { BASE_URL, QUIZ_ENDPOINTS } from "../../api/endPoints";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

export default function QuizPage() {
  const { isAuthenticated, user } = useAuth();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Backend pagination URLs
  const [pageUrl, setPageUrl] = useState(`${BASE_URL}${QUIZ_ENDPOINTS.GET_ALL}`);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const [score, setScore] = useState(user?.score || 0);

  // Fetch quizzes from backend using pageUrl
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await apiGet(pageUrl);
        const data = response.data;

        setQuizzes(data.results || []);
        setNextUrl(data.next);
        setPrevUrl(data.previous);

      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [pageUrl]);


  // Handle score update + answer submit
  const handleScoreUpdate = async (quizScore, quizData) => {
    try {
      if (!quizData?.id) {
        toast.error("Impossible d'envoyer la réponse (ID question manquant)");
        return;
      }

      if (!isAuthenticated) {
        toast.error("Vous devez vous connecter pour enregistrer vos réponses");
        return;
      }

      const response = await apiPost(
        `${BASE_URL}${QUIZ_ENDPOINTS.VERIFY_RESPONSE}`,
        { reponse_id: quizData.id }
      );

      if (!response) {
        toast.error("Aucune réponse reçue du serveur");
        return;
      }

      if (response.status === 200 || response.status === 201) {
        toast.success("Réponse enregistrée avec succès");
        setScore(response.data.score);
        return;
      }

      if (response.data?.error) {
        toast.error(response.data.error);
        return;
      }

      toast.error("Réponse non reconnue du serveur");

    } catch (error) {
      console.error("Error saving answer:", error);

      if (error.details?.error) {
        toast.error(error.details.error);
        return;
      }

      if (error.code === "NETWORK_ERROR" || error.message === "Network Error") {
        toast.error("Erreur réseau. Vérifiez votre connexion.");
        return;
      }

      const response = error.originalError?.response || error.response;

      if (response) {
        const status = response.status;
        const msg = response.data?.error;

        if (status === 400) toast.error(msg || "Erreur de validation");
        else if (status === 401) toast.error("Session expirée. Veuillez vous reconnecter.");
        else if (status === 403) toast.error("Accès refusé.");
        else if (status === 404) toast.error("Ressource introuvable.");
        else if (status === 409) toast.error("Vous avez déjà répondu à cette question.");
        else toast.error("Erreur du serveur. Réessayez plus tard.");

        return;
      }

      toast.error("Une erreur inattendue s'est produite.");
    }
  };


  // Navigate using backend URLs
  const goToNextPage = () => {
    if (nextUrl) {
      setPageUrl(nextUrl);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousPage = () => {
    if (prevUrl) {
      setPageUrl(prevUrl);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  return (
    <div className="bg-gray-50 pt-16 min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />

      <Navbar />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Page de quiz</h1>

          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
            {isAuthenticated ? (
              <p className="text-xl font-bold">{score}</p>
            ) : (
              <Link to="/auth/login" className="text-blue-600 font-semibold">
                Connectez-vous
              </Link>
            )}
          </div>
        </div>

        {/* Auth status */}
        <div
          className={`mb-6 p-4 rounded-lg ${
            isAuthenticated
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-yellow-50 border border-yellow-200 text-yellow-800"
          }`}
        >
          {isAuthenticated
            ? "Vous êtes connecté - Vos réponses sont enregistrées"
            : "Vous n'êtes pas connecté - Les réponses ne seront pas enregistrées"}
        </div>

        {/* Quizzes */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
          </div>
        ) : quizzes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quizzes.map((quiz) => (
                <CustomQuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onScoreUpdate={(score) => handleScoreUpdate(score, quiz)}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={goToPreviousPage}
                disabled={!prevUrl}
                className="flex items-center px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                <ChevronLeft size={18} /> Précédent
              </button>

              <button
                onClick={goToNextPage}
                disabled={!nextUrl}
                className="flex items-center px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
              >
                Suivant <ChevronRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-12">Aucun quiz disponible</p>
        )}
      </div>
    </div>
  );
}
