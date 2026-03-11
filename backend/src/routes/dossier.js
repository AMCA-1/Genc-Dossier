import express from 'express';
import Dossier from '../models/Dossier.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    // Try to find an existing dossier for this user first
    let dossier = await Dossier.findOne({ userId: req.user._id });
    
    if (dossier) {
      // If it exists, update it with the new data
      Object.assign(dossier, req.body);
      dossier.userId = req.user._id; // Ensure userId remains correct
      await dossier.save();
      return res.status(200).json(dossier);
    }
    
    // Otherwise create a new one
    dossier = new Dossier({ ...req.body, userId: req.user._id });
    await dossier.save();
    res.status(201).json(dossier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const list = await Dossier.find({ userId: req.user._id }).sort({ updatedAt: -1 }).lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** Get latest dossier (full document) in one request - avoids list + get by id */
router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const dossier = await Dossier.findOne({ userId: req.user._id }).sort({ updatedAt: -1 }).lean();
    if (!dossier) return res.status(404).json({ error: 'No dossier found' });
    res.json(dossier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/share/:shareId', async (req, res) => {
  try {
    const dossier = await Dossier.findOne({ shareId: req.params.shareId }).lean();
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    res.json(dossier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const dossier = await Dossier.findOne({ _id: req.params.id, userId: req.user._id }).lean();
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    res.json(dossier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const dossier = await Dossier.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).lean();
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    res.json(dossier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const dossier = await Dossier.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!dossier) return res.status(404).json({ error: 'Dossier not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
