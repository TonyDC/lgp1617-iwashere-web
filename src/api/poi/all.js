'use strict';

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('models');

router.get('/info/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const POI = db.poi;
    POI.findById(id).then((poi) => {
        if (poi) {
            res.json(poi.dataValues).end();
        } else {
            res.sendStatus(httpCodes.NOT_FOUND).end();
        }
    }).
    catch((error) => {
        console.error(error);
        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
    });
});


router.get('/range/:minLat/:maxLat/:minLng/:maxLng', (req, res) => {
    const { minLat, maxLat, minLng, maxLng } = req.params;

    if (!minLat || !maxLat || !minLng || !maxLng ||
        isNaN(parseFloat(minLat)) || isNaN(parseFloat(maxLat)) || isNaN(parseFloat(minLng)) || isNaN(parseFloat(maxLng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

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
        if (rows) {
            res.json(rows.map((item) => {
                return item.dataValues;
            })).end();
        } else {
            res.sendStatus(httpCodes.NOT_FOUND).end();
        }
    }).
    catch((error) => {
        console.error(error);
        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
    });
});

module.exports = router;
