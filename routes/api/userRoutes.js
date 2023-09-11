const router = require("express").Router();
//create const for user CRUDs
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userCRUDs");

//api users
router.route("/").get(getUsers).post(createUser);

// api/users/:userId
router.route("/userId").get(getUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

//export router
module.exports = router;
