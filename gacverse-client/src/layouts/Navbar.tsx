import { Button } from "@/components/ui/button";
import ThemeToggler from "@/components/ui/theme-toggler";
import AuthDialog from "@/dialogs/AuthDialog";
import UserMenu from "@/dialogs/UserMenu";
import { useAuth } from "@/hooks";
import { useHistory } from "@/hooks";
import { useUserStore } from "@/store";
import { CONSTANTS } from "@/utils/constants";
import { ArrowLeft } from "lucide-react";
import type { JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

const Navbar = (): JSX.Element => {
  useAuth();
  const navigate: NavigateFunction = useNavigate();
  const { canGoBack } = useHistory();
  const { user } = useUserStore();

  return (
    <nav className={`flex items-center justify-between p-2 md:px-4 md:pe-20 ${canGoBack ? "md:ps-15" : "md:ps-7"} backdrop-blur-xl fixed top-0 w-full z-10 shadow dark:shadow-slate-700`}>
      <div className="flex items-center md:gap-5">
        {canGoBack && <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="md:absolute left-3"
        >
          <ArrowLeft className="size-5" />
        </Button>}
        <div className="flex items-center gap-2 cursor-pointer">
          <figure>
            <img
              src={CONSTANTS.app_logo}
              alt={CONSTANTS.app_name}
              className="w-12 h-12 rounded-lg"
            />
            <figcaption hidden>{CONSTANTS.app_name}</figcaption>
          </figure>
          <h1 className="font-bold text-lg text-linear">{CONSTANTS.app_name}</h1>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        {user ? (<>
          <UserMenu />
        </>) : (<>
          <AuthDialog defaultType="login" variant="ghost" />
          <AuthDialog defaultType="signup" variant="primary" className="hidden md:block" />
        </>)}

        <div className="md:absolute right-3">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
