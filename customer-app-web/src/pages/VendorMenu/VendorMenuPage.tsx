import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import VendorHeroHeader from '../../components/VendorHeroHeader';
import CategorySidebar from '../../components/CategorySidebar';
import MenuItemCard from '../../components/MenuItemCard';
import ItemOptionsModal from '../../components/ItemOptionsModal';
import CartSummaryBar from '../../components/CartSummaryBar';
import { useCart } from '../../context/CartContext';
import type { VendorDetails } from '../../types/vendor';
import type { MenuItem } from '../../types/menuItem';
import type { CartItem } from '../../types/cart';
import { getVendorDetails, getMenuItems } from '../../services/vendorService';
import './VendorMenuPage.css';

function toSectionId(category: string) {
  return `category-${category.replace(/\s+/g, '-')}`;
}

export default function VendorMenuPage() {
  const { vendorId } = useParams<{ vendorId: string }>();

  const [vendor, setVendor] = useState<VendorDetails | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const { addItem } = useCart();

  useEffect(() => {
    if (!vendorId) return;

    async function loadData() {
      setIsLoading(true);
      const [vendorData, itemsData] = await Promise.all([
        getVendorDetails(vendorId!),
        getMenuItems(vendorId!),
      ]);
      setVendor(vendorData);
      setMenuItems(itemsData);
      setIsLoading(false);
    }
    loadData();
  }, [vendorId]);

  function handleModalConfirm(cartItem: CartItem) {
    if (vendorId) addItem(cartItem, vendorId);
  }

  function handleCategorySelect(category: string) {
    const section = document.getElementById(toSectionId(category));
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (isLoading || !vendor) {
    return <p className="vendor-menu-page__loading">Loading...</p>;
  }

  const itemsByCategory = menuItems.reduce<Record<string, MenuItem[]>>((groups, item) => {
    if (!groups[item.category]) groups[item.category] = [];
    groups[item.category].push(item);
    return groups;
  }, {});

  return (
    <div className="vendor-menu-page">
      <Navbar />
      <VendorHeroHeader vendor={vendor} />

      <div className="vendor-menu-page__content">
        <CategorySidebar onSelect={handleCategorySelect} />

        <div className="vendor-menu-page__items">
          {Object.entries(itemsByCategory).map(([category, items]) => (
            <section key={category} id={toSectionId(category)} className="vendor-menu-page__category-section">
              <h2 className="vendor-menu-page__section-title">{category}</h2>
              <div className="vendor-menu-page__grid">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAddClick={setSelectedItem} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {selectedItem && (
        <ItemOptionsModal
          item={selectedItem}
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleModalConfirm}
        />
      )}

      <CartSummaryBar />
    </div>
  );
}