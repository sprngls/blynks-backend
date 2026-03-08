import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Zu viele Registrierungen. Bitte später erneut versuchen."
    }
});