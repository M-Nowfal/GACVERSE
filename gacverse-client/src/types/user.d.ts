interface CourseProgress {
  course: Course;
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
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  role: "student" | "instructor" | "admin";
  avatar: string;
  email: string;
  phone: string;
  details: {
    student?: Student;
    instructor?: Instructor;
  };
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
