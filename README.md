# Stripe Webhook - Deno

### by @blissito with love for @brendi projects

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

## 🚀 Características

- ✅ **Webhook de Stripe** - Procesa pagos exitosos
- ✅ **Notificaciones por email** - Envía correos a interesados
- ✅ **Estadísticas** - Monitorea el uso del webhook
- ✅ **Logs** - Registra todas las actividades
- ✅ **Testing** - Endpoint para pruebas locales
- ✅ **Health Check** - Monitoreo de salud del servicio

## 📝 Endpoints

- `GET /` - Mensaje personalizado
- `GET /health` - Health check
- `POST /webhook` - Webhook de Stripe
- `POST /email` - Enviar correo a interesados
- `GET /stats` - Estadísticas del webhook
- `GET /logs` - Ver logs recientes
- `POST /test` - Probar webhook localmente

## 🔒 Seguridad

- ✅ Verificación de firma de webhook
- ✅ Solo procesa `payment_intent.succeeded`
- ✅ Variables de entorno para claves secretas

## 📧 Email Notifications

### Enviar correo a interesados:

```bash
curl -X POST https://neat-camel-59-7fgp0hcj6pzd.deno.dev/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "interesado@example.com",
    "subject": "Nuevo pago recibido",
    "message": "Se ha procesado un nuevo pago exitoso"
  }'
```

### Ver estadísticas:

```bash
curl https://neat-camel-59-7fgp0hcj6pzd.deno.dev/stats
```

### Ver logs:

```bash
curl https://neat-camel-59-7fgp0hcj6pzd.deno.dev/logs
```

---

Made with 🚬🫁 by @blissito
