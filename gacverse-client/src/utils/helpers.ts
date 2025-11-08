export const getFirstTwoLettersOfName = (name: string): string => {
  try {
    const splittedName = name.toUpperCase().trim().split(/[\s.]+/g).filter(Boolean);

    if (splittedName.length === 0) return "NA";

    const first = splittedName[0][0] || "";
    const second = splittedName[1]?.[0] || splittedName[0][1] || "";

    return (first + second) || "NA";
  } catch (error: unknown) {
    console.error(error);
    return "NA";
  }
}

export const totalLectures = (lessons: Array<any>): number => {
  return lessons.reduce((acc: number, lesson: any) => acc + lesson.lectures.length, 0);
}

export const formatDuration = (duration: string) => {
  return duration.split(":").map((t: string, i: number) => (
    i === 0 ? t + "h" : i === 1 ? t + "m" : t + "s"
  )).join(" ");
} 
