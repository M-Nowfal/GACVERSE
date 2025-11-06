import Error from "@/components/common/Error";
import { SpinnerLoader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useFetchData, useReactRouter } from "@/hooks";
import { BookOpenText, Clock, Star } from "lucide-react";

const CourseEnrollment = () => {
  const { params: { id } } = useReactRouter();
  const { data, error, loading, reFetchData } = useFetchData(`/course/${id}`);
  console.log(data)
  return (
    <div className="my-25 flex flex-col gap-10 mx-3">
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerLoader size={60} color="blue" />
        </div>
      ) : error ? (
        <Error
          resource="courses"
          error={error}
          onRetry={reFetchData}
        />
      ) : (
        data && <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{data.course.title}</h1>
          </div>
          <div className="flex flex-col gap-2 border pb-5 rounded-xl shadow">
            <figure>
              <img
                src={data.course.thumbnail}
                alt={data.course.title}
                className="rounded-t-xl h-60 w-full object-cover"
              />
              <figcaption hidden>{data.course.title}</figcaption>
            </figure>
            <div className="flex flex-col gap-2 mx-3">
              <span className="font-semibold text-purple-600 text-2xl">Free</span>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Star className="fill-amber-600 text-amber-700 size-5" /> {data.course.rating} |
                <Clock className="size-5" /> {data.course.duration} |
                <BookOpenText className="size-5" /> {data.course.lessons.length} lessons
              </div>
              <Button
                variant="primary"
                className="my-3"
              >
                Enroll Now
              </Button>
              <h3 className="text-xl font-semibold">What's in the course?</h3>
              <ol className="text-gray-700 list-disc ms-5">
                <li> Lifetime access with free updates.</li>
                <li>Step-by-Step hands on project guidence.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollment;
