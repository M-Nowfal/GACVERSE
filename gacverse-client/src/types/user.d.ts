interface CourseProgress {
  course: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: Date;
}

interface Student {
  roll_no: string;
  year: string;
  degree: string;
  major: string;
  semester: number;
  enrolledCourses: CourseProgress[];
}

interface Instructor {
  experience: number;
  courses: string[];
  expertIn: string;
  bio: string;
}

interface User {
  name: string;
  firstName: string;
  lastName: string;
  role: "student" | "instructor" | "admin";
  avatar: string;
  email: string;
  phone: string;
  details: Student | Instructor;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
