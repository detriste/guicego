'use client'

import { Box, Card, CardContent, Typography } from '@mui/material'

export default function CardsResumo() {
  const cards = [
    { title: 'Pedidos Pendentes', value: 18 },
    { title: 'Rupturas Hoje', value: 2 },
    { title: 'Tempo Médio de Expedição', value: '24 min' },
  ]

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
      sx={{ mt: 2 }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            backgroundColor: '#fff',
            flex: '1 1 30%',
            minWidth: 250,
            textAlign: 'center',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              {card.title}
            </Typography>
            <Typography variant="h4" color="text.primary" fontWeight="bold">
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
