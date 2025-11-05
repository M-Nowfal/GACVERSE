interface mailOptions {
  service: "gmail",
  from: string,
  subject: string;
  user: string;
  pass: string;
}

export const MAIL_OPTIONS: mailOptions = {
  service: "gmail",
  from: `"GACVerse" <${process.env.GACVERSE_EMAIL}>`,
  subject: "Your OTP Code for Verification",
  user: process.env.GACVERSE_EMAIL!,
  pass: process.env.GACVERSE_EMAIL_PASSWORD!
};
