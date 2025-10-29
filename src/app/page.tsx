'use client'

import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import CardsResumo from './components/Cardsresumo'
import GridDeposito from './components/GridDeposito'
import FeedAtividades from './components/FeedAtividades'

export default function Dashboard() {
  const router = useRouter()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Painel de Operações — Depósito Central
        </Typography>

        {/* Botão para a página de ruptura */}
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: 2 }}
          onClick={() => router.push('/ruptura')}
        >
          🚨 Resolver Ruptura
        </Button>
      </Box>

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
        <Box sx={{ flex: 2 }}>
          <GridDeposito />
        </Box>

        <Box sx={{ flex: 1 }}>
          <FeedAtividades />
        </Box>
      </Box>
    </Box>
  )
}
