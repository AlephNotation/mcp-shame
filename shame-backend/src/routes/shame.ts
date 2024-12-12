import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { insertShame, getShamesByUuid, getAllShames } from "../db/index";

const router = new Hono();

// Validation schema for shame submission
const shameSchema = z.object({
  uuid: z.string().uuid(),
  complaint: z.string().min(1).max(1000),
});

// POST /shame - Submit a new shame
router.post("/", zValidator("json", shameSchema), async (c) => {
  const { uuid, complaint } = c.req.valid("json");

  try {
    insertShame(uuid, complaint);
    return c.json({ success: true, message: "Shame recorded successfully" });
  } catch (error) {
    return c.json({ success: false, error: "Failed to record shame" }, 500);
  }
});

// GET /shame/:uuid - Get shames by UUID
router.get("/:uuid", async (c) => {
  const uuid = c.req.param("uuid");

  try {
    const shames = getShamesByUuid(uuid);
    return c.json({ success: true, shames });
  } catch (error) {
    return c.json({ success: false, error: "Failed to retrieve shames" }, 500);
  }
});

// GET /shame - Get all shames (maybe protect this with auth in production)
router.get("/", async (c) => {
  try {
    const shames = getAllShames();
    return c.json({ success: true, shames });
  } catch (error) {
    return c.json({ success: false, error: "Failed to retrieve shames" }, 500);
  }
});

export default router;
