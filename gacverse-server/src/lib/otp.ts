import nodemailer from "nodemailer";
import logger from "../utils/logger";
import { MAIL_OPTIONS, REDIS_CONFIG } from "../constants";
import Redis from "ioredis";

type SendOtpReturn = {
  message: string;
  isOtpSent?: boolean;
}

const redis = new Redis(REDIS_CONFIG.redis_url, {
  tls: { rejectUnauthorized: false }
});

export const sendOtpToMail = async (email: string): Promise<SendOtpReturn> => {
  try {
    const { from, subject, user, pass, service } = MAIL_OPTIONS;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from,
      to: email,
      subject,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #7E22CE;">GACVerse Verification</h2>
        <p>Hello Learner</p>
        <p>Your OTP code for verification is:</p>
        
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 16px 0; color: #000;">
          ${otp}
        </div>

        <p>This code is valid for <b>5 minutes</b>. Please do not share it with anyone.</p>
        <p>If you did not request this, kindly ignore this email.</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #777;">
          GACVerse - Collaborative E-Learning & Resource Sharing Platform <br/>
          <a href="https://gacverse.vercel.app/" style="color: #7E22CE; text-decoration: none;">Visit GACVerse</a>
        </p>
      </div>`
    };

    const transporter = nodemailer.createTransport({
      service, auth: { user, pass }
    });

    await transporter.sendMail(mailOptions);

    await redis.set(`otp:${email}`, otp, "EX", 300);
    return { message: "Otp sent successfully", isOtpSent: true };
  } catch (err: unknown) {
    logger.error(err);
    return { message: "Failed to send otp", isOtpSent: false };
  }
};

export const verifyCode = async (email: string, otp: string): Promise<boolean> => {
  const storedOtp = await redis.get(`otp:${email}`);
  if (!storedOtp) 
    return false;
  
  const isMatch = storedOtp === otp;
  if (isMatch)
    await redis.del(`otp:${email}`);
  return isMatch;
}
