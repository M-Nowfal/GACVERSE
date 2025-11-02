export {
  login, logout, signup, getCurrentAuth
} from "./auth.controller";

export {
  getFeaturedCourses, getAllCourses,
  getSingleCourse, addCourse,
  deleteCourse, updateCourse
} from "./course.controller";

export {
  getFeaturedReviews, getAllReviews,
  addReview, updateReview, deleteReview
} from "./review.controller";
