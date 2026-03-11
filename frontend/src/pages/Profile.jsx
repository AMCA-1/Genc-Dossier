import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLatestDossier } from '../api/client';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLatestDossier()
      .then((d) => setDossier(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const p = dossier?.profile || {};
  const education = dossier?.education || [];
  const skills = dossier?.technicalSkills || [];
  const capstone = dossier?.capstoneProject || {};
  const achievements = dossier?.achievements || [];
  const volunteering = dossier?.volunteering || [];
  const sportsArts = dossier?.sportsArts || [];
  const strengths = dossier?.strengths || [];

  console.log(p.linkedIn)

  const SectionHeader = ({ title, editStep }) => (
    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between gap-4">
      <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      <Link
        to={`/build/${editStep}`}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit
      </Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Profile
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm">
            Review and manage all your dossier information.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
        >
          Logout
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-200 dark:bg-primary-900/40" />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading your profile…</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="mb-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {!loading && (
        <div className="space-y-8 pb-20">
          {/* Candidate Profile Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
            <SectionHeader title="Candidate Profile" editStep="profile" />
            <div className="p-6">
              {dossier ? (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="shrink-0 flex justify-center md:justify-start">
                    <div className="w-32 h-32 rounded-2xl bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center overflow-hidden shadow-inner">
                      {p.photoUrl || user?.photoUrl ? (
                        <img
                          src={p.photoUrl || user?.photoUrl}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl font-bold text-slate-300 dark:text-slate-500">
                          {(() => {
                            const name = String(p.name || user?.name || user?.email || '?').trim();
                            return name.charAt(0).toUpperCase();
                          })()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Full Name</h4>
                      <p className="text-slate-900 dark:text-white font-semibold">{p.name || '—'}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Email Address</h4>
                      <p className="text-slate-900 dark:text-white font-medium">{p.email || '—'}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Phone Number</h4>
                      <p className="text-slate-900 dark:text-white">{p.phone || '—'}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Location</h4>
                      <p className="text-slate-900 dark:text-white">{p.location || '—'}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Role & Track</h4>
                      <p className="text-slate-900 dark:text-white font-medium">
                        {p.role || '—'} {p.track ? <span className="text-slate-400 mx-1">/</span> : ''} {p.track || ''}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Cognizant ID</h4>
                      <p className="text-slate-900 dark:text-white">{p.cognizantId || '—'}</p>
                    </div>
                    <div className="sm:col-span-2 flex flex-wrap gap-4 pt-2">
                      {p.linkedIn && (
                        <a href={p.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 text-sm font-medium">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          LinkedIn
                        </a>
                      )}
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 text-sm font-medium">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">No dossier record found yet.</p>
                  <Link
                    to="/build/profile"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-500 shadow-md transition-all"
                  >
                    Start Building Dossier
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Education Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
            <SectionHeader title="Education" editStep="education" />
            <div className="p-6">
              {education.length > 0 ? (
                <div className="space-y-6">
                  {education.map((edu, i) => (
                    <div key={i} className="flex gap-4 relative group">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 dark:text-white">{edu.degree || 'Degree —'}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{edu.institution || 'Institution —'}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">{edu.year || 'Year —'}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">{edu.stream || 'Stream —'}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold">{edu.percentage || '—'}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">No education details added yet.</p>
              )}
            </div>
          </section>

          {/* Technical Skills Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
            <SectionHeader title="Technical Skills" editStep="skills" />
            <div className="p-6">
              {skills.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skills.map((group, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{group.category || 'Category'}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.items?.map((item, j) => (
                          <span key={j} className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-300 font-medium">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">No skills added yet.</p>
              )}
            </div>
          </section>

          {/* Capstone Project Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
            <SectionHeader title="Capstone Project" editStep="capstone" />
            <div className="p-6">
              {capstone.title ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{capstone.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {capstone.techStack?.map((tech, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[11px] font-bold uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{capstone.description}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Key Responsibilities</h4>
                      <ul className="space-y-2">
                        {capstone.responsibilities?.map((res, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-100">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                            {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Outcomes & Achievements</h4>
                      <ul className="space-y-2">
                        {capstone.outcomes?.map((out, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-100">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {out}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">No capstone project details added yet.</p>
              )}
            </div>
          </section>

          {/* Achievements & Volunteering Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
              <SectionHeader title="Achievements" editStep="achievements" />
              <div className="p-6">
                {achievements.length > 0 ? (
                  <ul className="space-y-5">
                    {achievements.map((ach, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{ach.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ach.date}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{ach.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-sm italic">No achievements added yet.</p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
              <SectionHeader title="Volunteering" editStep="achievements" />
              <div className="p-6">
                {volunteering.length > 0 ? (
                  <ul className="space-y-5">
                    {volunteering.map((vol, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{vol.organization}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{vol.role} • {vol.duration}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{vol.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-sm italic">No volunteering work added yet.</p>
                )}
              </div>
            </section>
          </div>

          {/* Sports & Arts Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
            <SectionHeader title="Sports & Arts" editStep="sports" />
            <div className="p-6">
              {sportsArts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sportsArts.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20 flex items-start gap-4">
                      <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${item.type === 'sports' ? 'bg-blue-500' : item.type === 'arts' ? 'bg-purple-500' : 'bg-slate-500'}`}>
                        {item.type === 'sports' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 uppercase font-medium tracking-tighter">{item.type}</p>
                        {item.achievement && <p className="text-xs text-primary-600 dark:text-primary-400 font-bold mt-1">🏆 {item.achievement}</p>}
                        {item.level && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.level} Level</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">No sports or arts activities added yet.</p>
              )}
            </div>
          </section>

          {/* Strengths Section */}
          <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm overflow-hidden">
            <SectionHeader title="Strengths" editStep="strengths" />
            <div className="p-6">
              {strengths.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {strengths.map((s, i) => (
                    <div key={i} className="flex-1 min-w-[200px] p-4 rounded-xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-primary-500" />
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{s.name}</h4>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">No strengths added yet.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
