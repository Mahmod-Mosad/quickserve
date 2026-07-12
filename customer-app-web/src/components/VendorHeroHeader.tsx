import { Star, Clock } from 'lucide-react';
import type { VendorDetails } from '../types/vendor';
import './VendorHeroHeader.css';

interface VendorHeroHeaderProps {
  vendor: VendorDetails;
}

export default function VendorHeroHeader({ vendor }: VendorHeroHeaderProps) {
  return (
    <div className="vendor-hero">
      <img src={vendor.coverImageUrl} alt="" className="vendor-hero__image" />
      <div className="vendor-hero__overlay">
        <h1 className="vendor-hero__name">{vendor.name}</h1>

        <div className="vendor-hero__badges">
          <span className="vendor-hero__badge">
            <Star size={13} fill="currentColor" />
            {vendor.rating} ({vendor.reviewCount}+ ratings)
          </span>
          <span className="vendor-hero__badge">
            <Clock size={13} />
            {vendor.deliveryTimeMinutes} min
          </span>
        </div>

        <p className="vendor-hero__description">{vendor.description}</p>
      </div>
    </div>
  );
}