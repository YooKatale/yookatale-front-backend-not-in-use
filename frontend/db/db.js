import mongoose from 'mongoose';

const mongoDBUri = process.env.MONGODB_URI;

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const submissionSchema = new mongoose.Schema({
  motorcycle: String,
  bicycle: String,
  van: String,
});

const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

export { Submission };
