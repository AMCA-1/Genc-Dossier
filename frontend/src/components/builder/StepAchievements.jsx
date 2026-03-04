export default function StepAchievements({ data, update, validationErrors = {} }) {
  const achievements = data.achievements || [];
  const volunteering = data.volunteering || [];

  const addAchievement = () => {
    update('achievements', [...achievements, { title: '', description: '', date: '' }]);
  };
  const removeAchievement = (i) => update('achievements', achievements.filter((_, idx) => idx !== i));
  const changeAchievement = (i, field, value) => {
    const next = [...achievements];
    next[i] = { ...next[i], [field]: value };
    update('achievements', next);
  };

  const addVolunteering = () => {
    update('volunteering', [...volunteering, { organization: '', role: '', description: '', duration: '' }]);
  };
  const removeVolunteering = (i) => update('volunteering', volunteering.filter((_, idx) => idx !== i));
  const changeVolunteering = (i, field, value) => {
    const next = [...volunteering];
    next[i] = { ...next[i], [field]: value };
    update('volunteering', next);
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-4">Achievements & recognitions</h2>
        {achievements.map((a, i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 mb-3 space-y-2">
            <div className="flex justify-end">
              <button type="button" onClick={() => removeAchievement(i)} className="text-red-600 dark:text-red-400 text-sm hover:underline">
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Title / Award"
              value={a.title || ''}
              onChange={(e) => changeAchievement(i, 'title', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`achievements.${i}.title`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`achievements.${i}.title`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
            <input
              type="text"
              placeholder="Description"
              value={a.description || ''}
              onChange={(e) => changeAchievement(i, 'description', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`achievements.${i}.description`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`achievements.${i}.description`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
            <input
              type="text"
              placeholder="Date"
              value={a.date || ''}
              onChange={(e) => changeAchievement(i, 'date', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`achievements.${i}.date`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`achievements.${i}.date`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addAchievement}
          className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-500"
        >
          + Add achievement
        </button>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white mb-4">Volunteering</h2>
        {volunteering.map((v, i) => (
          <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 mb-3 space-y-2">
            <div className="flex justify-end">
              <button type="button" onClick={() => removeVolunteering(i)} className="text-red-600 dark:text-red-400 text-sm hover:underline">
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Organization"
              value={v.organization || ''}
              onChange={(e) => changeVolunteering(i, 'organization', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`volunteering.${i}.organization`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`volunteering.${i}.organization`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
            <input
              type="text"
              placeholder="Role"
              value={v.role || ''}
              onChange={(e) => changeVolunteering(i, 'role', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`volunteering.${i}.role`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`volunteering.${i}.role`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
            <input
              type="text"
              placeholder="Description"
              value={v.description || ''}
              onChange={(e) => changeVolunteering(i, 'description', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`volunteering.${i}.description`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`volunteering.${i}.description`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
            <input
              type="text"
              placeholder="Duration"
              value={v.duration || ''}
              onChange={(e) => changeVolunteering(i, 'duration', e.target.value)}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 px-3 py-2"
              style={validationErrors[`volunteering.${i}.duration`] ? { border: '1px solid red' } : undefined}
            />
            {validationErrors[`volunteering.${i}.duration`] && (
              <p style={{ fontSize: 'small', color: 'red' }}>Please fill this detail</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addVolunteering}
          className="px-4 py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-primary-500"
        >
          + Add volunteering
        </button>
      </div>
    </section>
  );
}
