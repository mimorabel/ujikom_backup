const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middlewares/auth.middleware');

// Get all users (only admin)
router.get('/', auth('Pemilik'), async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get profile (any logged in user)
router.get('/me', auth(), async (req, res) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: req.user.id } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
