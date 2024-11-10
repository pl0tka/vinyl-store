export default () => ({
    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_PORT: parseInt(process.env.NODEMAILER_PORT, 10),
    NODEMAILER_SECURE: process.env.NODEMAILER_SECURE === 'true',
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
});
