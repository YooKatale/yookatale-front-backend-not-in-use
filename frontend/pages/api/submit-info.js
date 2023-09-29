import { Submission } from '../../db/db.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const requestBody = req.body;
      console.log('Received request body:', requestBody);

      const data = JSON.parse(requestBody);

      const newSubmission = new Submission(data);

      await newSubmission.save();

      res.status(200).json({ message: 'Data submitted successfully' });
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  } else {
    res.status(405).end();
  }
}
