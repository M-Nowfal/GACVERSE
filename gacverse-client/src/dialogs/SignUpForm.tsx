import { useForm } from "react-hook-form"
import { SpinnerLoader } from "@/components/common/Loader";
import ValidationError from "@/components/common/ValidationError";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState, type JSX } from "react";
import { useMutateData, useStorage } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import { google } from "@/assets";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

interface SignUpFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
  role?: "student" | "instructor" | "admin";
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignUpForm = ({ onSwitchToLogin, onClose }: SignUpFormProps): JSX.Element => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { loading, error, data, mutate } = useMutateData("POST");
  const navigate: NavigateFunction = useNavigate();
  const { storage } = useStorage("sessionStorage");

  const onSubmit = async (data: FormData) => {
    try {
      await mutate("/auth/send-otp", { email: data.email });
      const { confirmPassword, terms, ...submitData } = data;
      storage.set("signupdata", submitData);
    } catch (error: unknown) {
      console.error("Signup failed: ", error);
    }
  };

  useEffect(() => {
    if (data && !error && !loading) {
      if (data.isOtpSent) {
        toast.success(data.message);
        onClose();
        navigate("/verify-otp", { state: { email: (storage.get("signupdata")).email } });
        return;
      }
    }
  }, [data]);

  const password = watch("password");

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Create Account</DialogTitle>
        <DialogDescription className="text-center">
          Join us today! Create your account to get started.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters"
                  }
                })}
                placeholder="First Name"
                disabled={loading}
              />
              {errors.firstName && <ValidationError error={errors.firstName.message!} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters"
                  }
                })}
                placeholder="Last Name"
                disabled={loading}
              />
              {errors.lastName && <ValidationError error={errors.lastName.message!} />}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && <ValidationError error={errors.email.message!} />}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="mobile tel"
              {...register("phone", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[\d]{10}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder="Enter your phone number"
              disabled={loading}
            />
            {errors.phone && <ValidationError error={errors.phone.message!} />}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              autoComplete="new-password"
              type={viewPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/,
                  message: "Must include at least one lowercase letter, one number, and one special character"
                }
              })}
              placeholder="Create a strong password"
              disabled={loading}
            />
            <Button
              type="button"
              className="absolute right-0 top-10 transform -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
              onClick={() => setViewPassword((prev: boolean) => !prev)}
              disabled={loading}
            >
              {viewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
            {errors.password && <ValidationError error={errors.password.message!} />}
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              autoComplete="new-password"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm your password"
              disabled={loading}
            />
            {errors.confirmPassword && <ValidationError error={errors.confirmPassword.message!} />}
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must accept the terms and conditions" })}
              className="w-4 h-4 dark:accent-purple-600 border rounded"
              disabled={loading}
            />
            <Label htmlFor="terms" className="text-xs font-normal leading-relaxed">
              I agree to the{" "}
              <Button type="button" variant="link" className="text-xs p-0 h-auto font-semibold">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button type="button" variant="link" className="text-xs p-0 h-auto font-semibold">
                Privacy Policy
              </Button>
            </Label>
          </div>
          {errors.terms && <ValidationError error={errors.terms.message!} />}
        </div>

        {error && (
          <div className="mt-4 text-center border border-red-600 rounded-md p-3">
            <p className="text-red-500 font-semibold">{error || "Login failed. Please try again."}</p>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                Creating Account...
                <SpinnerLoader size={5} color="white" />
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </DialogFooter>
      </form>

      <Separator />

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogleSignUp}
        disabled={loading}
      >
        Sign up with
        <span className="flex">
          <img src={google} alt="google" width={15} height={15} />
          oogle
        </span>
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto font-semibold"
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            Sign in
          </Button>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
