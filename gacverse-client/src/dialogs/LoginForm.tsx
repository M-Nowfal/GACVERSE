import { useForm } from "react-hook-form"
import { SpinnerLoader } from "@/components/common/Loader";
import ValidationError from "@/components/common/ValidationError";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, type JSX } from "react";
import useMutateData from "@/hooks/useMutateData";
import { Separator } from "@/components/ui/separator";
import { google } from "@/assets";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  role?: "student" | "instructor" | "admin";
  onClose: () => void;
}

type FormData = {
  email: string;
  password: string;
}

const LoginForm = ({ onSwitchToSignup, role = "student", onClose }: LoginFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { data, error, loading, mutate } = useMutateData("POST");
  const { setUser } = useUserStore();

  useEffect(() => {
    if (data && !error && !loading) {
      if (data.user)
        setUser(data.user);
      toast.success(data.message);

      const timer = setTimeout(() => {
        onClose();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [data]);

  const onSubmit = async (data: FormData) => {
    try {
      await mutate(`/auth/login?role=${role}`, data);
    } catch (err: unknown) {
      console.error("Login failed: " + err);
    }
  }

  const handleGoogleLogin = () => {

  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Welcome Back</DialogTitle>
        <DialogDescription className="text-center">
          Sign in to your account to continue
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
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
            />
            {errors.email && <ValidationError error={errors.email.message!} />}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && <ValidationError error={errors.password.message!} />}
          </div>
        </div>

        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-500 font-semibold">{error || "Login failed. Please try again."}</p>
          </div>
        )}

        {data && (
          <div className="text-center rounded-md mt-5">
            <p className="text-emerald-600 font-semibold animate-pulse">Login successful! Redirecting...</p>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                Signing In...
                <SpinnerLoader size={5} />
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </DialogFooter>
      </form>

      <Separator />

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        Continue with
        <span className="flex">
          <img src={google} alt="google" width={15} height={15} />
          oogle
        </span>
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto font-semibold"
            onClick={onSwitchToSignup}
            disabled={loading}
          >
            Sign up
          </Button>
        </p>
      </div>
    </>
  );
}

export default LoginForm;
