interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
  duration: string;
  order: number;
  description: string;
}

interface Lesson {
  _id: string;
  title: string;
  lectures: [Lecture];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: User;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
  noOfEnrollment: number;
  tags: string[];
  lessons: Lesson[];
  whatsInTheCourse: string[];
  createdAt: Date;
  updatedAt: Date;
}
