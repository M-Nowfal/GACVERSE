import CourseCard from "@/components/cards/CourseCard";
import { type JSX } from "react";
import { Button } from "@/components/ui/button";
import useScroll from "@/hooks/useScroll";
import useFetchPagination from "@/hooks/useFetchPagination";
import { SpinnerLoader } from "@/components/common/Loader";
import Error from "@/components/common/Error";
import SearchBar from "@/components/common/SearchBar";
import useScrollBottom from "@/hooks/useScrollBottom";

const Course = (): JSX.Element => {
  useScroll();
  const {
    data, error, loading, fetchNextPage, hasMore
  } = useFetchPagination("/course/pagination", "courses");

  useScrollBottom(() => {
    hasMore && fetchNextPage();
  }, 200);

  return (
    <div className="my-25 flex flex-col gap-10">

      {loading && data.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerLoader size={15} />
        </div>
      ) : error ? (
        <Error
          resource="courses"
          error={error}
          onRetry={() => fetchNextPage()}
        />
      ) : (
        <>
          <div className="w-[90%] m-auto">
            <SearchBar />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 m-auto w-[90%] max-w-7xl">
            {data.map((course: Course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>

          {loading && (
            <div className="flex justify-center my-8">
              <SpinnerLoader size={50} color="blue" />
            </div>
          )}

          {!hasMore && (
            <div className="flex justify-center mt-5">
              <p className="text-muted-foreground">No more courses</p>
            </div>
          )}
        </>
      )}

      {!loading && data.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center gap-4 text-center mt-10 p-7">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            No Courses Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            We couldn&apos;t find any courses matching{" "}
            <span className="font-semibold text-purple-600">
              your search
            </span>.
            Try adjusting your keywords or explore popular categories to discover something new!
          </p>
          <Button
            variant="secondary"
            onClick={() => fetchNextPage()}
            className="mt-2"
          >
            Browse All Courses
          </Button>
        </div>
      )}
    </div>
  );
}

export default Course;
