function escapeHtml(str) {
  if (str == null || str === '') return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function section(items, fn) {
  if (!items?.length) return '';
  return items.map(fn).join('');
}

function getData(dossier) {
  const p = dossier.profile || {};
  const skills = dossier.technicalSkills || [];
  const byCat = {};
  skills.forEach((s) => {
    const cat = s.category || 'other';
    if (!byCat[cat]) byCat[cat] = [];
    (s.items || []).forEach((i) => byCat[cat].push(i));
  });
  const order = ['programming', 'fullstack', 'tools', 'certifications'];
  return {
    name: escapeHtml(p.name || ''),
    email: escapeHtml(p.email || ''),
    phone: escapeHtml(p.phone || ''),
    location: escapeHtml(p.location || ''),
    cognizantId: escapeHtml(p.cognizantId || ''),
    role: escapeHtml(p.role || ''),
    track: escapeHtml(p.track || ''),
    education: dossier.education || [],
    skillGroups: order.filter((c) => byCat[c]?.length).map((c) => ({ name: c, items: byCat[c] || [] })),
    capstone: dossier.capstoneProject || {},
    achievements: dossier.achievements || [],
    volunteering: dossier.volunteering || [],
    sportsArts: dossier.sportsArts || [],
    strengths: dossier.strengths || [],
  };
}

/** Classic: single column, clean typography, clear sections */
// function classicTemplate(d) {
//   const edu = section(d.education, (e) =>
//     `<tr><td><strong>${escapeHtml(e.degree)}</strong> — ${escapeHtml(e.institution)} ${e.year ? `(${escapeHtml(e.year)})` : ''} ${e.stream ? ` · ${escapeHtml(e.stream)}` : ''} ${e.percentage ? ` · ${escapeHtml(e.percentage)}` : ''}</td></tr>`
//   );
//   const skillRows = section(d.skillGroups, (g) =>
//     `<tr><td><strong>${escapeHtml(g.name)}:</strong> ${(g.items || []).map(escapeHtml).join(', ')}</td></tr>`
//   );
//   const cap = d.capstone;
//   const capHtml = cap.title
//     ? `<h3 style="margin:8px 0 4px;font-size:13px;">${d.capstone.title}</h3>
//        ${cap.techStack?.length ? `<p style="margin:0 0 4px;font-size:11px;color:#444;">Tech: ${(cap.techStack || []).map(escapeHtml).join(', ')}</p>` : ''}
//        ${cap.role ? `<p style="margin:0 0 4px;font-size:11px;">Role: ${escapeHtml(cap.role)}</p>` : ''}
//        ${(cap.responsibilities || []).length ? `<ul style="margin:4px 0;padding-left:18px;font-size:11px;">${(cap.responsibilities || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : ''}
//        ${(cap.outcomes || []).length ? `<p style="margin:4px 0;font-size:11px;">Outcomes: ${(cap.outcomes || []).map(escapeHtml).join('; ')}</p>` : ''}`
//     : '';
//   const ach = section(d.achievements, (a) => `<li>${escapeHtml(a.title)} ${a.description ? `— ${escapeHtml(a.description)}` : ''} ${a.date ? `(${escapeHtml(a.date)})` : ''}</li>`);
//   const vol = section(d.volunteering, (v) => `<li>${escapeHtml(v.organization)} — ${escapeHtml(v.role)} ${v.description ? escapeHtml(v.description) : ''}</li>`);
//   const sports = section(d.sportsArts, (s) => `<li>${escapeHtml(s.name)}: ${escapeHtml(s.achievement || '')} ${s.level ? `(${escapeHtml(s.level)})` : ''}</li>`);
//   const str = section(d.strengths, (s) => `<li><strong>${escapeHtml(s.name)}</strong>${s.description ? ` — ${escapeHtml(s.description)}` : ''}</li>`);

//   return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>Dossier — ${d.name}</title>
//   <style>
//     * { box-sizing: border-box; }
//     body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 11px; line-height: 1.4; color: #222; max-width: 210mm; margin: 0 auto; padding: 12px; }
//     h1 { font-size: 20px; margin: 0 0 4px; border-bottom: 2px solid #0ea5e9; padding-bottom: 6px; }
//     h2 { font-size: 13px; margin: 14px 0 6px; color: #0c4a6e; text-transform: uppercase; letter-spacing: 0.5px; }
//     ul { margin: 4px 0; padding-left: 18px; }
//     table { width: 100%; border-collapse: collapse; }
//     td { padding: 2px 0; vertical-align: top; }
//     .meta { color: #555; font-size: 10px; margin-top: 2px; }
//   </style>
// </head>
// <body>
//   <h1>${d.name}</h1>
//   <p class="meta">${d.role}${d.track ? ` · ${d.track}` : ''} | ${d.email} | ${d.phone} | ${d.location} | Cognizant ID: ${d.cognizantId}</p>

//   <h2>Education</h2>
//   <table>${edu || '<tr><td>—</td></tr>'}</table>

//   <h2>Technical Skills</h2>
//   <table>${skillRows || '<tr><td>—</td></tr>'}</table>

//   <h2>Capstone Project</h2>
//   ${capHtml || '<p>—</p>'}

//   <h2>Achievements</h2>
//   <ul>${ach || '<li>—</li>'}</ul>

//   <h2>Volunteering</h2>
//   <ul>${vol || '<li>—</li>'}</ul>

//   <h2>Sports, Arts &amp; Accomplishments</h2>
//   <ul>${sports || '<li>—</li>'}</ul>

//   <h2>Strengths</h2>
//   <ul>${str || '<li>—</li>'}</ul>
// </body>
// </html>`;
// }

function classicTemplate(d) {
  // Helper to handle sections and return empty string if no data
  const section = (arr, fn) => (arr && arr.length ? arr.map(fn).join('') : '');

  const edu = section(d.education, (e) =>
    `<tr>
      <td style="padding-bottom: 8px;">
        <div style="display: flex; justify-content: space-between;">
          <strong>${escapeHtml(e.institution)}</strong>
          <span>${e.year ? escapeHtml(e.year) : ''}</span>
        </div>
        <div style="font-style: italic;">${escapeHtml(e.degree)}${e.stream ? ` in ${escapeHtml(e.stream)}` : ''}</div>
        ${e.percentage ? `<div style="font-size: 10px; color: #444;">Result: ${escapeHtml(e.percentage)}</div>` : ''}
      </td>
    </tr>`
  );

  const skillRows = section(d.skillGroups, (g) =>
    `<tr><td style="padding: 2px 0;"><strong>${escapeHtml(g.name)}:</strong> ${(g.items || []).map(escapeHtml).join(', ')}</td></tr>`
  );

  const cap = d.capstone;
  const capHtml = cap.title
    ? `<div style="margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h3 style="margin: 0; font-size: 12px; text-transform: uppercase; color: #222;">${escapeHtml(cap.title)}</h3>
          <span style="font-size: 10px; font-style: italic; color: #666;">Capstone Project</span>
        </div>
        ${cap.techStack?.length ? `<p style="margin: 2px 0; font-size: 10px; font-weight: 600; color: #555;">Technologies: ${(cap.techStack || []).map(escapeHtml).join(', ')}</p>` : ''}
        ${cap.role ? `<p style="margin: 2px 0; font-style: italic;">Role: ${escapeHtml(cap.role)}</p>` : ''}
        ${(cap.responsibilities || []).length ? `<ul style="margin: 4px 0; padding-left: 15px;">${(cap.responsibilities || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : ''}
        ${(cap.outcomes || []).length ? `<p style="margin: 4px 0; font-size: 11px;"><strong>Key Outcomes:</strong> ${(cap.outcomes || []).map(escapeHtml).join('; ')}</p>` : ''}
      </div>`
    : '<p>—</p>';

  const ach = section(d.achievements, (a) => `<li style="margin-bottom: 2px;">${escapeHtml(a.title)} ${a.description ? `— ${escapeHtml(a.description)}` : ''} ${a.date ? `<span style="float:right; font-style: italic; color: #666;">${escapeHtml(a.date)}</span>` : ''}</li>`);
  const vol = section(d.volunteering, (v) => `<li><strong>${escapeHtml(v.organization)}</strong> — ${escapeHtml(v.role)} ${v.description ? `<br><span style="color:#555;">${escapeHtml(v.description)}</span>` : ''}</li>`);
  const sports = section(d.sportsArts, (s) => `<li>${escapeHtml(s.name)}: ${escapeHtml(s.achievement || '')} ${s.level ? `<em>(${escapeHtml(s.level)})</em>` : ''}</li>`);
  const str = section(d.strengths, (s) => `<li><strong>${escapeHtml(s.name)}</strong>${s.description ? `: ${escapeHtml(s.description)}` : ''}</li>`);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${d.name} — Professional Dossier</title>
  <style>
    @page { margin: 15mm; }
    body { 
      font-family: "Garamond", "Georgia", serif; 
      font-size: 11.5px; 
      line-height: 1.5; 
      color: #1a1a1a; 
      max-width: 800px; 
      margin: 0 auto; 
      background: #fff;
    }
    .header { text-align: center; margin-bottom: 20px; }
    h1 { font-size: 26px; font-weight: normal; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 5px 0; }
    .contact-info { font-family: "Segoe UI", sans-serif; font-size: 10px; color: #555; text-transform: uppercase; letter-spacing: 0.5px; }
    
    h2 { 
      font-size: 12px; 
      font-weight: bold; 
      text-transform: uppercase; 
      border-bottom: 1px solid #333; 
      margin: 18px 0 8px 0; 
      padding-bottom: 2px;
      letter-spacing: 1px;
    }
    
    table { width: 100%; border-collapse: collapse; }
    ul { margin: 4px 0; padding-left: 18px; list-style-type: square; }
    li { margin-bottom: 4px; }
    
    .section-container { margin-bottom: 15px; }
    .footer-note { font-size: 9px; color: #999; text-align: center; margin-top: 30px; border-top: 0.5px solid #eee; padding-top: 10px; }
  </style>
</head>
<body>

  <div class="header">
    <h1>${d.name}</h1>
    <div class="contact-info">
      ${d.role} ${d.track ? `| ${d.track}` : ''}<br>
      ${d.location} • ${d.phone} • ${d.email}<br>
      <strong>Cognizant ID:</strong> ${d.cognizantId}
    </div>
  </div>

  <section class="section-container">
    <h2>Education</h2>
    <table>${edu || '<tr><td>—</td></tr>'}</table>
  </section>

  <section class="section-container">
    <h2>Technical Expertise</h2>
    <table>${skillRows || '<tr><td>—</td></tr>'}</table>
  </section>

  <section class="section-container">
    <h2>Signature Project</h2>
    ${capHtml}
  </section>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <section>
      <h2>Achievements</h2>
      <ul>${ach || '<li>—</li>'}</ul>
    </section>
    <section>
      <h2>Strengths</h2>
      <ul>${str || '<li>—</li>'}</ul>
    </section>
  </div>

  <section class="section-container">
    <h2>Volunteering & Leadership</h2>
    <ul>${vol || '<li>—</li>'}</ul>
  </section>

  <section class="section-container">
    <h2>Extracurriculars</h2>
    <ul>${sports || '<li>—</li>'}</ul>
  </section>

  <div class="footer-note">
    References available upon request
  </div>

</body>
</html>`;
}

/** Modern: two-column layout with accent sidebar */
function modernTemplate(d) {
  const edu = section(d.education, (e) => `<p style="margin:0 0 6px;"><strong>${escapeHtml(e.degree)}</strong><br/>${escapeHtml(e.institution)} ${e.year ? ` · ${escapeHtml(e.year)}` : ''} ${e.percentage ? ` · ${escapeHtml(e.percentage)}` : ''}</p>`);
  const skillsFlat = d.skillGroups.flatMap((g) => (g.items || []).map((i) => escapeHtml(i)));
  const cap = d.capstone;
  const capHtml = cap.title
    ? `<p><strong>${escapeHtml(cap.title)}</strong> ${cap.techStack?.length ? `(${(cap.techStack || []).map(escapeHtml).join(', ')})</p><p>Role: ${escapeHtml(cap.role || '')}</p>` : ''}
       ${(cap.responsibilities || []).length ? `<ul style="margin:4px 0;padding-left:16px;">${(cap.responsibilities || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : ''}`
    : '<p>—</p>';
  const ach = section(d.achievements, (a) => `<li>${escapeHtml(a.title)} ${a.date ? `(${escapeHtml(a.date)})` : ''}</li>`);
  const vol = section(d.volunteering, (v) => `<li>${escapeHtml(v.organization)} — ${escapeHtml(v.role)}</li>`);
  const sports = section(d.sportsArts, (s) => `<li>${escapeHtml(s.name)}</li>`);
  const str = section(d.strengths, (s) => `<li>${escapeHtml(s.name)}</li>`);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dossier — ${d.name}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; font-size: 10px; line-height: 1.35; color: #1e293b; margin: 0; padding: 0; }
    .wrap { display: flex; min-height: 100vh; }
    .sidebar { width: 28%; background: #0f172a; color: #e2e8f0; padding: 16px 12px; }
    .sidebar h2 { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; margin: 14px 0 6px; color: #94a3b8; border-bottom: 1px solid #334155; padding-bottom: 4px; }
    .sidebar p, .sidebar ul { margin: 0 0 8px; font-size: 10px; }
    .sidebar ul { padding-left: 14px; }
    .main { flex: 1; padding: 16px 18px; }
    .main h2 { font-size: 11px; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px; margin: 12px 0 6px; border-bottom: 1px solid #0ea5e9; padding-bottom: 4px; }
    .main ul { margin: 4px 0; padding-left: 16px; }
    .name { font-size: 18px; font-weight: 700; margin: 0 0 4px; color: #fff; }
    .role { font-size: 10px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="sidebar">
      <p class="name">${d.name}</p>
      <p class="role">${d.role}${d.track ? ` · ${d.track}` : ''}</p>
      <p>${d.email}</p>
      <p>${d.phone}</p>
      <p>${d.location}</p>
      <p>Cognizant ID: ${d.cognizantId}</p>
      <h2>Technical Skills</h2>
      <p>${skillsFlat.length ? skillsFlat.join(' · ') : '—'}</p>
      <h2>Education</h2>
      ${edu || '<p>—</p>'}
      <h2>Strengths</h2>
      <ul>${str || '<li>—</li>'}</ul>
    </div>
    <div class="main">
      <h2>Capstone Project</h2>
      ${capHtml}
      <h2>Achievements</h2>
      <ul>${ach || '<li>—</li>'}</ul>
      <h2>Volunteering</h2>
      <ul>${vol || '<li>—</li>'}</ul>
      <h2>Sports &amp; Arts</h2>
      <ul>${sports || '<li>—</li>'}</ul>
    </div>
  </div>
</body>
</html>`;
}

/** Executive: compact, formal, minimal design */
function executiveTemplate(d) {
  const edu = section(d.education, (e) => `<tr><td>${escapeHtml(e.degree)}</td><td>${escapeHtml(e.institution)}</td><td>${escapeHtml(e.year || '')}</td><td>${escapeHtml(e.percentage || '')}</td></tr>`);
  const skillLine = d.skillGroups.flatMap((g) => (g.items || []).map(escapeHtml)).join(' · ') || '—';
  const cap = d.capstone;
  const capHtml = cap.title
    ? `<p><strong>${escapeHtml(cap.title)}</strong>. ${cap.role ? `Role: ${escapeHtml(cap.role)}. ` : ''}${(cap.techStack || []).length ? `Tech: ${(cap.techStack || []).map(escapeHtml).join(', ')}.` : ''}</p>
       ${(cap.responsibilities || []).length ? `<ul style="margin:2px 0;padding-left:16px;">${(cap.responsibilities || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>` : ''}`
    : '<p>—</p>';
  const ach = section(d.achievements, (a) => `<li>${escapeHtml(a.title)}${a.date ? ` (${escapeHtml(a.date)})` : ''}</li>`);
  const vol = section(d.volunteering, (v) => `<li>${escapeHtml(v.organization)} — ${escapeHtml(v.role)}</li>`);
  const sports = section(d.sportsArts, (s) => `<li>${escapeHtml(s.name)}</li>`);
  const str = section(d.strengths, (s) => `<li>${escapeHtml(s.name)}</li>`);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${d.name} — Dossier</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Georgia, serif; font-size: 10px; line-height: 1.4; color: #1f2937; max-width: 210mm; margin: 0 auto; padding: 14px; }
    h1 { font-size: 16px; margin: 0 0 2px; font-weight: 700; }
    .sub { font-size: 9px; color: #6b7280; margin-bottom: 10px; }
    h2 { font-size: 10px; margin: 10px 0 4px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #374151; }
    ul { margin: 2px 0; padding-left: 16px; }
    table { width: 100%; font-size: 9px; border-collapse: collapse; }
    td { padding: 1px 8px 1px 0; vertical-align: top; }
    th { text-align: left; font-weight: 600; color: #4b5563; }
  </style>
</head>
<body>
  <h1>${d.name}</h1>
  <p class="sub">${d.role}${d.track ? ` · ${d.track}` : ''} &nbsp;|&nbsp; ${d.email} &nbsp;|&nbsp; ${d.phone} &nbsp;|&nbsp; ${d.location} &nbsp;|&nbsp; ID: ${d.cognizantId}</p>

  <h2>Education</h2>
  <table><tr><th>Degree</th><th>Institution</th><th>Year</th><th>%</th></tr>${edu || '<tr><td colspan="4">—</td></tr>'}</table>

  <h2>Technical Skills</h2>
  <p>${skillLine}</p>

  <h2>Capstone Project</h2>
  ${capHtml}

  <h2>Achievements</h2>
  <ul>${ach || '<li>—</li>'}</ul>

  <h2>Volunteering</h2>
  <ul>${vol || '<li>—</li>'}</ul>

  <h2>Sports &amp; Arts</h2>
  <ul>${sports || '<li>—</li>'}</ul>

  <h2>Strengths</h2>
  <ul>${str || '<li>—</li>'}</ul>
</body>
</html>`;
}

const templates = {
  classic: classicTemplate,
  modern: modernTemplate,
  executive: executiveTemplate,
};

export function buildResumeHtml(dossier, templateId = 'classic') {
  const d = getData(dossier);
  const fn = templates[templateId] || classicTemplate;
  return fn(d);
}
