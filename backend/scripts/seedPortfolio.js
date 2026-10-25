require('dotenv').config();
const connectDB = require('../config/db');
const Content = require('../models/Content');
const projects = require('./projects.json');

const initialContent = [
  {
    type: 'general', slug: 'site-profile', title: 'Site Profile', status: 'published',
    data: {
      name: 'Khalid Saifee', role: 'Full Stack Web Developer',
      email: 'saifeekhaled1212@example.com',
      github: 'https://github.com/khaledsafee43',
      linkedin: 'https://www.linkedin.com/in/khaled-saifee-712703389',
      telegram: 'https://t.me/kh_12343'
    }
  },
  {
    type: 'home', slug: 'home-hero', title: 'Home Hero', status: 'published',
    data: {
      eyebrow: 'WELCOME TO MY PORTFOLIO',
      title: 'Full Stack Web Developer',
      description: 'I build responsive, accessible, and practical web applications using modern frontend and backend technologies.',
      primaryButtonText: 'View Projects', secondaryButtonText: 'Contact Me'
    }
  },
  {
    type: 'about', slug: 'about-profile', title: 'About Me', status: 'published',
    data: {
      title: 'About Me',
      description: 'I am a full-stack web developer focused on building useful, responsive web experiences and learning through real-world projects.',
      location: 'Herat, Afghanistan', availability: 'Available for remote projects'
    }
  },
  {
    type: 'skills', slug: 'core-skills', title: 'Core Skills', status: 'published',
    data: { skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'Git', 'GitHub'] }
  },
  {
    type: 'services', slug: 'services-list', title: 'Services', status: 'published',
    data: { services: [
      { title: 'Frontend Development', description: 'Responsive interfaces with React and Tailwind CSS.' },
      { title: 'Backend Development', description: 'REST APIs, authentication, and database integration.' },
      { title: 'Full-Stack Applications', description: 'End-to-end web applications with practical workflows.' },
      { title: 'Website Maintenance', description: 'Bug fixes, improvements, and responsive refinements.' }
    ] }
  },
  ...projects.map((project) => ({
    type: 'projects', slug: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    title: project.title, status: 'published', data: project
  }))
];

async function seedPortfolio() {
  await connectDB();
  for (const item of initialContent) {
    await Content.updateOne(
      { type: item.type, slug: item.slug },
      { $setOnInsert: item },
      { upsert: true }
    );
  }
  console.log(`Portfolio seed complete. Checked ${initialContent.length} content records.`);
  console.log('Existing records were not overwritten. You can edit the seeded records from the admin panel.');
  process.exit(0);
}

seedPortfolio().catch((error) => {
  console.error(`Portfolio seed failed: ${error.message}`);
  process.exit(1);
});
