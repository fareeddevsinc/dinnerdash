import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../styles/product/productCard.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <>
      <div className="product-container">
        <Card>
          <NavLink to={`http://localhost:5173/product/${restaurant._id}`}>
            <Card.Img variant="top" src={restaurant.images[0].url} />
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>{`Rs. ${restaurant.branch}`}</Card.Text>
              <Card.Text>{`Rs. ${restaurant.location}`}</Card.Text>
            </Card.Body>
          </NavLink>
        </Card>
      </div>
    </>
  );
};

export default RestaurantCard;
