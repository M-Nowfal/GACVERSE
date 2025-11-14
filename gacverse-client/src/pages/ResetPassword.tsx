import { SpinnerLoader } from "@/components/common/Loader";
import ValidationError from "@/components/common/ValidationError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutateData, useReactRouter } from "@/hooks";
import { CONSTANTS } from "@/utils/constants";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { data, error, loading, mutate } = useMutateData("POST");
  const { register, watch, handleSubmit, formState: { errors }, } = useForm<FormData>();
  const { state, navigate } = useReactRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const body = { email: state?.email, password: data.newPassword, confirmPassword: data.confirmPassword };
      const headers = { authorization: `Bearer${CONSTANTS.split}${state?.token}` };
      await mutate("/auth/resetpassword", body, headers);
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : "Something went wrong";
      toast.warning(errMessage);
    }
  };

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (data && data.success)
      toast.success(data.message);

    return () => {
      navigate("/", { replace: true });
    }
  }, [data]);

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Reset Your Password</DialogTitle>
          <DialogDescription className="text-center">
            Enter your new password and confirm to continue
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                autoComplete="new-password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters long",
                  },
                })}
              />
              {errors.newPassword && <ValidationError error={errors.newPassword.message!} />}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter new password"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <ValidationError error={errors.confirmPassword.message!} />}
            </div>
          </div>

          {error && (
            <div className="mt-4 text-center border border-red-600 rounded-md p-3">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          )}

          <DialogFooter className="flex flex-col gap-2 mt-6 sm:flex-col">
            <Button variant="primary" type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  Updating Password...
                  <SpinnerLoader size={5} color="white" />
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
