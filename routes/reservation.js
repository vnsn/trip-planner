const express = require("express");
const tripRouter = express.Router();
constreservationModel = require("../models/trip-model");

tripRouter.route("/")
    .get((req, res) => {
       reservationModel.find(req.query, (err, foundTrip) => {
            if (err) res.send(err);
            else res.status(200).send(foundTrip);
        })
    })
    .post((req, res) => {
        const newTrip = newreservationModel(req.body);
        newTrip.save((err, addedTrip) => {
            if (err) res.send(err);
            else res.status(201).send(addedTrip);
        })
    });

tripRouter.route("/:id")
    .get((req, res) => {
       reservationModel.findOne({ _id: req.params.id }, (err, foundTrip) => {
            if (err) return res.send(err);
            if (!foundTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(foundTrip);
        })
    })
    .delete((req, res) => {
       reservationModel.findOneAndRemove({ _id: req.params.id }, (err, deletedTrip) => {
            if (err) return res.send(err);
            if (!deletedTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(`${deletedTrip.name} was deleted.`);
        })
    })
    .put((req, res) => {
       reservationModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedTrip) => {
            if (err) return res.send(err);
            if (!updatedTrip) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedTrip);
        });
    })


module.exports = tripRouter;