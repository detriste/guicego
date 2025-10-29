'use client'
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material'
import { useState } from 'react'

interface Atividade {
  hora: string
  texto: string
}

export default function FeedAtividades() {
  const [atividades] = useState<Atividade[]>([
    { hora: '08:15', texto: 'Marcos iniciou coleta do Pedido #1054' },
    { hora: '08:12', texto: 'Fernanda finalizou Pedido #1051' },
    { hora: '08:05', texto: 'João iniciou separação de Pedido #1053' },
  ])

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🕒 Atividades Recentes
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <List dense>
          {atividades.map((item, i) => (
            <ListItem key={i} disablePadding>
              <ListItemText
                primary={item.texto}
                secondary={item.hora}
                primaryTypographyProps={{ fontSize: '0.9rem' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
