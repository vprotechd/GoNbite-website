import nodemailer from "nodemailer";
import {config} from "../config.js";
let transporter=null;
if(config.smtp.host && config.smtp.user && config.smtp.pass){
 transporter=nodemailer.createTransport({host:config.smtp.host,port:config.smtp.port,secure:config.smtp.secure,auth:{user:config.smtp.user,pass:config.smtp.pass}});
}
export async function sendVerificationEmail({to,name,token}){
 const verifyUrl=`${config.frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
 if(!transporter){ console.warn(`[email] SMTP is not configured. Verification URL: ${verifyUrl}`); return false; }
 await transporter.sendMail({
  from:config.smtp.from,to,subject:"Verify your GoNbite email address",
  text:`Hi ${name},\n\nVerify your GoNbite account here:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nGoNbite`,
  html:`<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;padding:35px;color:#34271f"><h1 style="color:#ff6b35">GoNbite</h1><h2>Verify your email</h2><p>Hi ${name}, please verify your email address to activate your account.</p><p><a href="${verifyUrl}" style="display:inline-block;background:#ff6b35;color:#fff;text-decoration:none;padding:13px 20px;border-radius:10px;font-weight:700">Verify email</a></p><p style="color:#777;font-size:13px">This link expires in 24 hours.</p></div>`
 });
 return true;
}
