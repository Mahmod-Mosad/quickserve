import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { loginUser } from '../../services/authService';
import { useLanguage } from '../../context/LanguageContext';
import './LoginPage.css';
import heroImage from '../../assets/images/login-hero.jpg';
import ThemeToggle from '../../components/ThemeToggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t, toggleLanguage, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser({ email, password });
      console.log('Login successful:', result);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function handleGoogleLogin() {
    console.log('Google login — not implemented yet');
  }

  function handleFacebookLogin() {
    console.log('Facebook login — not implemented yet');
  }

  function handleSignUpClick() {
    console.log('Navigate to Sign Up — screen not built yet');
  }

  return (
    <div className="login-page">
     <div className="login-theme-toggle">
        <button onClick={toggleLanguage} className="login-lang-toggle" aria-label="Toggle language">
          <Globe size={18} />
          {language === 'en' ? 'AR' : 'EN'}
        </button>
        <ThemeToggle />
      </div>

      <div className="login-hero">
        <img src={heroImage} alt="" className="login-hero__image" />
        <div className="login-hero__overlay">
          <h1 className="login-hero__title">
            {t('login.heroTitleLine1')}
            <br />
            {t('login.heroTitleLine2')}
          </h1>
          <p className="login-hero__subtitle">{t('login.heroSubtitle')}</p>
        </div>
      </div>

      <div className="login-form-panel">
        <div className="login-form-card">
          <div className="login-brand">
            <span className="login-brand__icon">🍴</span>
            <span className="login-brand__name">QuickServe</span>
          </div>

          <h2 className="login-title">{t('login.welcomeBack')}</h2>
          <p className="login-subtitle">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-field">
              <span className="login-field__label">{t('login.emailLabel')}</span>
              <div className="login-field__input-wrapper">
                <Mail size={18} className="login-field__icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="login-field__input"
                />
              </div>
            </label>

            <label className="login-field">
              <span className="login-field__label">{t('login.passwordLabel')}</span>
              <div className="login-field__input-wrapper">
                <Lock size={18} className="login-field__icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="login-field__input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-field__toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={isLoading} className="login-submit">
              {isLoading ? t('login.signingIn') : t('login.signIn')}
            </button>
          </form>

          <div className="login-divider">
            <span>{t('login.orContinueWith')}</span>
          </div>

          <div className="login-social">
            <button onClick={handleGoogleLogin} className="login-social__button">
              <span className="login-social__icon login-social__icon--google">G</span>
              {t('login.continueWithGoogle')}
            </button>
            <button onClick={handleFacebookLogin} className="login-social__button login-social__button--facebook">
              <span className="login-social__icon">f</span>
              {t('login.continueWithFacebook')}
            </button>
          </div>

          <p className="login-signup-prompt">
            {t('login.dontHaveAccount')}{' '}
            <button onClick={handleSignUpClick} className="login-signup-link">
              {t('login.signUp')}
            </button>
          </p>

          <p className="login-terms">
            {t('login.termsAgree')}{' '}
            <a href="#">{t('login.termsOfService')}</a> · <a href="#">{t('login.privacyPolicy')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}