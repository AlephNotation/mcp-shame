import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import { insertShame, getAllShames, getShamesByUuid } from "./db/index";
import { z } from "zod";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors());

// Serve static files
app.use("/", serveStatic({ root: "./src/static" }));

// Validation schema
const shameSchema = z.object({
  uuid: z.string().uuid(),
  complaint: z.string().min(1).max(1000),
});

// API Routes
app.post("/shame", async (c) => {
  try {
    const body = await c.req.json();
    const { uuid, complaint } = shameSchema.parse(body);

    insertShame(uuid, complaint);
    return c.json({ success: true, message: "Shame recorded successfully" });
  } catch (error) {
    return c.json({ success: false, error: "Failed to record shame" }, 400);
  }
});

app.get("/shame", async (c) => {
  try {
    const shames = getAllShames();
    return c.json({ success: true, shames });
  } catch (error) {
    return c.json({ success: false, error: "Failed to retrieve shames" }, 500);
  }
});

// Add new endpoint for getting shames by UUID
app.get("/shame/:uuid", async (c) => {
  try {
    const uuid = c.req.param("uuid");
    const shames = getShamesByUuid(uuid);
    return c.json({ success: true, shames });
  } catch (error) {
    return c.json({ success: false, error: "Failed to retrieve shames" }, 500);
  }
});

app.get("/health", async (c) => {
  return c.json({ success: true, message: "Server is healthy" });
});

// Start server
console.log("🚀 Server starting at http://localhost:3000");

export default {
  port: 3000,
  fetch: app.fetch,
};
