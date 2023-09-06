const router = require("express").Router();
//const for thought CRUDs
const {
  getThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtCRUDs");

//api/thoughts
router.route("/").get(getThoughts).post(createThought);

//api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

//reactions api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);
//single reaction api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

//export router
module.exports = router;
