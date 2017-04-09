'use strict';

const express = require('express');
const router = express.Router();

const httpStatus = require('http-status-codes');
const validator = require('validator');

/**
 * Get POI endpoint
 */
router.get('/:id', (req, res) => {
    POI.findById(req.params.id).then((poi) => {
        res.status(httpStatus.OK).send(poi).
        end();
    });
});

/**
 * Create POI endpoint
 * Body properties:
 *  - description
 *  - latitude
 *  - longitude
 *  - name
 */
router.post('/', (req, res) => {
    const { description, latitude, longitude, name } = req.body;
    const latitudeRegex = '^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?[0-8]\d((\.)|\.\d{1,6})?)|(0*?90((\.)|\.0{1,6})?))$';
    const longitudeRegex = '^(\+|-)?((\d((\.)|\.\d{1,6})?)|(0*?\d\d((\.)|\.\d{1,6})?)|(0*?1[0-7]\d((\.)|\.\d{1,6})?)|(0*?180((\.)|\.0{1,6})?))$';

    if (typeof description !== 'string' || validator.isEmpty(description.trim())) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-description',
            message: 'Invalid description.'
        }).
        end();

        return;

    } else if (typeof latitude !== 'string' || !latitudeRegex.test(latitude)) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-email',
            message: 'Invalid latitude.'
        }).
        end();

        return;

    } else if (typeof longitude !== 'string' || !longitudeRegex.test(longitude)) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-email',
            message: 'Invalid longitude.'
        }).end();

        return;
    } else if (typeof name !== 'string' || validator.isEmpty(name.trim())) {
        res.status(httpStatus.BAD_REQUEST).send({
            code: 'bad-description',
            message: 'Invalid name.'
        }).
        end();

        return;
    }

    // TODO add to db and provide response
});

module.exports = router;
