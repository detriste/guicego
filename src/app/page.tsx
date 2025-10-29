'use client'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import CardsResumo from './components/Cardsresumo'
import GridDeposito from './components/GridDeposito'
import FeedAtividades from './components/FeedAtividades'

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Painel de Operações — Depósito Central
      </Typography>

      <CardsResumo />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={8}>
          <GridDeposito />
        </Grid>
        <Grid item xs={4}>
          <FeedAtividades />
        </Grid>
      </Grid>
    </Box>
  )
}
