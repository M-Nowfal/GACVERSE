import CourseCard from "@/components/cards/CourseCard";
import { type JSX } from "react";
import { Button } from "@/components/ui/button";
import { useScroll, useFetchNextOnBottom, useFetchPagination } from "@/hooks";
import { SpinnerLoader } from "@/components/common/Loader";
import Error from "@/components/common/Error";
import SearchBar from "@/components/common/SearchBar";
import { useSearchParams } from "react-router-dom";

const Course = (): JSX.Element => {
  useScroll();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;

  const {
    data, error,
    loading, fetchNextPage,
    hasMore, isFetching
  } = useFetchPagination(`/course`, "courses", search);

  useFetchNextOnBottom(() => {
    hasMore && fetchNextPage();
  }, 200);

  return (
    <div className="my-25 flex flex-col gap-10">

      {loading && data.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerLoader size={60} color="blue" />
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
            <SearchBar onSearch={(search: string) => fetchNextPage(search)} />
          </div>

          {!isFetching && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 m-auto w-[90%] max-w-7xl">
            {(data as Course[]).map((course: Course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>}

          {loading && (
            <div className="flex justify-center my-8">
              <SpinnerLoader size={50} color="blue" />
            </div>
          )}

          {!hasMore && data.length > 0 && !isFetching && (
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
            onClick={() => fetchNextPage("all")}
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
