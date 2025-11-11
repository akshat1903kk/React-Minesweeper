import { useNavigate } from "react-router-dom";

const difficulties = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[var(--charcoal)] to-[var(--stone)] text-[var(--beige)]">
      <h1 className="text-5xl font-bold mb-6 tracking-wide text-center">
        Minesweeper
      </h1>
      <p className="text-lg opacity-80 mb-12 text-center">
        Choose your difficulty and begin your challenge!
      </p>

      <div className="flex gap-6 flex-wrap justify-center">
        {difficulties.map((diff) => (
          <button
            key={diff.value}
            onClick={() => navigate(`/play?difficulty=${diff.value}`)}
            aria-label={`Start ${diff.label} game`}
            className="px-8 py-3 bg-[var(--slate)] hover:bg-[var(--stone)] text-[var(--beige)] rounded-md shadow-md hover:shadow-lg transition-all text-lg font-semibold"
          >
            {diff.label}
          </button>
        ))}
      </div>
    </div>
  );
}
