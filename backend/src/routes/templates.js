import express from 'express';

const router = express.Router();

const RESUME_TEMPLATES = [
  { id: 'classic', name: 'Classic', description: 'Single column, clear sections and blue accents. Best for readability.' },
  { id: 'modern', name: 'Modern', description: 'Two-column layout with dark sidebar. Skills and education on the left.' },
  { id: 'executive', name: 'Executive', description: 'Compact, formal style with table-based education. Professional and minimal.' },
];

const WEB_PORTFOLIO_TEMPLATES = [
  { id: 'minimal', name: 'Developer', description: 'Clean portfolio with hero, projects grid, and contact. Ideal for tech roles.' },
  { id: 'card', name: 'Showcase', description: 'Card-based layout with strong visuals. Great for standing out.' },
  { id: 'creative', name: 'Creative', description: 'Bold typography and sections. Best for design-forward profiles.' },
  // { id: 'developer', name: 'Developer Dark', description: 'Dark full-stack portfolio with hero, project highlight, skills, and journey timeline.' },
  { id: 'developerDark', name: 'Creative Pro', description: 'Lime hero, sticky nav, animated glow, works timeline, and skills gallery.' },
];

router.get('/resume', (req, res) => {
  res.json(RESUME_TEMPLATES);
});

router.get('/web', (req, res) => {
  res.json(WEB_PORTFOLIO_TEMPLATES);
});

export default router;
