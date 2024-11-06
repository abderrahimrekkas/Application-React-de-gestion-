import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, mailTrapSender } from "./mailtrap.config.js";

export const sendVerificationEmail=async (email, verificationCode)=> {
    const recipient=[{email}];

    try{
        const response=await mailtrapClient.send({
            from: mailTrapSender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
            category: "Email verification"
        });

        console.log("Email sent successfully:", response);
    }catch(error){
        console.log("Email verification error:", error.message || error);
        throw new Error("Error: Sending email verification", error.message || error);
    }
}

export const sendWelcomeEmail=async (email, name)=> {
    const recipient=[{email}];

    try{
        const response=await mailtrapClient.send({
            from: mailTrapSender,
            to: recipient,
            template_uuid: "3cde2166-bdc5-4740-b9fd-a7151164c2a7",
            template_variables: {
                "name": "User"
            }
        });

        console.log("Welcome email sent successfully:", response);
    }catch(error){
        console.log("Welcome email error:", error.message || error);
        throw new Error("Error: Sending welcome email", error.message || error);
    }
}

export const sendResetPasswordEmail=async (email, url)=> {
    const recipient=[{email}];

    try{
        const response=await mailtrapClient.send({
            from: mailTrapSender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
            category: "Reset Password"
        });

        console.log("Reset password request mail sent successfully:", response)
    }catch(error){
        console.log("Password reset mail error:", error.message || error);
        throw new Error("Error: Sending password reset email", error.message || error);
    }
}

export const sendResetPasswordSuccessMail=async (email)=> {
    const recipient=[{email}];

    try{
        const response=await mailtrapClient.send({
            from: mailTrapSender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset Password Success"
        });

        console.log("Reset password success mail sent:", response);
    }catch(error){
        console.log("Password reset success mail error:", error.message || error);
        throw new Error("Error: Sending password reset success email", error.message || error);
    }
}