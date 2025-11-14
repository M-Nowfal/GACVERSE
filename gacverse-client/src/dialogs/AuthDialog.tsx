import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, type JSX } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ResetPassword from "./ForgetPassword";

interface AuthDialogProps {
  defaultType: "login" | "signup" | "forgetpassword";
  variant?: "ghost" | "secondary" | "primary";
  className?: string;
};

const AuthDialog = ({ defaultType = "login", variant = "secondary", className = "" }: AuthDialogProps): JSX.Element => {
  const [authType, setAuthType] = useState<"login" | "signup" | "forgetpassword">(defaultType);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const switchAuthType = (type: "login" | "signup" | "forgetpassword") => setAuthType(type);

  const handleOpenChange = (open: boolean): void => {
    setIsOpen(open);
    if (!open) {
      setAuthType(defaultType);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {defaultType === "login" ? (
          <Button variant={variant} className={className}>Login</Button>
        ) : (
          <Button variant={variant} className={className}>Create Account</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl dark:bg-[#1d1d1d]" onOpenAutoFocus={(e) => e.preventDefault()}>
        {authType === "login" ? (
          <LoginForm
            onSwitchToSignup={switchAuthType}
            onClose={() => setIsOpen(false)}
          />
        ) : (
          authType === "signup" ? (
            <SignUpForm
              onSwitchToLogin={switchAuthType}
              onClose={() => setIsOpen(false)}
            />
          ) : (
            <ResetPassword 
              onClose={() => setIsOpen(false)}
            />
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
