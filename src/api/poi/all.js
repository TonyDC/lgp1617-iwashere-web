'use strict';

const httpCodes = require('http-status-codes');

const express = require('express');
const router = express.Router();

const db = root_require('src/db/query');

const DECIMAL_BASE = 10;

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { POI } = db;
    POI.getPOIDetailByID(id).
    then((poi) => {
        if (poi && poi.length === 1) {
            res.json(poi[0]).end();
        } else {
            res.sendStatus(httpCodes.NOT_FOUND).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});


router.get('/media/:poiID', (req, res, next) => {
    const { poiID } = req.params;
    if (!poiID || isNaN(parseInt(poiID, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { POI } = db;

    POI.getMediaFromPOI(poiID).
    then((media) => {
        if (media) {
            res.json(media).end();
        } else {
            res.sendStatus(httpCodes.NOT_FOUND).end();
        }
    }).
    catch((error) => {
        next(error);
    });

});

function getPOIRating(res, poiId, userId) {
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

    if (!poiId || !userId) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    getPOIRating(res, poiId, userId);
});

router.get('/rating/:poiId', (req, res) => {
    const { poiId } = req.params;

    if (!poiId) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    getPOIRating(res, poiId);
});

router.post('/rating', (req, res) => {
    const { userId, rating } = req.body;
    const poiId = req.body.entityId;

    if (!poiId || !userId || !rating || isNaN(parseInt(rating, DECIMAL_BASE))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const POIRating = db.poi_rating;
    POIRating.findOrCreate({
        defaults: {
            poiId,
            rating,
            userId
        },
        where: { $and: [{ poiId }, { userId }] }
    }).
    then((ratingEntry, created) => {
        if (created) {
            res.sendStatus(httpCodes.OK).end();
        } else {
            ratingEntry[0].updateAttributes({ rating }).
            then(res.sendStatus(httpCodes.CREATED).end());
        }
    }).
    catch((error) => {
        console.error(error);
        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR).end();
    });
});

router.get('/range/:minLat/:maxLat/:minLng/:maxLng', (req, res, next) => {
    const { minLat, maxLat, minLng, maxLng } = req.params;

    if (!minLat || !maxLat || !minLng || !maxLng ||
        isNaN(parseFloat(minLat)) || isNaN(parseFloat(maxLat)) || isNaN(parseFloat(minLng)) || isNaN(parseFloat(maxLng))) {
        res.sendStatus(httpCodes.BAD_REQUEST).end();

        return;
    }

    const { POI } = db;
    POI.getPOIsWithinWindow(minLat, maxLat, minLng, maxLng).
    then((rows) => {
        if (rows) {
            res.json(rows).end();
        } else {
            res.sendStatus(httpCodes.NOT_FOUND).end();
        }
    }).
    catch((error) => {
        next(error);
    });
});

module.exports = router;
