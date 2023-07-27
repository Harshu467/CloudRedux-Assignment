const { register, login } = require("../Controller/AuthController");
const {createVirtualEvent, rsvpVirtualEvent, getAllVirtualEvents, getVirtualEventDetails} = require("../Controller/EventController");
const router = require("express").Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/createVirtualEvent/:userId").post(createVirtualEvent);
router.route("/rsvpVirtualEvent/:eventId/:userId").post(rsvpVirtualEvent);
router.route("/getAllVirtualEvents").get(getAllVirtualEvents);

module.exports = router;