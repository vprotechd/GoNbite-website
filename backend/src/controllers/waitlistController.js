import Waitlist from "../models/Waitlist.js";

export async function joinWaitlist(req, res) {
  try {
    const { name, mobile, email } = req.body;

    // Validation
    if (!name || !mobile || !email) {
      return res.status(400).json({
        message: "Name, mobile number and email are required.",
      });
    }

    const cleanName = name.trim();
    const cleanMobile = mobile.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      return res.status(400).json({
        message: "Please enter a valid name.",
      });
    }

    // Basic Indian mobile validation
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return res.status(400).json({
        message: "Please enter a valid 10-digit mobile number.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Check duplicate email
    const existing = await Waitlist.findOne({
      email: cleanEmail,
    });

    if (existing) {
      return res.status(409).json({
        message: "You're already on the GoNbite waitlist!",
      });
    }

    const waitlistEntry = await Waitlist.create({
      name: cleanName,
      mobile: cleanMobile,
      email: cleanEmail,
    });

    return res.status(201).json({
      message:
        "You're on the GoNbite waitlist! Your ₹100 launch offer is waiting.",
      data: waitlistEntry,
    });
  } catch (error) {
    // Handle MongoDB duplicate-key race condition
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You're already on the GoNbite waitlist!",
      });
    }

    console.error("Waitlist error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
}