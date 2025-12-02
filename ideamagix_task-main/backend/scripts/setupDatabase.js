import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// User Schema (inline for script)
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  phone: String,
  expertise: String,
  profilePicture: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // Delete existing admin
    await User.deleteMany({ email: { $in: ['admin@example.com', 'admin@ideamagix.com', 'ideamagix@admin'] } });
    console.log('🗑️  Cleared old admin accounts');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin@123', salt);

    // Create admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'ideamagix@admin',
      password: hashedPassword,
      role: 'admin',
      phone: '+1-234-567-8900',
      expertise: 'System Administrator',
      profilePicture: '',
    });

    console.log('✅ Admin created successfully! ');
    console.log('   📧 Email: ideamagix@admin');
    console.log('   🔑 Password: admin@123');
    console.log('   👤 Role:', admin.role);
    console.log('');

    // Delete old instructors
    await User.deleteMany({ role: 'instructor' });
    console.log('🗑️  Cleared old instructor accounts');

    // Create sample instructors (You can change the details)
    const hashedInstructorPass = await bcrypt.hash('instructor123', salt);

    const instructors = await User.insertMany([
      {
        name: 'Instructor One',      
        email: 'instructor1@gmail.com',
        password: hashedInstructorPass,
        role: 'instructor',
        phone: '9876543210',
        expertise: 'Web Development',
        profilePicture: '',
      },
      {
        name: 'Instructor Two',
        email: 'instructor2@gmail.com',
        password: hashedInstructorPass,
        role: 'instructor',
        phone: '9876543211',
        expertise: 'Data Science',
        profilePicture: '',
      },
    ]);

    console.log('✅ Sample instructors created:');
    instructors.forEach(inst => {
      console.log(`   ${inst.name} - ${inst.email} (password: instructor123)`);
    });

    console.log('');
    console.log('🎉 Database setup complete!');
    console.log('');
    console.log('You can now login with:');
    console.log('👨‍💼 Admin: ideamagix@admin / admin@123');
    console.log('👨‍🏫 Instructor: instructor1@gmail.com / instructor123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

setupDatabase();
