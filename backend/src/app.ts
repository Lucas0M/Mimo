import cors from "cors";
import express from "express";
import { capsulesRouter } from "./routes/capsules.js";
import { checkoutRouter } from "./routes/checkout.js";
import { healthRouter } from "./routes/health.js";

export const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api", (_request, response) => {
  response.json({
    service: "AuraBox API",
    status: "ok",
    routes: [
      "GET /health",
      "GET /api",
      "GET /api/capsules",
      "GET /api/capsules/demo",
      "GET /api/capsules/:slug",
      "POST /api/capsules/drafts",
      "POST /api/capsules",
      "POST /api/checkout/sessions",
    ],
  });
});

app.use("/health", healthRouter);
app.use("/api/capsules", capsulesRouter);
app.use("/api/checkout", checkoutRouter);

app.use((request, response) => {
  response.status(404).json({
    error: "Not Found",
    path: request.path,
  });
});
