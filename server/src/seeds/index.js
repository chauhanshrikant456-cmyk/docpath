import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Application from '../models/Application.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Application.deleteMany({});

    const demoUser = await User.create({
      fullName: 'Demo User',
      email: 'demo@docpath.local',
      password: 'Demo@12345',
      role: 'user'
    });

    const adminUser = await User.create({
      fullName: 'Admin User',
      email: 'admin@docpath.local',
      password: 'Admin@12345',
      role: 'admin'
    });

    const applications = await Application.insertMany([
      { name: 'Scholarship Application', category: 'Scholarship', deadline: new Date('2026-12-31') },
      { name: 'College Admission', category: 'Admission', deadline: new Date('2026-06-30') },
      { name: 'Government Scheme', category: 'Government', deadline: new Date('2026-09-30') }
    ]);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
