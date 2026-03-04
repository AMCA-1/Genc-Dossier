// Choose output: PDF only, Web portfolio only, or Both. Used before Templates & Export.
const OPTIONS = [
  {
    id: 'pdf',
    label: 'PDF Dossier',
    description: 'Download a printable resume. Pick a layout in the next step.',
    icon: (className) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'web',
    label: 'Web Portfolio Dossier',
    description: 'Get a shareable link. Choose a design in the next step.',
    icon: (className) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  // {
  //   id: 'both',
  //   label: 'Both',
  //   description: 'PDF resume and a web portfolio link. You’ll pick designs for each.',
  //   icon: (className) => (
  //     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9" />
  //     </svg>
  //   ),
  // },
];

export default function StepOutput({ data, update }) {
  const selected = data.outputType || 'both';

  const handleSelect = (id) => {
    update('outputType', id);
    update('enableWebPortfolio', id === 'web' || id === 'both');
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-1">
          What do you need?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Choose whether you want a PDF resume, a web portfolio link, or both. You’ll pick designs in the next step.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`relative flex flex-col text-left rounded-xl overflow-hidden transition-all duration-200 p-5 ${
                isSelected
                  ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-slate-900 shadow-lg bg-white dark:bg-slate-800'
                  : 'border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md active:scale-[0.99]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {Icon && Icon('w-6 h-6')}
              </div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white mb-1 pr-8">
                {opt.label}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
