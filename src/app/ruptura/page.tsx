'use client'

import { Box, Card, CardContent, Typography, Divider, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function PaginaRuptura() {
  const router = useRouter()

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🚨 Detalhes da Ruptura
      </Typography>

      <Card sx={{ maxWidth: 600, p: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pedido #1054 — Ruptura no Setor A3
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Funcionário:</strong> Marcos da Silva
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Itens faltantes:</strong> 2x Caixa de Parafusos 10mm, 1x Chave Allen
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Status atual:</strong> Em análise
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Botões de ação */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="outlined" color="primary">
              🔁 Reatribuir Pedido
            </Button>
            <Button variant="outlined" color="warning">
              📦 Substituir Item
            </Button>
            <Button variant="contained" color="success">
              ✅ Marcar como Resolvido
            </Button>
          </Box>

          {/* Botão para voltar ao dashboard */}
          <Box sx={{ mt: 4 }}>
            <Button variant="text" onClick={() => router.push('/')}>
              ← Voltar ao Painel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
