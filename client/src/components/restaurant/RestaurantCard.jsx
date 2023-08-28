import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../styles/product/productCard.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <>
      <div className="product-container">
        <Card>
          <NavLink to={`http://localhost:5173/restaurant/${restaurant._id}`}>
            <Card.Img variant="top" src={restaurant?.images?.url} />
            <Card.Body>
              <Card.Title>{`Name: ${restaurant?.name}`}</Card.Title>
              <Card.Text>{`Branch: ${restaurant?.branch}`}</Card.Text>
              <Card.Text>{`Location: ${restaurant?.location}`}</Card.Text>
            </Card.Body>
          </NavLink>
        </Card>
      </div>
    </>
  );
};

export default RestaurantCard;
