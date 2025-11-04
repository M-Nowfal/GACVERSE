import CourseCard from "@/components/cards/CourseCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import Divider from "@/components/common/Divider";
import Error from "@/components/common/Error";
import { SpinnerLoader } from "@/components/common/Loader";
import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFetchData, useScroll } from "@/hooks";
import { CONSTANTS } from "@/utils/constants";
import { ArrowRight, Award, BookOpen, List, MessageSquare, Users } from "lucide-react";
import type { JSX } from "react";
import { Link } from "react-router-dom";

const Hero = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center w-[90%] max-w-4xl xl:max-w-5xl m-auto">
        <div className="flex flex-col items-center justify-center">
          <figure>
            <img src={CONSTANTS.app_logo} alt={CONSTANTS.app_name} className="w-65 h-65 md:w-80 md:h-80" />
            <figcaption hidden>{CONSTANTS.app_name}</figcaption>
          </figure>
          <h1 className="font-bold text-4xl md:text-5xl xl:text-6xl text-center leading-tight">
            Empower your future with courses designed to
            <span className="text-linear">&nbsp;fit your choice.</span>
          </h1>
        </div>

        <p className="text-center max-w-3xl mt-8 text-lg text-muted-foreground leading-relaxed">
          We bring together world-class instructors
          <span className="hidden md:inline-block">, interactive content, and a supportive community</span>
          &nbsp;to help you achieve your personal and professional goals.
          Learn at your own pace with our carefully curated curriculum.
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-12">
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <Users className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-foreground">50K+</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Active Learners</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-foreground">500+</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Expert Courses</p>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-2 justify-center">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-foreground">98%</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Success Rate</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-2xl">
          <Link to="/courses" className="sm:flex-1 group" viewTransition>
            <Button variant="primary" size="lg" className="w-full">
              Explore Courses
              <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
            </Button>
          </Link>
          <Link to="/learnmore" className="sm:flex-1 group" viewTransition>
            <Button variant="secondary" size="lg" className="w-full">
              Learn More
              <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center max-w-4xl">

          <Card className="flex p-5">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">Learn Your Way</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose from self-paced, instructor-led, or hybrid learning formats that match your schedule and learning style.
              </p>
            </CardContent>
          </Card>

          <Card className="flex p-5">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">Industry Recognized</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Earn certificates and badges that are valued by employers and help advance your career.
              </p>
            </CardContent>
          </Card>

          <Card className="flex p-5">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">Community Driven</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Join study groups, participate in discussions, and network with peers and mentors.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by teams at leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            {["Google", "Microsoft", "Amazon", "Netflix", "Spotify"].map((company) => (
              <div key={company} className="text-lg font-medium text-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CourseList = (): JSX.Element => {
  const { data, loading, error, reFetchData } = useFetchData("/course/featured");

  return (
    <div className="flex flex-col justify-center items-center gap-7 mb-10">
      <div className="flex flex-col gap-2 w-[90%] max-w-2xl m-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
          Learn from the best
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.
        </p>
        <div className="mt-5">
          <SearchBar />
        </div>
      </div>

      {error ? (
        <Error
          resource="courses"
          onRetry={() => reFetchData("/course/featured")}
          error={error}
        />
      ) : (loading ? (
        <SpinnerLoader />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[90%] max-w-6xl">
          {data?.courses?.map((course: Course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>)
      )}

      {(!loading && data?.courses?.length === 0) ? (
        <Card className="max-w-md mx-auto p-6 text-center border-gray-200 dark:border-gray-700 shadow-md">
          <CardContent className="flex flex-col gap-3">
            <CardTitle>No Courses Available</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              It looks like we haven&apos;t uploaded any courses yet.
              Please check back soon for new and exciting courses coming your way!
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center mt-3 w-full">
            <Button variant="primary" className="w-full">
              Add a Course
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex justify-between">
          <Link to="/courses" viewTransition>
            <Button variant="secondary" size="lg">
              <List />
              Show All Courses
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

const Testimonials = (): JSX.Element => {
  const { data, loading, error, reFetchData } = useFetchData("/review/featured");

  return (
    <div className="flex flex-col justify-center items-center gap-12 mb-10">
      <div className="flex flex-col gap-2 w-[85%] max-w-2xl m-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
          Testimonials
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.
        </p>
      </div>
      {loading ? (
        <SpinnerLoader />
      ) : (
        error ? (
          <Error
            resource="testimonials"
            error={error}
            onRetry={() => reFetchData("/testimonial/featured")}
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 m-auto w-[90%] max-w-6xl">
            {data?.reviews?.map((testimonial: Testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
              />
            ))}
          </div>
        )
      )}

      {!loading && data?.testimonials?.length === 0 ? (
        <Card className="max-w-md mx-auto p-6 text-center border-gray-200 dark:border-gray-700 shadow-md">
          <CardContent className="flex flex-col gap-3">
            <CardTitle>No Reviews Yet</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              It looks like no reviews have been added yet.
              Please check back soon to see what others are saying about our courses!
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-between">
          <Link to="/reviews" viewTransition>
            <Button variant="secondary" size="lg">
              <MessageSquare />
              Show All Reviews
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

const GetStart = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center gap-12 mb-10">
      <div className="flex flex-col gap-2 w-[90%] max-w-2xl m-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-3">
          Learn anything, anytime, anywhere
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Level up your learning game! CSHUB360 is your all-in-one space where college students can explore curated courses, learn from real professors, and boost their skills at their own pace. Join now, start learning smarter, and unlock your next big move in tech & academics.
        </p>
      </div>
      <div className="flex flex-col md:flex-row m-auto gap-3 w-[90%] max-w-2xl">
        <Link to="/getstart" viewTransition className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            Get Started
          </Button>
        </Link>
        <Link to="/learnmore" className="sm:flex-1 group" viewTransition>
          <Button variant="secondary" size="lg" className="w-full">
            Learn More
            <ArrowRight className="group-hover:translate-x-3 transition-all duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

const Home = () => {
  useScroll();

  return (
    <>
      <Hero />
      <Divider />
      <CourseList />
      <Divider />
      <Testimonials />
      <Divider />
      <GetStart />
    </>
  );
}

export default Home;
