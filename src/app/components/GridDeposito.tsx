'use client'
import { Grid, Card, Typography } from '@mui/material'

const setores = [
  { nome: 'A1', status: 'ok' },
  { nome: 'A2', status: 'ok' },
  { nome: 'A3', status: 'ruptura' },
  { nome: 'B1', status: 'ok' },
  { nome: 'B2', status: 'alerta' },
  { nome: 'C1', status: 'ok' },
]

const getColor = (status: string) => {
  switch (status) {
    case 'ok': return '#81c784'
    case 'alerta': return '#fff176'
    case 'ruptura': return '#e57373'
    default: return '#e0e0e0'
  }
}

export default function GridDeposito() {
  return (
    <Grid container spacing={2}>
      {setores.map((s) => (
        <Grid >
          <Card sx={{ bgcolor: getColor(s.status), p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{s.nome}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
