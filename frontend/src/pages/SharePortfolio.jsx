import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDossierByShareId } from '../api/client';
import PortfolioMinimal from '../components/portfolio/PortfolioMinimal';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import PortfolioCreative from '../components/portfolio/PortfolioCreative';
import DeveloperDark from '../components/portfolio/DeveloperDark';

const TEMPLATES = {
  minimal: PortfolioMinimal,
  card: PortfolioCard,
  creative: PortfolioCreative,
  developerDark: DeveloperDark,
};

export default function SharePortfolio() {
  const { shareId } = useParams();
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDossierByShareId(shareId)
      .then(setDossier)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [shareId]);

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

  const templateId = dossier.webPortfolioTemplateId || 'minimal';
  const Component = TEMPLATES[templateId] || PortfolioMinimal;

  return <Component dossier={dossier} />;
}
