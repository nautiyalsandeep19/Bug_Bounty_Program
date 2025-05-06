const otpEmailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
      <p style="font-size: 16px; color: #555;">
        Use the following OTP to complete your verification. This code is valid for the next 15 minutes.
      </p>
      <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 15px; background-color: #f1f1f1; text-align: center; border-radius: 6px;">
        ${otp}
      </div>
      <p style="font-size: 14px; color: #999;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  `
}

export default otpEmailTemplate
