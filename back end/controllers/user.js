const bcrypt = require("bcrypt"); // Hashage de passwords //
const jwt = require("jsonwebtoken"); // Sécurisation de la connection grâce à des tokens uniques //

const { User } = require("../models/index"); // Importation du modèle User //

exports.signup = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    isAdmin: false,
  });
}; 

// Pour que l'utilisateur se connecte
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
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
