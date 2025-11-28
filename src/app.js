import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import rateLimit from "express-rate-limit";

// Rutas
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import pokemonRoutes from "./modules/pokemons/pokemon.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json());
app.use(cookie());
app.use(cors(corsOptions));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: "Demasiadas peticiones, intenta de nuevo más tarde",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15, // Solo 5 intentos de login
  message: "Demasiados intentos de inicio de sesión, intenta en 15 minutos",
  skipSuccessfulRequests: true, // No cuenta requests exitosos
});

// Aplicar rate limiter general primero
app.use(generalLimiter);

// Rutas con rate limiters específicos
app.use("/auth", authLimiter, authRoutes);
app.use(userRoutes);
app.use(pokemonRoutes);

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
});
