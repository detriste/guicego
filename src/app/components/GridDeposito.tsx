'use client'

import { Box, Card, Typography } from '@mui/material'

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
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {setores.map((s) => (
        <Box
          key={s.nome}
          sx={{
            flex: '1 1 calc(33.33% - 16px)', // 3 colunas com espaçamento
            minWidth: 120,
          }}
        >
          <Card sx={{ bgcolor: getColor(s.status), p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{s.nome}</Typography>
          </Card>
        </Box>
      ))}
    </Box>
  )
}
