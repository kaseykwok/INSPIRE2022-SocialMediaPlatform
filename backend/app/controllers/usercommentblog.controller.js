const db = require("../models");
const UserCommentBlog = db.usercommentblog;
const Op = db.Sequelize.Op;

exports.comment = (req, res) => {
    if (!req.body.blogId || !req.body.userId || req.body.comment === "") {
      res.status(400).send();
      return;
    }
  
    const userComment = {
        userId: req.body.userId,
        blogId: req.body.blogId,
        comment: req.body.comment
    };
  
    UserCommentBlog.create(userComment)
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

exports.getAllCommentsByBlogId = (req, res) => {
    const blogId = req.params.blogId

    UserCommentBlog.findAll({
        where: {
            blogId: blogId
        },
        order: [
            ['createdAt', 'ASC']
        ],
        include: [{ 
            model: db.users,
            attributes: ['id', 'name', 'username']
        }]
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({ message : "No comments found" });
        }
    }).catch( err => {
        res.status(500).send({ message : "Error in getting comments"});
    })
}

exports.deleteComment = (req, res) => {
    const id = req.params.id

    UserCommentBlog.destroy({
        where: {
            id: id
        },
    })
    .then(response => {
        res.send({ message: `Comment deleted` });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while deleting comments."
        });
    });
}

exports.getCommentCount = (req, res) => {
    const blogId = req.params.blogId

    UserCommentBlog.count({
        where: {
            blogId: blogId
        }
    }).then(data => {
        res.send({"commentCount": data})
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving comment count"
        });
    })
}