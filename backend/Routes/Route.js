const { register, login } = require("../Controller/AuthController");
const {createVirtualEvent, rsvpVirtualEvent, getAllVirtualEvents, getVirtualEventDetails,participateInEvent} = require("../Controller/EventController");
const router = require("express").Router();


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/createVirtualEvent/:userId").post(createVirtualEvent);
router.route("/rsvpVirtualEvent/:eventId/:userId").post(rsvpVirtualEvent);
router.route("/getAllVirtualEvents").get(getAllVirtualEvents);
router.post('/participateInEvent/:eventId', participateInEvent);
module.exports = router;