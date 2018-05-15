const express = require("express");
const tripRouter = express.Router();
const TripModel = require("../models/trip-model");

tripRouter.route("/")
    .get((req, res) => {
        TripModel.find(req.query, (err, foundTrip) => {
            if (err) res.send(err);
            else res.status(200).send(foundTrip);
        })
    })
    .post((req, res) => {
        const newTrip = new TripModel(req.body);
        newTrip.save((err, addedTrip) => {
            if (err) res.send(err);
            else res.status(201).send(addedTrip);
        })
    });

tripRouter.route("/:id")
    .get((req, res) => {
        TripModel.findOne({ _id: req.params.id }, (err, foundTrip) => {
            if (err) return res.send(err);
            if (!foundTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(foundTrip);
        })
    })
    .delete((req, res) => {
        TripModel.findOneAndRemove({ _id: req.params.id }, (err, deletedTrip) => {
            if (err) return res.send(err);
            if (!deletedTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(`${deletedTrip.name} was deleted.`);
        })
    })
    .put((req, res) => {
        TripModel.findOneAndUpdate({ _id: req.params.id }, req.body, { returnNewDocument: true }, (err, updatedTrip) => {
            if (err) return res.send(err);
            if (!updatedTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedTrip);
        });
    })
tripRouter.route("/:id/add-destination")
    .post((req, res) => {
        TripModel.findOneAndUpdate({ _id: req.params.id }, { $push: req.body }, { new: true }, (err, updatedTrip) => {
            if (err) return res.send(err);
            if (!updatedTrip) return res.status(404).send({ message: `${req.params.id} Not found`});
            res.status(200).send(updatedTrip);
        })
    })


module.exports = tripRouter;