const express = require('express');
const router = express.Router();
const user = require("../../Controllers/user");

router.route("/createUser").post(user.createUser);
router.route("/updateUser/:userId").post(user.updateUser);
router.route("/deleteUser/:userId").delete(user.deleteUser);
router.route("/getUserById/:userId").get(user.getUserById);
router.route("/getUsers").get(user.getUsers);
router.route("/userLogin").post(user.userLogin);
router.route("/logout").get(user.logout);


module.exports = router;