import { Clock } from "lucide-react";
import StarRatings from "@/components/common/StarRatings";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Profile from "@/components/common/Profile";
import type { JSX } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }: { course: Course }): JSX.Element => {
  const {
    thumbnail, title, category,
    instructor, rating, reviews,
    duration
  } = course;

  return (
    <Link to={`/course/${course._id}`} viewTransition className="cursor-default">
      <Card className="hover:-translate-y-1 group overflow-hidden relative">
        <figure className="group">
          <img
            src={thumbnail}
            alt={title}
            className="rounded-t-xl group-hover:scale-105 w-full h-50 sm:h-40 lg:h-50 object-cover object-center transition-all duration-300"
          />
          <figcaption className="mt-5 text-xl font-bold">
            <CardHeader className="cursor-default">
              <CardTitle className="line-clamp-1 text-start pb-0.5">{title}</CardTitle>
            </CardHeader>
          </figcaption>
        </figure>

        <CardContent className="flex flex-col gap-2 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Profile avatar={instructor.avatar} fallBack="NA" />
                <div>
                  <span className="font-semibold line-clamp-1">{instructor.name}</span>
                  <span className="font-normal text-sm text-muted-foreground line-clamp-1">{(instructor.details as Instructor).expertIn}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span>{rating}</span>
                <StarRatings rating={rating} />
                <span>({reviews?.length.toLocaleString()})</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-muted-foreground" />
              <span className="text-sm">{duration}</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg text-purple-600 font-semibold">Free</span>
            </div>
            <div className="bg-blue-500/20 py-0.1 px-2 rounded-full shadow">
              <h2 className="text-sm font-semibold text-purple-900 dark:text-white line-clamp-1">
                {category}
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CourseCard;
