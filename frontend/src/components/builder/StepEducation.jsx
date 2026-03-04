export default function StepEducation({ data, update }) {
  const list = data.education || [];

  const add = () => {
    update('education', [...list, { degree: '', institution: '', year: '', stream: '', percentage: '' }]);
  };

  const remove = (i) => {
    update('education', list.filter((_, idx) => idx !== i));
  };

  const change = (i, field, value) => {
    const next = [...list];
    next[i] = { ...next[i], [field]: value };
    update('education', next);
  };

  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Education</h2>
      {list.map((edu, i) => (
        <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Qualification {i + 1}</span>
            <button type="button" onClick={() => remove(i)} className="text-red-600 dark:text-red-400 text-sm hover:underline">
              Remove
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree || ''}
              onChange={(e) => change(i, 'degree', e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution || ''}
              onChange={(e) => change(i, 'institution', e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year || ''}
              onChange={(e) => change(i, 'year', e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Stream"
              value={edu.stream || ''}
              onChange={(e) => change(i, 'stream', e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
            />
            <input
              type="text"
              placeholder="Percentage / CGPA"
              value={edu.percentage || ''}
              onChange={(e) => change(i, 'percentage', e.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2 sm:col-span-2"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600"
      >
        + Add education
      </button>
    </section>
  );
}
