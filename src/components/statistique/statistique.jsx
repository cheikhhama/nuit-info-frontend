import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Statistique() {
  // Catégories et leurs statistiques
  const stats = {
    Maths: [
      { level: 1, users: 8 },
      { level: 2, users: 14 },
      { level: 3, users: 20 },
      { level: 4, users: 9 },
    ],
    Physique: [
      { level: 1, users: 5 },
      { level: 2, users: 9 },
      { level: 3, users: 13 },
      { level: 4, users: 7 },
    ],
    Informatique: [
      { level: 1, users: 12 },
      { level: 2, users: 18 },
      { level: 3, users: 25 },
      { level: 4, users: 15 },
    ],
  };

  const categories = Object.keys(stats); // ["Maths", "Physique", "Informatique"]

  const [selectedCat, setSelectedCat] = useState(categories[0]);

  return (
    <div className="w-full max-w-3xl mx-auto p-10 m-10 bg-white shadow rounded-lg">
      {" "}
      <h2 className="text-xl font-bold mb-4 text-center">
        Statistiques des catégories et niveaux{" "}
      </h2>
      {/* Sélecteur de catégorie */}
      <div className="flex justify-center mb-4">
        <select
          className="border px-3 py-2 rounded-md"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Graphique */}
      <LineChart
        width={500}
        height={300}
        data={stats[selectedCat]}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="level" label={{ value: "Level", dy: 10 }} />
        <YAxis label={{ value: "Utilisateurs", angle: -90, dx: -10 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#4f46e5"
          strokeWidth={2}
        />
      </LineChart>
    </div>
  );
}
