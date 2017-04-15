'use strict';

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('models');

const DECIMAL_BASE = 10;

router.get('/info/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const POI = db.poi;
    POI.findById(id).
    then((poi) => {
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

function getPOIRating(poiId, userId, res) {
    const POIRating = db.poi_rating;

    POIRating.findAll({ where: { poiId } }).
    then((poiRatings) => {
        const poiRating = { rating: 0 };

        poiRatings.forEach((row) => {
            const ratingEntry = row.dataValues;

            poiRating.rating += ratingEntry.rating;

            if (ratingEntry.userId === userId) {
                poiRating.userRating = ratingEntry.rating;
            }
        });

        if (poiRatings.length) {
            poiRating.rating /= poiRatings.length;
        }

        res.json(poiRating).end();
    }).
    catch((error) => {
        console.error(error);
        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
    });
}
router.get('/rating/:poiId/:userId', (req, res) => {
    const { poiId, userId } = req.params;

    if (!poiId) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    getPOIRating(poiId, userId, res);
});

router.post('/rating/:poiId/:userId/:rating', (req, res) => {
    const { poiId, userId, rating } = req.params;

    if (!poiId || !userId || !rating || isNaN(parseInt(rating, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const POIRating = db.poi_rating;
    POIRating.upsert({
        poiId,
        rating,
        userId
    }).
    then(() => {
        getPOIRating(poiId, userId, res);
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
    }).
    then((rows) => {
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
