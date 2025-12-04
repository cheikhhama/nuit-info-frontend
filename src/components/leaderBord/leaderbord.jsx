import { User } from "lucide-react";

export default function LeaderBoard({ players }) {
  const defaultPlayers = [
    { name: "Ahmed", score: 20 },
    { name: "Med", score: 15 },
    { name: "Sara", score: 25 },
    { name: "Youssef", score: 18 },
    { name: "Lina", score: 12 },
  ];

  const list = players || defaultPlayers;

  // Trier par score décroissant
  const sortedPlayers = [...list].sort((a, b) => b.score - a.score);

  // Médailles pour top 3
  const medals = ["🥇", "🥈", "🥉"];

  // Fonction pour générer étoiles selon rang (max 5)
  const getStars = (rank) => {
    const fullStars = 5 - rank + 1;
    let stars = "";
    for (let i = 0; i < fullStars; i++) stars += "⭐";
    for (let i = fullStars; i < 5; i++) stars += "☆";
    return stars;
  };

  return (
    <div className="w-full bg-state-400 rounded-lg shadow p-10">
      <h2 className="text-4xl font-bold mb-7 text-center">Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-3">Rang</th>
            <th className="py-2 px-3">Profil</th>
            <th className="py-2 px-3">Nom</th>
            <th className="py-2 px-3">Étoiles</th>
            <th className="py-2 px-3">Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="py-2 px-3">{index + 1}</td>
              <td className="py-2 px-3">
                <User className="w-5 h-5 text-green-600" />
              </td>
              <td className="py-2 px-3">{player.name}</td>
              <td className="py-2 px-3">{getStars(index + 1)}</td>
              <td className="py-2 px-3 font-semibold flex items-center gap-1">
                {player.score} {medals[index] && <span>{medals[index]}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
