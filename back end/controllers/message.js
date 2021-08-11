const db = require("../models");
const Message = db.Message;
const jwt = require("jsonwebtoken"); 

const fs = require("fs");


const decodeId = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  return {
      id: decodedToken.userId,
  };
};

exports.create = async (req, res, _) => {
  const user = decodeId(req.headers.authorization);

  const post = await db.Message.create({
    include: [
      {
        model: db.User,
      },
    ],
    content: req.body.content,
    userId: user.id,
    attachment: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  })
    .then(() => {
      res.status(201).json({ message: "Message créée." });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Récupération de tous les messages
exports.getAllMessage = (req, res, _) => {
  Message.findAll()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneMessage = (req, res, _) => {
  Message.findOne({ where: { id: req.params.id }})
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Supprimer un message
exports.deleteOneMessage = (req, res, next) => {
Message.destroy({ where: { id: req.params.id } })
    .then(() =>
      res
        .status(200)
        .json({ message: "Message supprimé" })
    )
    .catch((error) => res.status(500).json({ error }));
};
