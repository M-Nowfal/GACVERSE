import { BookOpenText, Clock, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, type JSX } from "react";
import { Badge } from "../ui/badge";
import { useMutateData } from "@/hooks";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import { SpinnerLoader } from "../common/Loader";

interface CourseInfoCardProps {
  courseid: string;
  thumbnail: string;
  title: string;
  category: string,
  rating: number;
  duration: string;
  lessons: Array<any>;
  whatsInTheCourse: Array<string>;
  isAlreadyEnrolled: boolean;
  setIsAlreadyEnrolled: (val: boolean) => void;
}

const CourseInfoCard = ({
  thumbnail, title, rating, category,
  courseid, duration, lessons,
  whatsInTheCourse, isAlreadyEnrolled, setIsAlreadyEnrolled
}: CourseInfoCardProps): JSX.Element => {
  const { data, error, loading, mutate } = useMutateData();
  const { user, setUser } = useUserStore();

  const handleEnrollNow = () => {
    try {
      if (user !== null)
        mutate(`/user/student/enroll/${courseid}`, { id: user._id });
      else 
        toast.warning("Login to enroll a course");
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "Failed to enroll in course";
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    if (data && !loading && !error && data.updatedStudent) {
      setUser(data.updatedStudent);
      toast.success(data.message);
      setIsAlreadyEnrolled(true);
    } else if (error) {
      toast.warning(error);
    }
  }, [data, error]);

  return (
    <>
      <figure className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="rounded-t-xl h-60 w-full object-cover"
        />
        <figcaption>
          <Badge className="absolute top-3 right-3">{category}</Badge>
        </figcaption>
      </figure>
      <div className="flex flex-col gap-2 mx-5">
        <span className="font-semibold text-purple-600 text-2xl">Free</span>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Star className="fill-yellow-400 text-yellow-500 size-5" /> {rating} |
          <Clock className="size-5" /> {duration.split(":")[0]} hour |
          <BookOpenText className="size-5" /> {lessons.length} lessons
        </div>
        <Button
          variant="primary"
          className="my-3"
          onClick={handleEnrollNow}
          disabled={loading || isAlreadyEnrolled}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              Enrolling <SpinnerLoader color="white" />
            </span>
          ) : isAlreadyEnrolled ? "Enrolled" : "Enroll Now"}
        </Button>
        <h3 className="text-xl font-semibold">What&apos;s in the course?</h3>
        <ol className="text-muted-foreground list-disc ms-5">
          {whatsInTheCourse.map((whats: string, i: number) => (
            <li key={i}>{whats}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default CourseInfoCard;
