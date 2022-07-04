const db = require("../models");
const Entrepreneurship = db.entrepreneurship;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (req.body.title == '' || req.body.userId === -1) {
      res.status(400).send();
      return;
    }
  
    const entrepreneurship = {
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL,
        targetAmount: req.body.targetAmount,
        userId: req.body.userId
    };
  
    Entrepreneurship.create(entrepreneurship)
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

exports.getAllEntrepreneurship = (req, res) => {
    Entrepreneurship.findAll({
        include: [{
            model: db.users,
            attributes: ['id', 'name', 'username']
        }]
    }).then( data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send();
        }
    }).catch( err => {
    res.status(500).send();
    })
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
exports.update = (req, res) => {
  
};
