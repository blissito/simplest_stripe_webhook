import { Application, Router } from "oak";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

// Get webhook secret from environment
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

const router = new Router();

// Root endpoint
router.get("/", (ctx) => {
  ctx.response.body = { madeBy: "@blissito", message: "t(*_*t)" };
});

// Health check endpoint
router.get("/health", (ctx) => {
  ctx.response.body = { status: "ok", message: "Webhook server is running" };
});

// Stripe webhook endpoint
router.post("/webhook", async (ctx) => {
  try {
    const body = await ctx.request.body({ type: "text" }).value;
    const signature = ctx.request.headers.get("stripe-signature");

    if (!signature || !webhookSecret) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Missing signature or webhook secret" };
      return;
    }

    let event: Stripe.Event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid signature" };
      return;
    }

    // Handle only payment_intent.succeeded events
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("✅ Payment succeeded:", {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        customer: paymentIntent.customer,
        created: new Date(paymentIntent.created * 1000).toISOString(),
      });

      // Here you can add your business logic
      // For example: update database, send confirmation email, etc.

      ctx.response.status = 200;
      ctx.response.body = { received: true };
    } else {
      // Log other events but don't process them
      console.log(`⚠️ Ignoring event type: ${event.type}`);
      ctx.response.status = 200;
      ctx.response.body = { received: true, ignored: true };
    }
  } catch (error) {
    console.error("Webhook error:", error);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

const app = new Application();

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Unhandled error:", err);
    ctx.response.status = 500;
    ctx.response.body = { error: "Internal server error" };
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(Deno.env.get("PORT") || "8000");
console.log(`🚀 Webhook server running on http://localhost:${port}`);

await app.listen({ port });
