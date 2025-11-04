export { UserDocument } from "./user";
export { ReviewDocument } from "./review";
export { CourseDocument } from "./course";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      }
    }
  }
}
