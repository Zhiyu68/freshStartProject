import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

export default function Stars({ rating }) {
  //5
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-danger" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaRegStarHalfStroke key={i} className="text-danger" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-secondary" />);
    }
  }
  return <>{stars}</>;
}
