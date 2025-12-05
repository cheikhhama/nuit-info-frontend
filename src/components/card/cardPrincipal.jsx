import { MdQuiz, MdAdd } from "react-icons/md";
import CardHeader from "./cardheader";
import CardBody from "./cardBody";
import CardFooter from "./cardFooter";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useEffect, useState } from "react";
import { apiGet } from "../../services/apiService";
import { BASE_URL, Category_ENDPOINTS } from "../../api/endPoints";

export default function Card() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGet(`${BASE_URL}${Category_ENDPOINTS.GET_ALL}`);
        const data = response.data;
        console.log(data.results);
        setCategories(data.results);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  
  const cardColors = [
    "bg-red-500/20 text-red-500",
    "bg-green-500/20 text-green-500",
    "bg-yellow-500/20 text-yellow-500",
    "bg-blue-500/20 text-blue-500",
    "bg-purple-500/20 text-purple-500",
    "bg-cyan-500/20 text-cyan-500",
    "bg-orange-500/20 text-orange-500",
    "bg-pink-500/20 text-pink-500"
  ];

  const featuredContent = {
    title: "Comment les géants de la technologie remodèlent l'écosystème numérique",
    subtitle: "Explorez l'impact de la domination technologique sur les entreprises et l'innovation",
    description: "Les géants de la technologie sont transformant les industries à travers la collecte des données, l'innovation de l'IA et la domination des plateformes. Cette évolution présente à la fois des opportunités de croissance et des défis pour la compétition sur le marché numérique."
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Featured Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            {featuredContent.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            {featuredContent.subtitle}
          </p>
         
        </div>

       

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {categories?.map((card, index) => {
            const bg = cardColors[index % cardColors.length];
            return (
              <Link key={index} to={card.link} className="w-full">
                <div
                  className={`${bg} relative rounded-lg shadow-sm h-30 cursor-pointer`}
                >
                  <p className="px-4 py-2 text-2xl font-semibold">{card.nom.toLowerCase()}</p>
                  <CardFooter padding="p-2 absolute bottom-0 right-2">
                    <span className="text-md flex items-center gap-1">
                      <MdQuiz className="w-4 h-4" /> {card.quiz_count > 10 ? "+10 quiz" : card.quiz_count}
                    </span>
                  </CardFooter>
                </div>
              </Link>
            );
          })}

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="col-span-full">
              <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <MdQuiz className="text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Categories Available
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Categories will appear here once they are created. Start by adding your first quiz category.
                </p>
                <Link
                  to="/create-category"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <MdAdd className="text-xl" />
                  <span>Create First Category</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {categories.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600">Total Categories</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {categories.reduce((acc, cat) => acc + (cat.quiz_count || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Quizzes</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.max(...categories.map(cat => cat.quiz_count || 0))}
                </div>
                <div className="text-sm text-gray-600">Most Popular</div>
              </div>
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
}