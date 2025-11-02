interface Lesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  order: number;
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
  createdAt: Date;
  updatedAt: Date;
}
