const path = require('path'); // ✅ Add this line
const fs = require('fs');
const nodemailer = require('nodemailer');
const PressRelease = require('../models/Press');
require('dotenv').config();

const postRelease = async (req, res) => {
  const { title, content } = req.body;
  const press = await new PressRelease({ title, content }).save();
  res.send({ message: 'Saved.', id: press._id });
};

const getRelease = async (_req, res) => {
  const releases = await PressRelease.find().sort({ date: -1 });
  res.send(releases);
};




const sendReleaseEmail = async (req, res) => {
  try {
    const { email, pdfBase64 } = req.body;
    const press = await PressRelease.findById(req.params.id);

    if (!press) return res.status(404).json({ error: 'Press release not found.' });

    // ✅ Ensure /tmp folder exists
    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    // ✅ Decode and save PDF as file
    const base64Data = pdfBase64.replace(/^data:application\/pdf;.*base64,/, '');
    const filePath = path.join(tmpDir, `${Date.now()}_press.pdf`);
    await fs.promises.writeFile(filePath, base64Data, 'base64');

    // ✅ Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS          // ✅ Gmail App Password (not account password)
      },
    });

    // ✅ Prepare email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `📢 ${press.title}`,
      text: press.content.replace(/<[^>]+>/g, ''), // plain version
      html: press.content, // styled version
      attachments: [
        {
          filename: 'press-release.pdf',
          path: filePath,
          contentType: 'application/pdf'
        }
      ],
    };

    // ✅ Send email
    transporter.sendMail(mailOptions, async (err, info) => {
      // 🧹 Clean up PDF file
      await fs.promises.unlink(filePath);

      if (err) {
        console.error('❌ Email failed:', err);
        return res.status(500).json({ error: 'Email failed to send.', details: err.message });
      }

      res.json({ message: '✅ Email sent successfully!' });
    });

  } catch (error) {
    console.error('❌ Unexpected error in sendReleaseEmail:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};



module.exports = { postRelease, getRelease, sendReleaseEmail };
