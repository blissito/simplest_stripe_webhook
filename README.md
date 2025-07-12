# Stripe Webhook - Deno

Un webhook simple para Stripe que solo recibe eventos `payment_intent.succeeded` usando Deno.

## 🚀 Deploy

```bash
./deploy.sh
```

## 🌐 URLs

- **Raíz**: https://neat-camel-59-7fgp0hcj6pzd.deno.dev/
- **Health**: https://neat-camel-59-7fgp0hcj6pzd.deno.dev/health
- **Webhook**: https://neat-camel-59-7fgp0hcj6pzd.deno.dev/webhook

## ⚙️ Configuración

### Variables de entorno (en Deno Deploy):

- `STRIPE_SECRET_KEY` - Tu clave secreta de Stripe
- `STRIPE_WEBHOOK_SECRET` - Tu webhook secret de Stripe

### Configurar webhook en Stripe:

1. Ve a [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Crea un nuevo webhook
3. URL: `https://neat-camel-59-7fgp0hcj6pzd.deno.dev/webhook`
4. Eventos: Solo `payment_intent.succeeded`

## 🧪 Desarrollo local

```bash
# Instalar Deno
curl -fsSL https://deno.land/x/install/install.sh | sh

# Ejecutar servidor
deno task dev

# Probar
deno run --allow-net test-webhook.ts
```

## 📝 Endpoints

- `GET /` - Mensaje personalizado
- `GET /health` - Health check
- `POST /webhook` - Webhook de Stripe

## 🔒 Seguridad

- ✅ Verificación de firma de webhook
- ✅ Solo procesa `payment_intent.succeeded`
- ✅ Variables de entorno para claves secretas

---

Made with ❤️ by @blissito
