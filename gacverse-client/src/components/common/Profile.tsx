import type { JSX } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({ avatar, fallBack = "NA", size = "md" }: {
  avatar: string,
  fallBack?: string,
  size?: "sm" | "md" | "lg" | "xl"
}): JSX.Element => {
  return (
    <div className="flex">
      <Avatar size={size}>
        <AvatarImage src={avatar} />
        <AvatarFallback className={`font-semibold text-${size} bg-blue-600/20 dark:bg-purple-600/20`}>{fallBack}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default Profile;
