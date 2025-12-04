import { MdQuiz, MdAdd } from "react-icons/md";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
import CardFooter from "./cardFooter";
import { Link } from "react-router-dom";

export default function Card() {
  const cards = [
    { title: "Cat 1", text: "Veux-tu te libérer ?", link: "/quiz" },
    { title: "Cat 2", text: "Veux-tu te libérer ?", link: "/quiz" },
    { title: "Cat 3", text: "Veux-tu te libérer ?", link: "/quiz" },
    { title: "Cat 4", text: "Veux-tu te libérer ?", link: "/quiz" },
  ];

  const cardColors = [
    "bg-red-500/20",
    "bg-green-50",
    "bg-yellow-50",
    "bg-blue-50",
  ];

  return (
    <div className="h-auto bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex flex-col items-center">
      <span className="block text-3xl font-bold text-gray-900 text-center mb-2">
        Les géants tech dominent et fragilisent les petites entreprises.
      </span>
      <span className="block text-2xl font-bold text-gray-900 text-center mb-4">
        Voulez-vous découvrir notre monde ?
      </span>
      <p className="text-md text-gray-700 text-center max-w-3xl mb-6">
        Les grandes entreprises tech dominent le marché, collectent d’énormes
        données et influencent les utilisateurs tout en limitant la concurrence.
      </p>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const bg = cardColors[index % cardColors.length];
          return (
            <Link key={index} to={card.link} className="w-full">
              <div
                className={`${bg} rounded-lg shadow-sm hover:shadow-md
                           transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer`}
              >
                <CardHeader title={card.title} padding="p-2" />
                <CardBody padding="p-2">{card.text}</CardBody>
                <CardFooter padding="p-2">
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <MdQuiz className="w-4 h-4" /> + de 1000 quiz...
                  </span>
                </CardFooter>
              </div>
            </Link>
          );
        })}

        {/* Card spécial "plus de catégories" */}
        <Link to={"/categorie"}>
          <div className="bg-gray-200 rounded-lg shadow-sm flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-gray-300 transition-all duration-300">
            <span className="text-gray-700 font-semibold">+ Plus</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
