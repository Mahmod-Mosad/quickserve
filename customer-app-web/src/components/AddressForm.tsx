import { useState } from 'react';
import type { Address } from '../types/address';
import './AddressForm.css';

interface AddressFormProps {
  onChange: (address: Address) => void;
}

const labels: Address['label'][] = ['Home', 'Work', 'Other'];

export default function AddressForm({ onChange }: AddressFormProps) {
  const [address, setAddress] = useState<Address>({
    label: 'Home',
    area: '',
    street: '',
    apartment: '',
    instructions: '',
  });

  function updateField<K extends keyof Address>(field: K, value: Address[K]) {
    const updated = { ...address, [field]: value };
    setAddress(updated);
    onChange(updated);
  }

  return (
    <div className="address-form">
      <div className="address-form__labels">
        {labels.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => updateField('label', label)}
            className={`address-form__label-btn ${address.label === label ? 'address-form__label-btn--active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="address-form__grid">
        <label className="address-form__field">
          <span>Area / District</span>
          <input
            type="text"
            value={address.area}
            onChange={(e) => updateField('area', e.target.value)}
            placeholder="e.g. Maadi, Nasr City"
          />
        </label>

        <label className="address-form__field">
          <span>Street Address</span>
          <input
            type="text"
            value={address.street}
            onChange={(e) => updateField('street', e.target.value)}
            placeholder="Street name, building number"
          />
        </label>

        <label className="address-form__field">
          <span>Apartment / Floor (optional)</span>
          <input
            type="text"
            value={address.apartment}
            onChange={(e) => updateField('apartment', e.target.value)}
            placeholder="Apt 4B, 3rd floor"
          />
        </label>

        <label className="address-form__field">
          <span>Delivery Instructions (optional)</span>
          <input
            type="text"
            value={address.instructions}
            onChange={(e) => updateField('instructions', e.target.value)}
            placeholder="e.g. Leave at door"
          />
        </label>
      </div>
    </div>
  );
}