var express = require('express');

var router = express.Router();
const TimerModel = require('../../database/models/Timer');

router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});
router.post('/', async (req, res) => {
  try {
    const { closeDate, finalCloseDate, startDate } = req.body;
    const newCloseDate = await TimerModel.create({
      closeDate,
      finalCloseDate,
      startDate,
    });
    if (!newCloseDate) return res.status(400).json({ message: 'Error creating close date' });
    res.status(201).json(newCloseDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hello W
router.patch('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

module.exports = router;
