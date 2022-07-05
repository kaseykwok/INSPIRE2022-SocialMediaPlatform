const db = require("../models");
const UserFollow = db.userfollow;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.followUserId || !req.body.userId) {
      res.status(400).send();
      return;
    }
  
    const userfollow = {
        userId: req.body.userId,
        followUserId: req.body.followUserId
    };
  
    UserFollow.create(userfollow)
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

exports.getFollowState = (req, res) => {
    UserFollow.findOne({
        where: {
            userId: req.params.userId,
            followUserId: req.params.followUserId
        }
    }).then( data => {
        if (data) {
            res.send({ following: true });
        } else {
            res.send({ following: false });
        }
    }).catch( err => {
        res.status(500).send();
    })
}

exports.unfollow = (req, res) => {
    UserFollow.destroy({
        where: {
            userId: req.params.userId,
            followUserId: req.params.followUserId
        },
    })
    .then(response => {
        res.send({ message: `Unfollowed` });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while unfollowing."
        });
    });
}

// exports.getAllBlogsByUserId = (req, res) => {
//   const userId = req.params.userId

//   Blogs.findAll({ 
//     where:{
//       userId: userId
//     },
//     order: [
//       ['createdAt', 'DESC']
//     ],
//     include: [{ 
//       model: db.users,
//       attributes: {
//         exclude: ['password']
//       },
//     }]
//   }).then( data => {
//       if (data) {
//           res.send(data);
//       } else {
//           res.status(404).send();
//       }
//   }).catch( err => {
//     res.status(500).send();
//   })
// };

// exports.getAllBlogsByUsername = (req, res) => {
//   const username = req.params.username

//   Blogs.findAll({ 
//     order: [
//       ['createdAt', 'DESC']
//     ],
//     include: [{ 
//       model: db.users,
//       attributes: {
//         exclude: ['password']
//       },
//       where: {username: username} 
//     }]
//   }).then( data => {
//       if (data) {
//           res.send(data);
//       } else {
//           res.status(404).send();
//       }
//   }).catch( err => {
//     res.status(500).send();
//   })
// };

// exports.getBlogById = (req, res) => {
//     const id = req.params.id

//     Blogs.findByPk(id).then(data => {
//         if (data) {
//             res.send(data);
//         } else {
//             res.status(404).send({
//                 message: 'No blog found'
//             });
//         }
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: "Error retrieving user"
//         });
//     })
// };

// exports.getUserByUsername = (req, res) => {
//     Users.findOne({ where: { 
//         username: req.params.username,
//     }})
//     .then(data => {
//         if(data) {
//             res.send(data)
//         } else {
//             res.status(404).send()
//         }
//     })
//     .catch(err => {
//         res.status(500).send()
//         console.log('back', err)
//     })
// }

// Update a Tutorial by the id in the request

