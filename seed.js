import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Company from './models/Company.js';
import Job from './models/Job.js';
import User from './models/User.js';
import JobApplication from './models/JobApplication.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Company.deleteMany({});
    await Job.deleteMany({});
    await User.deleteMany({});
    await JobApplication.deleteMany({});

    // Seed Companies
    const companies = await Company.insertMany([
      {
        name: 'myntra',
        email: 'mynt@gmail.com',
        image: 'https://res.cloudinary.com/dzle4ri31/image/upload/v1756358829/z1uusujprctc9ogqmkrt.jpg',
        password: await bcrypt.hash('password123', 10),
      },
      {
        name: 'flipkart',
        email: 'flip@gmail.com',
        image: 'https://res.cloudinary.com/dzle4ri31/image/upload/v1755919250/gq0galxj3uinuyxvlkhx.webp',
        password: await bcrypt.hash('password123', 10),
      },
    ]);

    console.log('Companies seeded');

    // Seed Jobs
    const jobs = await Job.insertMany([
      {
        title: 'ML Engineer',
        description: '<p>we need a fresher ml grad</p>',
        location: 'Hyderabad',
        category: 'Data Science',
        level: 'Senior level',
        salary: 44231,
        date: Date.now(),
        visible: true,
        companyId: companies[0]._id,
      },
      {
        title: 'Backend',
        description: `<p>We are seeking a highly motivated and detail-oriented Software Developer...</p>`,
        location: 'Bangalore',
        category: 'Programming',
        level: 'Beginner Level',
        salary: 6666,
        date: Date.now(),
        visible: true,
        companyId: companies[0]._id,
      },
    ]);

    console.log('Jobs seeded');

    // Seed Users
    const users = await User.insertMany([
      {
        clerkId: 'clerk123',
        name: 'Sipra Panda',
        email: 'sipra@gmail.com',
        resume: '',
        image: '',
      },
      {
        clerkId: 'clerk456',
        name: 'John Doe',
        email: 'john@gmail.com',
        resume: '',
        image: '',
      },
    ]);

    console.log('Users seeded');

    // Seed JobApplications
    await JobApplication.insertMany([
      {
        clerkId: users[0].clerkId,
        companyId: companies[0]._id,
        jobId: jobs[0]._id,
        status: 'pending',
        date: Date.now(),
      },
      {
        clerkId: users[1].clerkId,
        companyId: companies[1]._id,
        jobId: jobs[1]._id,
        status: 'pending',
        date: Date.now(),
      },
    ]);

    console.log('JobApplications seeded');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
