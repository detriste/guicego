'use client'
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material'
import { useEffect, useState } from 'react'

interface Atividade {
  hora: string
  texto: string
}

export default function FeedAtividades() {
  const [atividades, setAtividades] = useState<Atividade[]>([
    { hora: '08:15', texto: 'Marcos iniciou coleta do Pedido #1054' },
    { hora: '08:12', texto: 'Fernanda finalizou Pedido #1051' },
    { hora: '08:05', texto: 'João iniciou separação de Pedido #1053' },
  ])

  // simula novas atividades a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      const novas = [
        'Ruptura detectada no Setor A3',
        'Novo pedido #1055 adicionado à fila',
        'Reatribuição do Pedido #1054 concluída',
      ]
      const novaAtividade = {
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        texto: novas[Math.floor(Math.random() * novas.length)],
      }
      setAtividades((a) => [novaAtividade, ...a.slice(0, 5)]) // mantém últimas 6
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
