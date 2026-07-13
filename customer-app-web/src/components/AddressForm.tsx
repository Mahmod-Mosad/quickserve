import { useState } from 'react';
import type { Address } from '../types/address';
import { useLanguage } from '../context/LanguageContext';
import './AddressForm.css';

interface AddressFormProps {
  onChange: (address: Address) => void;
}

const labelOptions: { id: Address['label']; labelKey: string }[] = [
  { id: 'Home', labelKey: 'addressLabelHome' },
  { id: 'Work', labelKey: 'addressLabelWork' },
  { id: 'Other', labelKey: 'addressLabelOther' },
];

export default function AddressForm({ onChange }: AddressFormProps) {
  const { t } = useLanguage();
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
        {labelOptions.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => updateField('label', id)}
            className={`address-form__label-btn ${address.label === id ? 'address-form__label-btn--active' : ''}`}
          >
            {t(`checkout.${labelKey}`)}
          </button>
        ))}
      </div>

      <div className="address-form__grid">
        <label className="address-form__field">
          <span>{t('checkout.areaLabel')}</span>
          <input
            type="text"
            value={address.area}
            onChange={(e) => updateField('area', e.target.value)}
            placeholder={t('checkout.areaPlaceholder')}
          />
        </label>

        <label className="address-form__field">
          <span>{t('checkout.streetLabel')}</span>
          <input
            type="text"
            value={address.street}
            onChange={(e) => updateField('street', e.target.value)}
            placeholder={t('checkout.streetPlaceholder')}
          />
        </label>

        <label className="address-form__field">
          <span>{t('checkout.apartmentLabel')}</span>
          <input
            type="text"
            value={address.apartment}
            onChange={(e) => updateField('apartment', e.target.value)}
            placeholder={t('checkout.apartmentPlaceholder')}
          />
        </label>

        <label className="address-form__field">
          <span>{t('checkout.instructionsLabel')}</span>
          <input
            type="text"
            value={address.instructions}
            onChange={(e) => updateField('instructions', e.target.value)}
            placeholder={t('checkout.instructionsPlaceholder')}
          />
        </label>
      </div>
    </div>
  );
}