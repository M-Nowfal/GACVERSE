import CourseInfoCard from "@/components/cards/CourseInfoCard";
import LessonAccordion from "@/components/cards/LessonAccordion";
import Error from "@/components/common/Error";
import { SpinnerLoader } from "@/components/common/Loader";
import StarRatings from "@/components/common/StarRatings";
import { Accordion } from "@/components/ui/accordion";
import { useFetchData, useReactRouter, useScroll } from "@/hooks";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useUserStore } from "@/store";
import { formatDuration, totalLectures } from "@/utils/helpers";
import { useEffect, useState, type JSX } from "react";

const CourseEnrollment = (): JSX.Element | null => {
  useScroll();
  const { params: { id } } = useReactRouter();
  const { user } = useUserStore();
  const { data, error, loading, reFetchData } = useFetchData(`/course/${id}`);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState<boolean>(false);

  useMetaTags({
    title: data?.course?.title,
    description: data?.course?.description,
    keywords: data?.course?.category,
  });

  useEffect(() => {
    if (data?.course && user !== null) {
      const enrolledCourses = user?.details?.student?.enrolledCourses || [];
      const enrolled = enrolledCourses.some((course) =>
        course.course._id === data.course._id
      );
      setIsAlreadyEnrolled(enrolled);
    }
  }, [data]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <SpinnerLoader size={60} color="blue" />
      </div>
    );

  if (error)
    return (
      <Error
        resource="courses"
        error={error}
        onRetry={reFetchData}
      />
    );

  if (!data?.course) return null;

  const {
    _id: courseid, title, description, thumbnail,
    rating, reviews, duration,
    lessons, instructor, category,
    whatsInTheCourse, noOfEnrollment
  } = data.course;

  const courseInfo = {
    thumbnail, title, category,
    rating, duration, courseid,
    lessons, whatsInTheCourse,
    isAlreadyEnrolled, setIsAlreadyEnrolled
  };

  return (
    <div className="my-25 flex flex-col gap-10 mx-3">
      {data && (
        <div className="flex flex-col lg:flex-row gap-10 lg:mx-3">
          <div className="flex flex-col gap-5 sm:w-xl lg:w-[60%] xl:w-[70%] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold max-w-5xl">{title}</h1>
            <p className="text-muted-foreground max-w-5xl">{description}</p>

            <div className="lg:hidden flex flex-col gap-2 border pb-5 rounded-xl shadow w-full my-5">
              <CourseInfoCard {...courseInfo} />
            </div>

            <div className="flex flex-col text-muted-foreground gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span>{rating}</span>
                <StarRatings rating={rating} />
                <span className="text-sky-600">({reviews.length} ratings)</span>
                <span>{noOfEnrollment.toLocaleString()} Students</span>
              </div>
              <p>
                Course by{" "}
                <span className="text-sky-600 underline underline-offset-2">
                  {instructor?.name ?? "Unknown Instructor"}
                </span>
              </p>
            </div>

            <div className="mt-7">
              <h2 className="text-xl font-semibold mb-5">Course Structure</h2>
              <div className="flex items-center gap-2 my-3 font-medium">
                <span>{lessons.length} Lessons - </span>
                <span>{totalLectures(lessons)} Lectures - </span>
                <span>{formatDuration(duration)}</span>
              </div>
              <Accordion
                type="multiple"
                className="w-full max-w-5xl space-y-2"
              >
                {lessons.map((lesson: Lesson) => (
                  <LessonAccordion key={lesson._id} lesson={lesson} />
                ))}
              </Accordion>
            </div>
          </div>

          <div className="hidden sticky top-25 lg:flex flex-col gap-2 border pb-5 rounded-xl shadow w-full h-fit sm:w-lg lg:w-[40%] xl:w-[30%]">
            <CourseInfoCard {...courseInfo} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollment;
