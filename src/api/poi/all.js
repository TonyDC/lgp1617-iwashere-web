'use strict';

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('models');

router.get('/range/:minLat/:maxLat/:minLng/:maxLng', (req, res) => {
    const { minLat, maxLat, minLng, maxLng } = req.params;

    console.log(minLat, maxLat, minLng, maxLng);

    const POI = db.poi;
    POI.findAll({
        where: {
            latitude: {
                $gte: minLat,
                $lte: maxLat
            },
            longitude: {
                $gte: minLng,
                $lte: maxLng
            }
        }
    }).then((rows) => {
        res.json(rows.map((item) => {
            return item.dataValues;
        })).end();
    }).
    catch((error) => {
        console.error(error);
        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
    });
});

module.exports = router;
