import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getShareUrl, downloadPdf } from '../../api/client';

// —— PDF Resume template icons (document / layout style) ——
const ResumeIconClassic = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 8h20l8 8v24a2 2 0 01-2 2H10a2 2 0 01-2-2V10a2 2 0 012-2z" />
    <path d="M30 8v8h8" />
    <path d="M14 20h20M14 26h14M14 32h10" />
  </svg>
);
const ResumeIconModern = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6h12l8 8v28a2 2 0 01-2 2H10a2 2 0 01-2-2V8a2 2 0 012-2z" />
    <path d="M22 6v8h8" />
    <rect x="14" y="20" width="8" height="2" rx="0.5" />
    <rect x="14" y="26" width="8" height="2" rx="0.5" />
    <rect x="14" y="32" width="6" height="2" rx="0.5" />
    <path d="M26 20h10M26 24h8M26 28h6" />
  </svg>
);
const ResumeIconExecutive = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6h24a2 2 0 012 2v32a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
    <path d="M12 14h24M12 20h24M12 26h18" />
    <rect x="12" y="32" width="8" height="2" rx="0.5" />
    <rect x="12" y="36" width="6" height="2" rx="0.5" />
  </svg>
);

const RESUME_ICONS = {
  classic: ResumeIconClassic,
  modern: ResumeIconModern,
  executive: ResumeIconExecutive,
};

// —— Web portfolio template icons (layout / style) ——
const WebIconDeveloper = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="36" height="32" rx="2" />
    <path d="M6 16h36M14 22h4M14 28h6" />
    <path d="M26 22h10M26 28h8" />
  </svg>
);
const WebIconShowcase = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="16" height="16" rx="2" />
    <rect x="26" y="6" width="16" height="16" rx="2" />
    <rect x="6" y="26" width="16" height="16" rx="2" />
    <rect x="26" y="26" width="16" height="16" rx="2" />
  </svg>
);
const WebIconCreative = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 12h32M8 20h28M8 28h24M8 36h20" />
    <path d="M40 12v24l-8-6-6 4-6-6-6 8" />
  </svg>
);

const WEB_ICONS = {
  minimal: WebIconDeveloper,
  card: WebIconShowcase,
  creative: WebIconCreative,
};

// Resume template features (short tags)
const RESUME_FEATURES = {
  classic: ['Single column', 'Blue accents', 'Print-ready'],
  modern: ['Two columns', 'Sidebar layout', 'Modern look'],
  executive: ['Compact', 'Table style', 'Formal'],
};

const WEB_FEATURES = {
  minimal: ['Hero section', 'Projects grid', 'Tech focus'],
  card: ['Card layout', 'Visual impact', 'Stand out'],
  creative: ['Bold type', 'Sections', 'Design-led'],
};

function TemplateCard({ template, icon: Icon, features = [], selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col text-left rounded-xl overflow-hidden transition-all duration-200 ${
        selected
          ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900 shadow-lg bg-white dark:bg-slate-800'
          : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md active:scale-[0.99]'
      }`}
    >
      <div className="relative p-5 flex flex-col flex-1">
        {selected && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors ${
            selected ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600'
          }`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1 pr-8">
          {template.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug mb-3 flex-1">
          {template.description}
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <li key={f} className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export default function StepTemplates({
  data,
  update,
  save,
  loading,
  savedId,
  shareId,
  resumeTemplates,
  webTemplates,
}) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasClickedUpdate, setHasClickedUpdate] = useState(false);

  const outputType = data.outputType || 'both';
  const showPdf = outputType === 'pdf' || outputType === 'both';
  const showWeb = outputType === 'web' || outputType === 'both';

  const handleCopyLink = () => {
    if (!shareId) return;
    const url = getShareUrl(shareId);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = async () => {
    if (!savedId) return;
    setPdfError('');
    setPdfLoading(true);
    try {
      await downloadPdf(savedId, data.resumeTemplateId, `dossier-${shareId || 'export'}.pdf`);
    } catch (e) {
      setPdfError(e.message || 'Failed to generate PDF');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <section className="space-y-14">
      {/* PDF Resume Layout – only when user chose PDF or Both */}
      {showPdf && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                PDF Resume Layout
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Choose a professional layout for your downloadable dossier. Each design is print-ready and ATS-friendly.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {(resumeTemplates || []).map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                icon={RESUME_ICONS[t.id] || RESUME_ICONS.classic}
                features={RESUME_FEATURES[t.id] || RESUME_FEATURES.classic}
                selected={data.resumeTemplateId === t.id}
                onClick={() => update('resumeTemplateId', t.id)}
             
              />
            ))}
          </div>
        </div>
      )}

      {/* Web Portfolio – only when user chose Web or Both */}
      {showWeb && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center text-white shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Web Portfolio
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                A shareable link recruiters can view online. Pick a style that matches your profile.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {(webTemplates || []).map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                icon={WEB_ICONS[t.id] || WEB_ICONS.minimal}
                features={WEB_FEATURES[t.id] || WEB_FEATURES.minimal}
                selected={data.webPortfolioTemplateId === t.id}
                onClick={() => update('webPortfolioTemplateId', t.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Save & Export */}
      <div className="pt-10 border-t-2 border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => {
              if (savedId) setHasClickedUpdate(true);
              save();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {savedId ? 'Update dossier' : 'Save dossier'}
              </>
            )}
          </button>
        </div>

        {savedId && (
          <div className="space-y-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            {pdfError && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {pdfError}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {showPdf && (
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={pdfLoading}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {pdfLoading ? 'Generating…' : 'Download PDF'}
                </button>
              )}
              {showWeb && shareId && hasClickedUpdate && (
                <>
                  <Link
                    to={`/p/${shareId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-medium hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View portfolio
                  </Link>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition-colors ${
                      copied
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m2 4a2 2 0 01-2 2h-2m-4-1H8" />
                        </svg>
                        Copy link
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
