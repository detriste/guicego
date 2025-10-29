'use client'

import { Box, Typography } from '@mui/material'
import CardsResumo from './components/Cardsresumo'
import GridDeposito from './components/GridDeposito'
import FeedAtividades from './components/FeedAtividades'

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Painel de Operações — Depósito Central
      </Typography>

      {/* Cards de Resumo */}
      <CardsResumo />

      {/* Layout principal */}
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          mt: 2,
          alignItems: 'flex-start',
        }}
      >
        {/* Coluna esquerda (maior) */}
        <Box sx={{ flex: 2 }}>
          <GridDeposito />
        </Box>

        {/* Coluna direita (menor) */}
        <Box sx={{ flex: 1 }}>
          <FeedAtividades />
        </Box>
      </Box>
    </Box>
  )
}
