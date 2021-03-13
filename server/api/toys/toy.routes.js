const express = require('express');
const { requireAdmin } = require('../../middlewares/requireAuth.middleware');
const { log } = require('../../middlewares/logger.middleware');
const router = express.Router();
const {
    getToys,
    getToy,
    removeToy,
    addToy,
    updateToy,
} = require('./toy.controller');

router.get('/', log, getToys);
router.get('/:toyId', getToy);

router.post('/', requireAdmin, addToy);
router.delete('/:toyId', requireAdmin, removeToy);

router.put('/:toyId', requireAdmin, updateToy);

module.exports = router;
