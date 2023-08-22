import ReactStars from "react-rating-stars-component";
import defaultUser from "../../images/defaultUser.jpg";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };
  return (
    <>
      <div>
        <img src={defaultUser} alt="Default User" />
        <h4>{review.name}</h4>
        <ReactStars {...options} />
        <h2>{review.comment}</h2>
      </div>
    </>
  );
};

export default ReviewCard;
