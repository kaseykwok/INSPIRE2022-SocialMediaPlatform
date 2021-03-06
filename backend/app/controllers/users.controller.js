const { sequelize } = require("../models");
const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.dob) {
        res.status(400).send();
        return;
    }
  
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        dob: req.body.dob,
        occupation: req.body.occupation
    };
  
    Users.create(user)
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

exports.findAll = (req, res) => {
  
};

exports.getUserById = (req, res) => {
    const id = req.params.id

    Users.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: 'No user found'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving user"
        });
    })
};

exports.getUserByUsername = (req, res) => {
    Users.findOne({ where: { 
        username: req.params.username,
    }})
    .then(data => {
        if(data) {
            res.send(data)
        } else {
            res.status(404).send()
        }
    })
    .catch(err => {
        res.status(500).send()
    })
}

exports.searchUserByKeyword = (req, res) => {
    const keyword = req.params.keyword.toLowerCase()

    Users.findAll({
        where: {
            [Op.or]: [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + keyword + '%'),
                sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + keyword + '%')
            ]
        },
        attributes: {
            exclude: ['password']
        }
    }).then(data => {
        if(data) {
            res.send(data)
        } else {
            res.status(404).send()
        }
    })
    .catch(err => {
        res.status(500).send()
        console.log('back', err)
    })
}

exports.update = (req, res) => {
  
};

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.title) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//       return;
//     }
  
//     // Create a Tutorial
//     const tutorial = {
//       title: req.body.title,
//       description: req.body.description,
//       published: req.body.published ? req.body.published : false
//     };
  
//     // Save Tutorial in the database
//     Tutorial.create(tutorial)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Tutorial."
//         });
//       });
//   };
  
//   // Retrieve all Tutorials from the database.
//   exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
//     Tutorial.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
  
//   // Find a single Tutorial with an id
//   exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Tutorial with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
//   };
  
//   // Update a Tutorial by the id in the request
//   exports.update = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Tutorial with id=" + id
//         });
//       });
//   };
  
//   // Delete a Tutorial with the specified id in the request
//   exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id=" + id
//         });
//       });
//   };
  
//   // Delete all Tutorials from the database.
//   exports.deleteAll = (req, res) => {
//     Tutorial.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Tutorials were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all tutorials."
//         });
//       });
//   };
  
//   // find all published Tutorial
//   exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
