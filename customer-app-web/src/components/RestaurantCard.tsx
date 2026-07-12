import { Star, Clock, Bike } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Restaurant } from '../types/restaurant';
import './RestaurantCard.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/vendor/${restaurant.id}`);
  }

  return (
    <button onClick={handleClick} className="restaurant-card">
      <div className="restaurant-card__image-wrapper">
        <img src={restaurant.imageUrl} alt="" className="restaurant-card__image" />

        {!restaurant.isOpen && (
          <span className="restaurant-card__badge restaurant-card__badge--closed">Closed</span>
        )}
        {restaurant.isOpen && restaurant.discountPercent && (
          <span className="restaurant-card__badge restaurant-card__badge--discount">
            {restaurant.discountPercent}% Off
          </span>
        )}

        <span className="restaurant-card__rating">
          <Star size={12} fill="currentColor" />
          {restaurant.rating} ({restaurant.reviewCount}+)
        </span>

        <img src={restaurant.logoUrl} alt="" className="restaurant-card__logo" />
      </div>

      <div className="restaurant-card__info">
        <h3 className="restaurant-card__name">{restaurant.name}</h3>
        <p className="restaurant-card__tags">{restaurant.cuisineTags.join(', ')}</p>

        <div className="restaurant-card__meta">
          <span className="restaurant-card__meta-item">
            <Clock size={13} />
            {restaurant.deliveryTimeMinutes} min
          </span>
          <span className="restaurant-card__meta-item">
            <Bike size={13} />
            {restaurant.deliveryFee === 'free' ? 'Free' : `$${restaurant.deliveryFee.toFixed(2)}`}
          </span>
        </div>
      </div>
    </button>
  );
}