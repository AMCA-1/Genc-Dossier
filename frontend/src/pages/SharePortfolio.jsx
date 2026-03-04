import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDossierByShareId } from '../api/client';
import PortfolioMinimal from '../components/portfolio/PortfolioMinimal';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import PortfolioCreative from '../components/portfolio/PortfolioCreative';
import DeveloperDark from '../components/portfolio/DeveloperDark';

const TEMPLATES = {
  developer: PortfolioMinimal,
  showcase: PortfolioCard,
  creative: PortfolioCreative,
  'creative-pro': DeveloperDark,
};

export default function SharePortfolio() {
  const { shareId, template, portfolioId } = useParams();
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (portfolioId) {
      try {
        const raw = localStorage.getItem('genc_portfolios');
        const parsed = raw ? JSON.parse(raw) : [];
        let list = [];
        if (Array.isArray(parsed)) {
          list = parsed;
        } else if (parsed && typeof parsed === 'object') {
          list = Object.entries(parsed).map(([id, value]) => ({
            id,
            template: 'developer',
            data: value,
          }));
        }
        const found = list.find((p) => p.id === portfolioId && p.template === template);
        if (!found) {
          setError('Portfolio not found');
        } else {
          setDossier(found.data);
        }
      } catch (e) {
        setError(e.message || 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!shareId) {
      setError('Portfolio not found');
      setLoading(false);
      return;
    }

    getDossierByShareId(shareId)
      .then(setDossier)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [shareId, template, portfolioId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading portfolio…</p>
      </div>
    );
  }
  if (error || !dossier) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <p className="text-red-600 mb-2">Portfolio not found or link is invalid.</p>
          <a href="/" className="text-primary-600 hover:underline">Go home</a>
        </div>
      </div>
    );
  }

  const templateKey = template && TEMPLATES[template] ? template : 'developer';
  const Component = TEMPLATES[templateKey] || PortfolioMinimal;

  return <Component dossier={dossier} />;
}
