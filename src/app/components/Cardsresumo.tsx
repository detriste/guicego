'use client'
import { Card, CardContent, Typography, Box } from '@mui/material'

export default function CardsResumo() {
  const cards = [
    { title: 'Pedidos Pendentes', value: 18 },
    { title: 'Rupturas Hoje', value: 2 },
    { title: 'Tempo Médio de Expedição', value: '24 min' },
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            flex: '1 1 30%',
            minWidth: 200,
            backgroundColor: '#fff',
            boxShadow: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {card.title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
