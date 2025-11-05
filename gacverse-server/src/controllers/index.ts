export {
  login, logout, 
  signup, getCurrentAuth,
  sendOtp, verifyOtp
} from "./auth.controller";

export {
  getFeaturedCourses, getCourses,
  getSingleCourse, addCourse,
  deleteCourse, updateCourse
} from "./course.controller";

export {
  getFeaturedReviews, getReviews,
  addReview, updateReview, deleteReview
} from "./review.controller";
