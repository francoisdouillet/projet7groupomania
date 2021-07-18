const User = require("../models/User");

// Permet d'échanger des jetons d'authentification pour la sécurité d'authentification
const jwt = require("jsonwebtoken");

// Permet de crypter le mot de passe de l'utilisateur
const bcrypt = require("bcrypt");

// Permet de crypter l'email
var CryptoJS = require("crypto-js");

const sequelize = require("sequelize");


// Pour que l'utilisateur s'inscrive
exports.signup = async (req, res, next) => {
  await sequelize.USER.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }).then(() => {
    res.status(201).json({
      message: "Utilisateur bien crée",
    })
  }
  );
}; 

// Pour que l'utilisateur se connecte
exports.login = (req, res, next) => {
  User.findOne({ email: CryptoJS.MD5(req.body.email).toString() })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
