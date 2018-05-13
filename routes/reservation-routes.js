const express = require("express");
const reservationRouter = express.Router();
const ReservationModel = require("../models/reservation-model");

reservationRouter.route("/")
    .get((req, res) => {
       ReservationModel.find(req.query, (err, foundReservation) => {
            if (err) res.send(err);
            else res.status(200).send(foundReservation);
        })
    })
    .post((req, res) => {
        const newReservation = new ReservationModel(req.body);
        newReservation.save((err, addedReservation) => {
            if (err) res.send(err);
            else res.status(201).send(addedReservation);
        })
    });

reservationRouter.route("/:id")
    .get((req, res) => {
       ReservationModel.findOne({ _id: req.params.id }, (err, foundReservation) => {
            if (err) return res.send(err);
            if (!foundReservation) return res.status(404).send({ message: "Not found" });
            res.status(200).send(foundReservation);
        })
    })
    .delete((req, res) => {
       ReservationModel.findOneAndRemove({ _id: req.params.id }, (err, deletedReservation) => {
            if (err) return res.send(err);
            if (!deletedReservation) return res.status(404).send({ message: "Not found" });
            res.status(200).send(`${deletedReservation.name} was deleted.`);
        })
    })
    .put((req, res) => {
       ReservationModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedReservation) => {
            if (err) return res.send(err);
            if (!updatedReservation) return res.status(404).send({ message: "Not found" });
            res.status(200).send(updatedReservation);
        });
    })


module.exports = reservationRouter;