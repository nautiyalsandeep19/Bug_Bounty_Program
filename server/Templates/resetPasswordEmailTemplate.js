const resetPasswordEmailTemplate = (resetLink) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #333;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to reset your password. Click the button below to proceed. This link is valid for the next 5 minutes.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="display: inline-block; background-color: #007BFF; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #999;">
          If you did not request a password reset, please ignore this email.
        </p>
      </div>
    `
}

export default resetPasswordEmailTemplate
