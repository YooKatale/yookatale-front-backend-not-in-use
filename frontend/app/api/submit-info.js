import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://bigmosi:bigmosi@note.spembms.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const submissionSchema = new mongoose.Schema({
  motorcycle: String,
  bicycle: String,
  van: String,
});

const Submission = mongoose.model('Submission', submissionSchema);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = JSON.parse(req.body);

      const newSubmission = new Submission(data);

      // Save the submission to the database
      await newSubmission.save();

      // Respond with a success message
      res.status(200).json({ message: 'Data submitted successfully' });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  } else {
    res.status(405).end();
  }
}
