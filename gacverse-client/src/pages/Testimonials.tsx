import { type JSX } from "react";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/button";
import { useScroll, useFetchNextOnBottom, useFetchPagination } from "@/hooks";
import { MessageSquare, PlusCircle } from "lucide-react";
import { SpinnerLoader } from "@/components/common/Loader";
import Error from "@/components/common/Error";

const Testimonials = (): JSX.Element => {
  const { data, error, loading, fetchNextPage, hasMore } = useFetchPagination("/review", "reviews");
  useScroll();

  useFetchNextOnBottom(() => {
    hasMore && fetchNextPage();
  }, 200);

  return (
    <div className="my-30 flex flex-col gap-5">
      {loading && data.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <SpinnerLoader size={50} color="blue" />
        </div>
      ) : error ? (
        <Error
          resource="testimonials"
          error={error}
          onRetry={() => fetchNextPage()}
        />
      ) : (
        <>
          <div className="text-center">
            <div className="flex justify-center gap-3">
              <MessageSquare className="size-10 text-purple-600" />
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                Student Testimonials
              </h1>
            </div>
            <p className="text-lg text-muted-foreground w-[90%] max-w-2xl mx-auto">
              Discover how our courses have helped students achieve their learning goals
            </p>
          </div>

          <div className="flex justify-end pe-5 xl:fixed right-5">
            <Button variant="primary" size="lg">
              <PlusCircle />
              Add a Review
            </Button>
          </div>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 m-auto w-[90%] max-w-7xl">
            {(data as Testimonial[]).map((testimonial: Testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </div>

          {!hasMore && data.length > 0 && (
            <div className="text-center text-muted-foreground">
              No more Reviews
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Testimonials;
