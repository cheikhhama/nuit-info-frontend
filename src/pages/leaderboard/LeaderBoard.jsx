import { User, Trophy, Star } from "lucide-react";
import Navbar from "../../components/shared/Navbar";
import { useEffect, useState } from "react";
import { apiGet } from "../../services/apiService";
import { LEADERBOARD_ENDPOINTS, BASE_URL } from "../../api/endPoints";

export default function LeaderBoard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response = await apiGet(`${BASE_URL}${LEADERBOARD_ENDPOINTS.GET_ALL}`);
        
        // Handle different response formats
        let data = [];
        if (Array.isArray(response.data)) {
          data = response.data; // Direct array
        } else if (response.data.results) {
          data = response.data.results; // Paginated response
        } else if (Array.isArray(response)) {
          data = response; // Response is array directly
        }
        
        console.log("Players fetched:", data);
        setPlayers(data || []);
      } catch (error) {
        console.error("Error fetching players:", error);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // Sort players by score (highest first)
  const sortedPlayers = [...players]
    .filter(player => player && (player.name || player.username) && typeof player.score === 'number')
    .sort((a, b) => b.score - a.score);

  const medals = ["🥇", "🥈", "🥉"];

  const getStars = (rank) => {
    // 1st: 5 stars, 2nd: 4 stars, 3rd: 3 stars, etc.
    const fullStars = Math.max(1, Math.min(5, 6 - rank));
    return fullStars;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-orange-400 to-orange-600";
    return "from-blue-400 to-blue-600";
  };

  const getRankBgColor = (rank) => {
    if (rank === 1) return "bg-yellow-50";
    if (rank === 2) return "bg-gray-50";
    if (rank === 3) return "bg-orange-50";
    return "bg-white";
  };

  const getPlayerName = (player) => {
    return player.name || player.username || "Unknown";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-8">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-black mb-2">
            Leaderboard
          </h2>

        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : sortedPlayers.length > 0 ? (
          <>
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {sortedPlayers.slice(0, 3).map((player, index) => (
                <div
                  key={index}
                  className={`relative ${getRankBgColor(index + 1)} rounded-xl p-6 border-2 ${
                    index === 0
                      ? "border-yellow-400 sm:scale-105"
                      : index === 1
                      ? "border-gray-400"
                      : "border-orange-400"
                  } transition-transform duration-300 hover:shadow-lg`}
                >
                  {/* Rank Badge */}
                  <div
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(
                      index + 1
                    )} flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {index + 1}
                  </div>

                  {/* Medal */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-4xl">
                    {medals[index]}
                  </div>

                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRankColor(
                        index + 1
                      )} flex items-center justify-center`}
                    >
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                    {getPlayerName(player)}
                  </h3>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < getStars(index + 1)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Score */}
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-1">Score</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {player.score}
                    </p>
                  </div>

                  {/* Level */}
                  {player.level && (
                    <div className="text-center mt-2">
                      <p className="text-xs text-gray-500">Level {player.level}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Full Leaderboard Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 px-4 sm:px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-gray-700 font-semibold text-sm sm:text-base">
                  <div className="col-span-2">Rang</div>
                  <div className="col-span-1">Avatar</div>
                  <div className="col-span-3 sm:col-span-4">Nom</div>
                  <div className="col-span-2 sm:col-span-2">Niveau</div>
                  <div className="col-span-2 sm:col-span-2">Étoiles</div>
                  <div className="col-span-2 text-right">Score</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-200">
                {sortedPlayers.map((player, index) => (
                  <div
                    key={index}
                    className={`${
                      index < 3 ? getRankBgColor(index + 1) : "bg-white"
                    } px-4 sm:px-6 py-4 hover:bg-gray-100 transition-colors`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Rank */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          {index < 3 ? (
                            <>
                              <span className="text-2xl">{medals[index]}</span>
                              <span className="font-bold text-lg text-gray-900">
                                {index + 1}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold text-gray-700 text-lg">
                              #{index + 1}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Avatar */}
                      <div className="col-span-1">
                        <div
                          className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRankColor(
                            index + 1
                          )} flex items-center justify-center`}
                        >
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Name */}
                      <div className="col-span-3 sm:col-span-4">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {getPlayerName(player)}
                        </p>
                      </div>

                      {/* Level */}
                      <div className="col-span-2 sm:col-span-2">
                        <p className="text-sm text-gray-700 font-medium">
                          {player.level || "-"}
                        </p>
                      </div>

                      {/* Stars */}
                      <div className="col-span-2 sm:col-span-2 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < getStars(index + 1)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      {/* Score */}
                      <div className="col-span-2 text-right">
                        <p className="font-bold text-gray-900 text-sm sm:text-base">
                          {player.score}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-gray-600">
              <p className="text-sm">
                Total participants:{" "}
                <span className="font-semibold text-gray-900">
                  {sortedPlayers.length}
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="flex justify-center py-12">
            <p className="text-gray-500 text-sm sm:text-base">
              No players found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}