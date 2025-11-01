import { Button } from "@/components/ui/button";
import ThemeToggler from "@/components/ui/theme-toggler";
import AuthDialog from "@/dialogs/AuthDialog";
import useHistory from "@/hooks/useHistory";
import { CONSTANTS } from "@/utils/constants";
import { ArrowLeft } from "lucide-react";
import type { JSX } from "react";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";

const Navbar = (): JSX.Element => {

  const navigate: NavigateFunction = useNavigate();
  const { canGoBack } = useHistory();

  return (
    <nav className={`flex items-center justify-between px-4 md:pe-20 ${canGoBack ? "md:ps-15" : "md:ps-7"} backdrop-blur-xl fixed top-0 w-full z-10 shadow dark:shadow-slate-700`}>
      <div className="flex items-center md:gap-5">
        {canGoBack && <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="size-5" />
        </Button>
        }
        <Link to="/" className="flex items-center" viewTransition>
          <figure>
            <img
              src={CONSTANTS.app_logo}
              alt={CONSTANTS.app_name}
              className="w-15 h-15 rounded-lg"
            />
            <figcaption hidden>{CONSTANTS.app_name}</figcaption>
          </figure>
          <h1 className="font-bold text-lg">{CONSTANTS.app_name}</h1>
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        {!true ? (<>
          {/* User Profile goes here */}
          {/* <UserMenu /> */}
        </>) : (<>
          <AuthDialog defaultType="login" variant="ghost" />
          <AuthDialog defaultType="signup" variant="secondary" className="hidden md:block" />
        </>)}

        <div className="md:absolute right-2">
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;