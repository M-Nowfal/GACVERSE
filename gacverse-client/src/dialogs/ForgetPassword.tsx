import { SpinnerLoader } from "@/components/common/Loader";
import ValidationError from "@/components/common/ValidationError";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutateData, useReactRouter } from "@/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgetPassword = ({ onClose }: { onClose: () => void }) => {
  const { data, error, loading, mutate } = useMutateData();
  const { register, handleSubmit, formState: { errors } } = useForm<Record<"email", string>>();
  const { navigate } = useReactRouter();

  const onSubmit = async (data: Record<"email", string>) => {
    try {
      await mutate("/auth/forgetpassword", { email: data.email });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "Something went wrong";
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    if (data && data.isOtpSent) {
      toast.success(data.message);
      navigate("/verify-otp", { state: { email: data.email, verificationFor: "resetpassword" } });
      onClose();
    }
  }, [data]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Reset Your Password</DialogTitle>
        <DialogDescription className="text-center">
          Enter your email address below. We&apos;ll send you a verification code so you can create a new password.
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
        </div>

        {error && (
          <div className="mt-4 text-center border border-red-600 rounded-md p-3">
            <p className="text-red-600 font-semibold">{error || "Login failed. Please try again."}</p>
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
          <Button variant="primary" type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                Processing...
                <SpinnerLoader size={5} color="white" />
              </>
            ) : (
              "Send OTP"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

export default ForgetPassword;
