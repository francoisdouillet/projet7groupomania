const db = require("../models");
const Message = db.Message;

const fs = require("fs");

exports.create = async (req, res, _) => {

  const post = await db.Message.create({
    include: [
      {
        model: db.User,
      },
    ],
    content: req.body.content,
    attachment: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    id: idUsers,
  })
    .then(() => {
      res.status(201).json({ message: "Message créée." });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/*exports.create = (req, res) => {
  const tutorial = {
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    attachment: req.body.attachment,
  };

  // Save Tutorial in the database
  Message.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
}; */

exports.findAll = (req, res) => {
  Message.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500).send({
        message: err.message || "Some error accurred while retrieving books.",
      });
    });
};
// Récupération de tous les messages
exports.getAllMessage = (req, res, _) => {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Récupération d'un seul messsage
exports.getOneMessage = (req, res, _) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Supprimer un message
exports.deleteOneMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => {
      const filename = message.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Message.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un message
exports.modifyOneMessage = (req, res, _) => {
  const messageObject = req.file
    ? {
        ...JSON.parse(req.body.message),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Message.updateOne(
    { _id: req.params.id },
    { ...messageObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Message modifiée." }))
    .catch((error) => res.status(400).json({ error }));
};
