import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import CategoryIcons from '../../components/CategoryIcons';
import PromoBanner from '../../components/PromoBanner';
import FiltersSidebar from '../../components/FiltersSidebar';
import SortDropdown from '../../components/SortDropdown';
import RestaurantCard from '../../components/RestaurantCard';
import type { Restaurant } from '../../types/restaurant';
import { getRestaurants } from '../../services/restaurantService';
import './HomePage.css';

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurants() {
      const data = await getRestaurants();
      setRestaurants(data);
      setIsLoading(false);
    }
    loadRestaurants();
  }, []);

  return (
    <div className="home-page">
      <Navbar activeLink="home" />

      <SearchBar />
      <CategoryIcons />
      <PromoBanner />

      <div className="home-page__content">
        <FiltersSidebar />

        <div className="home-page__restaurants">
          <div className="home-page__restaurants-header">
            <h2 className="home-page__restaurants-title">Restaurants</h2>
            <SortDropdown />
          </div>

          {isLoading ? (
            <p className="home-page__loading">Loading restaurants...</p>
          ) : (
            <div className="home-page__restaurants-grid">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}