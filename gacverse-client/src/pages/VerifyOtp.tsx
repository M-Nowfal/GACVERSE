import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutateData, useReactRouter, useStorage } from "@/hooks";
import { useUserStore } from "@/store";
import { AxiosError } from "axios";
import { Clock, KeyRound } from "lucide-react";
import { useEffect, useState, type JSX } from "react";
import { toast } from "sonner";

const VerifyOtp = (): JSX.Element => {
  const { navigate, state } = useReactRouter();
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(59);
  const { data, error, loading, mutate } = useMutateData();
  const { storage } = useStorage("sessionStorage");
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!state || !state.email) {
      toast.warning("Unauthorized, Email is required");
      navigate("/");
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resendOtp = async (): Promise<void> => {
    try {
      await mutate("/auth/send-otp", { email: state?.email });
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ?
        (err.response?.data?.message || err.response?.statusText) : String(err).slice(0, 50);
      toast.error(errMessage);
    }
  };

  const verifyOtp = async () => {
    try {
      await mutate("/auth/verify-otp", { email: state?.email, otp });
    } catch (err: unknown) {
      const errMessage = err instanceof AxiosError ? err.response?.data?.message : String(err).slice(50);
      toast.error(errMessage);
    }
  }

  useEffect(() => {
    (async () => {
      if (data?.isVerified) {
        await mutate(`/auth/signup`, storage.get("signupdata"));
      } else if (data?.success) {
        toast.success(data.message);
        setUser(data.user);
        storage.clear();
        navigate("/dashboard", { replace: true });
      } else {
        setTimer(59);
      }
    })();
  }, [data]);

  useEffect(() => {
    if (error)
      toast.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center mt-30 my-20">
      <div className="flex flex-col items-center border border-gray-accent rounded-lg py-8 w-[90%] max-w-md bg-card shadow-lg">
        <div className="text-center mb-2">
          <div className="w-16 h-16 mb-2 bg-blue-100 dark:bg-purple-600/20 rounded-full flex items-center justify-center mx-auto">
            <KeyRound className="text-purple-600 dark:text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Verify Your Identity</h2>
          <p className="text-muted-foreground mb-2 max-w-sm">
            We've sent a 6-digit verification code to your registered email address
          </p>
          <span className="text-sky-500">{state?.email}</span>
        </div>

        <div className="w-full flex flex-col items-center px-6 mb-6">
          <div className="text-center mb-4">
            <span className="text-sm text-gray-500">Enter the code below</span>
          </div>
          <InputOTP maxLength={6} value={otp} onChange={(v) => setOtp(v)}>
            <InputOTPGroup className="gap-1">
              <InputOTPSlot index={0} className="w-10 h-10 text-lg border border-gray-300 rounded-lg transition-all duration-200" />
              <InputOTPSlot index={1} className="w-10 h-10 text-lg border border-gray-300 rounded-lg transition-all duration-200" />
              <InputOTPSlot index={2} className="w-10 h-10 text-lg border border-gray-300 rounded-lg transition-all duration-200" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="gap-1">
              <InputOTPSlot index={3} className="w-10 h-10 text-lg border border-gray-300 rounded-lg transition-all duration-200" />
              <InputOTPSlot index={4} className="w-10 h-10 text-lg border border-gray-300 rounded-lg transition-all duration-200" />
              <InputOTPSlot index={5} className="w-10 h-10 text-lg border border-gray-300 rounded-lg transition-all duration-200" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="w-[80%] max-w-sm flex justify-center mb-5">
          <Button
            variant="primary"
            className="w-full"
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>
        </div>

        <div className="text-center space-y-3 px-6">
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <Clock size={14} />
            {timer > 0 ? (
              <span>
                You can request a new code in{" "}
                <span className="font-semibold text-orange-600">{timer}s</span>
              </span>
            ) : (
              <span className="text-emerald-600 font-medium">You can resend the OTP now</span>
            )}
          </div>

          <div className="flex items-center w-full">
            <p className="text-sm text-gray-500">Didn&apos;t get your verification code?</p>
            <Button
              variant="link"
              disabled={timer !== 0 || loading}
              onClick={resendOtp}
              className="text-blue-600 font-medium text-sm transition-colors duration-200 hover:text-blue-700 disabled:opacity-50"
            >
              Resend OTP
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp;
