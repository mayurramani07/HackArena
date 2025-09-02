const transporter = require("../utils/mailer");

const sendFeedback = async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const mailOptions = {
      from: email || "no-reply@hackarena.com",
      to: "ramanim164@gmail.com", 
      subject: "New HackArena Feedback",
      html: `
        <h2>New Feedback Received</h2>
        <p><b>Name:</b> ${name || "Anonymous"}</p>
        <p><b>Email:</b> ${email || "Not provided"}</p>
        <p><b>Feedback:</b></p>
        <blockquote>${feedback}</blockquote>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send feedback" });
  }
};

module.exports = { sendFeedback };
