const bcrypt = require("bcrypt"); // Hashage de passwords //
const jwt = require("jsonwebtoken"); // Sécurisation de la connection grâce à des tokens uniques //

const { User } = require("../models/index"); // Importation du modèle User //

const decodeId = (token) => {
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  return {
    id: decodedToken.userId,
  };
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user !== null) {
      if (user.pseudo === req.body.pseudo) {
        return res.status(400).json({ error: "ce pseudo est déjà utilisé" });
      }
    } else {
    bcrypt
      .hash(req.body.password, 10) // Permet le hashage du mot de passe
      .then((hash) => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
} catch (error) {
  return res.status(400).send({ error: "email déjà utilisé" });
}
}


// Pour que l'utilisateur se connecte
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
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
            userId: user.id,
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.delete = (req, res, next) => {
  const user = decodeId(req.headers.authorization);
  console.log(user);
  User.destroy({ where: { id: user.id } })
    .then(() =>
      res
        .status(200)
        .json({ message: "Utilisateur supprimé de la base de données" })
    )
    .catch((error) => res.status(500).json({ error }));
};