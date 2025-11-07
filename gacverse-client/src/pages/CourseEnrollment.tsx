import Error from "@/components/common/Error";
import { SpinnerLoader } from "@/components/common/Loader";
import StarRatings from "@/components/common/StarRatings";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFetchData, useReactRouter, useScroll } from "@/hooks";
import { BookOpenText, Clock, PlayCircle, Star } from "lucide-react";

const CourseEnrollment = () => {
  useScroll();
  const { params: { id } } = useReactRouter();
  const { data, error, loading, reFetchData } = useFetchData(`/course/${id}`);

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
        data && (
          <div className="flex flex-col lg:flex-row gap-10 lg:mx-3">
            <div className="flex flex-col gap-5 sm:w-xl lg:w-[60%] xl:w-[70%] mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold max-w-5xl">{data.course.title}</h1>
              <p className="text-muted-foreground max-w-5xl">{data.course.description}</p>

              <div className="lg:hidden flex flex-col gap-2 border pb-5 rounded-xl shadow w-full my-5">
                <figure>
                  <img
                    src={data.course.thumbnail}
                    alt={data.course.title}
                    className="rounded-t-xl h-60 w-full object-cover"
                  />
                  <figcaption hidden>{data.course.title}</figcaption>
                </figure>
                <div className="flex flex-col gap-2 mx-5">
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
                  <h3 className="text-xl font-semibold">What&apos;s in the course?</h3>
                  <ol className="text-muted-foreground list-disc ms-5">
                    {data.course.whatsInTheCourse.map((whats: string, i: number) => (
                      <li key={i}>{whats}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex flex-col text-muted-foreground gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>{data.course.rating}</span>
                  <StarRatings rating={data.course.rating} />
                  <span className="text-sky-600">({data.course.reviews.length} ratings)</span>
                  <span>{data.course.noOfEnrollment} Students</span>
                </div>
                <p>
                  Course by{" "}
                  <span className="text-sky-600 underline underline-offset-2">
                    {data.course.instructor.name}
                  </span>
                </p>
              </div>

              <div className="mt-7">
                <h2 className="text-xl font-semibold mb-5">Course Structure</h2>
                <Accordion
                  type="multiple"
                  className="w-full max-w-5xl space-y-2"
                >
                  {data.course.lessons.map((lesson: Lesson) => (
                    <AccordionItem key={lesson._id} value={`item-${lesson._id}`} className="rounded-md border!">
                      <AccordionTrigger className="bg-accent px-5 data-[state=open]:rounded-b-none">
                        {lesson.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground px-5 pt-4">
                        <h3 className="mb-3 text-[15px]">{lesson.description}</h3>
                        <div className="flex flex-col items-start">
                          {lesson.lectures.map(lecture => (
                            <div key={lecture._id} className="flex items-center w-full justify-between hover:bg-accent p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <PlayCircle className="size-5" />
                                <p>{lecture.title}</p>
                              </div>
                              <span>{lecture.duration}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="hidden sticky top-25 lg:flex flex-col gap-2 border pb-5 rounded-xl shadow w-full h-fit sm:w-lg lg:w-[40%] xl:w-[30%]">
              <figure>
                <img
                  src={data.course.thumbnail}
                  alt={data.course.title}
                  className="rounded-t-xl h-60 w-full object-cover"
                />
                <figcaption hidden>{data.course.title}</figcaption>
              </figure>
              <div className="flex flex-col gap-2 mx-5">
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
                <h3 className="text-xl font-semibold">What&apos;s in the course?</h3>
                <ol className="text-muted-foreground list-disc ms-5">
                  {data.course.whatsInTheCourse.map((whats: string, i: number) => (
                    <li key={i}>{whats}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default CourseEnrollment;
