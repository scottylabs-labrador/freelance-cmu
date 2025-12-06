// Star rating component for displaying freelancer ratings

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span
        key={i}
        className={i <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}
      >
        ★
      </span>
    );
  }

  return <div className="flex items-center text-sm">{stars}</div>;
}
