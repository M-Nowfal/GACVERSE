import type { JSX } from "react";
import Profile from "@/components/common/Profile";
import StarRatings from "@/components/common/StarRatings";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { getFirstTwoLettersOfName } from "@/utils/helpers";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }): JSX.Element => {
  const { avatar, name, rating, review } = testimonial;

  return (
    <Card className="pb-3">
      <CardHeader className="flex items-center bg-purple-100 dark:bg-blue-900/20 rounded-t-xl py-2">
        <Profile avatar={avatar} fallBack={getFirstTwoLettersOfName(name)} />
        <h2 className="font-semibold">{name}</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{rating}</span>
          <StarRatings rating={rating} />
        </div>
        <CardDescription>
          {review}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
