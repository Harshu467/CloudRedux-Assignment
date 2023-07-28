const { success } = require("../Helper/Response");
const User = require("../Model/User");
const VirtualEvent = require("../Model/Event");

exports.createVirtualEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, virtualLocation } = req.body;
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: true, message: "User does not exist" });
    }

    const virtualEvent = await VirtualEvent.create({
      organizer: user._id,
      title,
      description,
      date,
      time,
      virtualLocation,
    });

    return res.status(200).json(success("Virtual event created successfully", virtualEvent));
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};
exports.rsvpVirtualEvent = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const virtualEvent = await VirtualEvent.findById(eventId);
  
      if (!virtualEvent) {
        return res.status(400).json({ error: true, message: "Virtual event does not exist" });
      }
  
      // Check if the user is already registered for the virtual event
      const isUserRegistered = virtualEvent.participants.includes(userId);
      if (isUserRegistered) {
        return res
          .status(400)
          .json({ error: true, message: "You are already registered for this virtual event" });
      }
  
      // Add the user to the participants list of the virtual event
      virtualEvent.participants.push(userId);
      await virtualEvent.save();
  
      return res.status(200).json(success("You have successfully RSVP'd to the virtual event"));
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };

  exports.getAllVirtualEvents = async (req, res, next) => {
    try {
      const virtualEvents = await VirtualEvent.find();
  
      return res.status(200).json(success("Here are all virtual events", virtualEvents));
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };
    
  exports.getVirtualEventDetails = async (req, res, next) => {
    try {
      const { eventId } = req.params;
      const virtualEvent = await VirtualEvent.findById(eventId);
  
      if (!virtualEvent) {
        return res.status(400).json({ error: true, message: "Virtual event does not exist" });
      }
  
      return res.status(200).json(success("Virtual event details", virtualEvent));
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  };
  
// Other controller functions...

// Controller function for participating (RSVP) in a virtual event
exports.participateInEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.user; // Assuming you have set the authenticated user's ID in the request object through middleware

    // Find the virtual event by ID
    const virtualEvent = await VirtualEvent.findById(eventId);

    if (!virtualEvent) {
      return res.status(404).json({ error: true, message: 'Virtual event not found' });
    }

    // Check if the user has already participated in the event
    const isUserParticipating = virtualEvent.participants.includes(userId);

    if (isUserParticipating) {
      return res.status(400).json({ error: true, message: 'You have already participated in this event' });
    }

    // Add the user's ID to the participants array of the virtual event
    virtualEvent.participants.push(userId);

    // Save the updated virtual event
    await virtualEvent.save();

    return res.status(200).json({ success: true, message: 'Successfully participated in the event' });
  } catch (error) {
    res.status(500).json({ error: true, message: 'Something went wrong' });
  }
};

  