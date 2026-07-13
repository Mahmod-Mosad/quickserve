import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './WalletDetailsForm.css';

export interface WalletDetails {
  walletPhoneNumber: string;
}

interface WalletDetailsFormProps {
  onChange: (details: WalletDetails) => void;
}

export default function WalletDetailsForm({ onChange }: WalletDetailsFormProps) {
  const { t } = useLanguage();
  const [details, setDetails] = useState<WalletDetails>({ walletPhoneNumber: '' });

  function updateField(value: string) {
    const updated = { walletPhoneNumber: value };
    setDetails(updated);
    onChange(updated);
  }

  return (
    <div className="wallet-details-form">
      <label className="wallet-details-form__field">
        <span>{t('checkout.walletPhoneNumber')}</span>
        <input
          type="tel"
          value={details.walletPhoneNumber}
          onChange={(e) => updateField(e.target.value)}
          placeholder="01xxxxxxxxx"
          maxLength={11}
        />
      </label>
    </div>
  );
}