import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import paymentRoutes from "./src/routes/payment.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use("/api/v1/payments", paymentRoutes);

app.get("/health-check", (req, res) => {
  res.send("Health check passed!");
});

sequelize.authenticate().then(() => {
  app.listen(PORT, () => console.log(`### Servidor rodando na porta ${PORT} ###`));
});
