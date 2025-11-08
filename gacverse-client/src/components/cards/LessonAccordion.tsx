import { PlayCircle } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import type { JSX } from "react";

const LessonAccordion = ({ lesson }: { lesson: Lesson }): JSX.Element => {
  return (
    <AccordionItem value={`item-${lesson._id}`} className="rounded-md border!">
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
  );
}

export default LessonAccordion;
