const db = require("../models");
const UserLike = db.userlike;
const Op = db.Sequelize.Op;

exports.like = (req, res) => {
    if (!req.body.blogId || !req.body.userId) {
      res.status(400).send();
      return;
    }
  
    const userlike = {
        userId: req.body.userId,
        blogId: req.body.blogId
    };
  
    UserLike.create(userlike)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while registering the use."
        });
      });
};

exports.getLikeState = (req, res) => {
    UserLike.findOne({
        where: {
            userId: req.params.userId,
            blogId: req.params.blogId
        }
    }).then( data => {
        if (data) {
            res.send({ liked: true });
        } else {
            res.send({ liked: false });
        }
    }).catch( err => {
        res.status(500).send();
    })
}

exports.unlike = (req, res) => {
    UserLike.destroy({
        where: {
            userId: req.params.userId,
            blogId: req.params.blogId
        },
    })
    .then(response => {
        res.send({ message: `Unliked` });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while unfollowing."
        });
    });
}

exports.getLikeCount = (req, res) => {
    const blogId = req.params.blogId

    UserLike.count({
        where: {
            blogId: blogId
        }
    }).then(data => {
        res.send({"likeCount": data})
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving like count"
        });
    })
}