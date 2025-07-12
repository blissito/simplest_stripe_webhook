#!/bin/bash

# Script para deploy a Deno Deploy
echo "🚀 Deploying to Deno Deploy..."

# Opción 1: Deploy usando curl (más directo)
echo "📤 Subiendo archivo main.ts..."
# curl -f --upload-file main.ts https://dash.deno.com/api/deploy
deployctl deploy   

# Opción 2: Si tienes token de Deno Deploy
# curl -H "Authorization: Bearer $DENO_DEPLOY_TOKEN" \
#      -f --upload-file main.ts \
#      https://dash.deno.com/api/deploy

echo "✅ Deploy completado!"
echo "🌐 Tu webhook estará disponible en: https://[PROJECT_NAME].deno.dev" 