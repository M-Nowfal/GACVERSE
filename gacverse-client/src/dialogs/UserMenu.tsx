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
import { useUserStore } from "@/store/useUserStore";
import Profile from "@/components/common/Profile";
import { useravatar } from "@/assets";
import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";
import { PencilIcon } from "lucide-react";
import Alert from "./Alert";

const UserMenu = () => {
  const { user } = useUserStore();
  const { logout } = useLogout();

  const userName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Dialog>
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

        {user?.details && Object.keys(user.details).length > 0 && (
          <div className="border-t pt-4 mt-4 space-y-2">
            <h4 className="font-medium text-base text-center">Profile Details</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {Object.entries(user.details).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-muted/30 py-1">
                  <span className="capitalize font-medium text-muted-foreground">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-right text-foreground">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
          <Alert
            trigger={
              <Button variant="destructive" type="button" className="w-full">
                Log Out
              </Button>
            }
            alertFor="Log out of your account?"
            description="You can log back in anytime with your credentials."
            onContinue={logout}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserMenu;
