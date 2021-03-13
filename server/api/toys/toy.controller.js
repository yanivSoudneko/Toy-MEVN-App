const toyService = require('./toy.service');
const logger = require('../../services/logger.service');

async function getToys(req, res) {
    try {
        const filterBy = req.query;
        logger.info('backend filter by got', filterBy);
        const toys = await toyService.query(filterBy);
        res.json(toys);
    } catch (error) {
        logger.error('Cannot get toys', error);
        res.status(500).send({ error: 'Failed to get toys' });
    }
}

async function getToy(req, res) {
    const toyId = req.params.toyId;
    try {
        const toy = await toyService.getById(toyId);
        res.json(toy);
    } catch (error) {
        logger.error('Cannot get toy', error);
        res.status(500).send({ error: 'Failed to get toy:' + toyId });
    }
}

async function removeToy(req, res) {
    try {
        const toyId = req.params.toyId;
        const res = await toyService.remove(toyId);
        logger.info('toy deleted:' + toyId);
        res.json('deleted');
    } catch (error) {
        logger.error('Cannot remove toy', error);
        res.status(401).send({ error: 'Failed to remove toy:' + toyId });
    }
}

async function addToy(req, res) {
    try {
        const newtoy = req.body;
        const savedtoy = await toyService.save(newtoy);
        logger.info('toy added:', savedtoy);
        res.json(savedtoy);
    } catch (error) {
        logger.error('Cannot add toy', error);
        res.status(401).send({ error: 'Failed to add toy' });
    }
}

async function updateToy(req, res) {
    try {
        const newtoy = req.body;
        const savedtoy = toyService.update(newtoy);
        console.log('Updated toy:', savedtoy);
        res.json(savedtoy);
    } catch (error) {
        logger.error('Cannot update toy', error);
        res.status(401).send({ error: 'Failed to update toy:' + toyId });
    }
}

module.exports = {
    getToys,
    getToy,
    removeToy,
    addToy,
    updateToy,
};
