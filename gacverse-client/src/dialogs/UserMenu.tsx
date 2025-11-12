import { getFirstTwoLettersOfName } from "@/utils/helpers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/store";
import Profile from "@/components/common/Profile";
import { useravatar } from "@/assets";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { PencilIcon } from "lucide-react";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserMenu = () => {
  const { user } = useUserStore();
  const { logout, loading } = useLogout();
  const [open, setOpen] = useState<boolean>(false);

  const userName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const handleLinkClick = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Profile
          avatar={user?.avatar || useravatar}
          fallBack={getFirstTwoLettersOfName(userName)}
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-6 rounded-2xl shadow-xl">
        <DialogHeader className="flex flex-col items-center">
          <div className="relative w-fit mx-auto">
            <Profile
              size="xl"
              avatar={user?.avatar || useravatar}
              fallBack={getFirstTwoLettersOfName(userName)}
            />
            <Button
              size="icon-sm"
              type="button"
              className="size-6 absolute bottom-0 right-0 bg-accent text-white p-1 rounded-full hover:scale-105 transition"
              aria-label="Edit profile"
            >
              <PencilIcon className="size-4 text-black dark:text-white" />
            </Button>
          </div>
          <DialogTitle className="text-2xl mt-3 font-semibold text-center">
            {userName}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {user?.email}
          </DialogDescription>
          <p className="text-sm text-muted-foreground mt-1">{user?.phone}</p>
        </DialogHeader>

        {user?.details?.student && (
          <div className="border-t pt-4 mt-4 space-y-2">
            <h4 className="font-medium text-base text-center">Profile Details</h4>
            <div className="flex flex-col gap-y-2 gap-x-4 text-sm">
              {user.details.student.enrolledCourses.slice(0, 3).map((course: any) => (
                <Link
                  key={course._id}
                  to={`/dashboard/student/enrollment/${course.course._id}`}
                  onClick={handleLinkClick}
                  className="flex justify-between items-center gap-2 border-b border-muted/30 py-1"
                  viewTransition
                >
                  <figure>
                    <img
                      src={course.course.thumbnail}
                      alt={course.course.title}
                      className="w-30 rounded object-contain"
                    />
                    <figcaption hidden>{course.course.title}</figcaption>
                  </figure>
                  <span className="capitalize font-medium text-muted-foreground">
                    {course.course.title}
                  </span>
                  <span className="text-right text-foreground font-semibold">
                    {course.progress}%
                  </span>
                </Link>
              ))}
            </div>
            {user.details.student.enrolledCourses.length > 3 && (
              <Link
                to={`/dashboard/student/enrolled`}
                onClick={handleLinkClick}
                className="flex w-fit m-auto text-blue-500 hover:underline hover:underline-offset-4"
              >
                Show all enrolled courses
              </Link>
            )}
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-3 sm:flex-col">
          <Alert
            trigger={
              <Button variant="destructive" type="button" className="w-full" disabled={loading}>
                {loading ? "Logging out..." : "Log Out"}
              </Button>
            }
            alertFor="Are you sure you want to log out?"
            description={
              `Logging out will securely end your current session. 
              Your progress, enrolled courses, and all activity are safely saved to your account. 
              You can log back in anytime using your registered email or phone number.`
            }
            onContinue={logout}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserMenu;
