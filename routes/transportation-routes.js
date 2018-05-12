const express = require ('express');
const transportationRouter = express.Router();
const TransportationModel = require ('../routes/Transportation-route.js');

transportationRouter.route('/')
    .get((req, res) => {
        TransportationModel.find(req.body, (err, foundTransportation) => {
            if (err) res.send(err);
            else res.status(200).send(foundTransportation);
        })
    })
    .post((req, res) => {
        const newTransportation = new TransportationModel(req.body);
        newTransportation.save((err, addedTransportation) => {
            if (err) res.send(err);
            else res.status(201).send(addedTransportation);
        })
    });

transportationRouter.route('/:id')
    .get((req, res) => {
        TransportationModel.findOne({ _id: req.params.id}, (err, foundTransportation) => {
            if(err) return res.send(err);
            if(!foundTransportation) return res.status(404).send({ message: "Not found"});
            res.status(200).send(foundTransportation);
        })
    })
    .delete ((req, res) => {
        TransportationModel.findOneAndRemove({_id: req.params.id }, (err, deleteTransportation) => {
            if (err) return res.send(err);
            if (!deleteTransportation) return res.status(404).send({ message: 'Not found'});
            res.status(200).send(`${deleteTransportation.name} was deleted.`);
        })
    })
    .put ((req, res) => {
        TransportationModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updateTransportation) => {
            if (err) return res.send(err);
            if (!updateTransportation) return res.status(404).send({ message: 'Not found'});
        });
    });
    module.export = transportationRouter;