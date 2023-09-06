const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//use user and thought routes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

//export router
module.exports = router;
