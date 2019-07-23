const express = require('express');
const app = express();
const router = express.Router();

router.get('/api/citation/member/:memberId', (req, res) => {
  res.json({
    mebmerId: req.params.memberId,
    citation: 1
  });
});

module.exports = router;

