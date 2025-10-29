'use client'

import { useState } from 'react'
import {
  Box,
  Drawer,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Card,
  CardContent,
} from '@mui/material'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import InventoryIcon from '@mui/icons-material/Inventory'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function ResolverRuptura() {
  const [open, setOpen] = useState(false)

  const pedido = {
    id: '#1054',
    funcionario: 'Carlos Almeida',
    itensFaltantes: [
      { nome: 'Detergente 1L', qtd: 3 },
      { nome: 'Sabão em pó 500g', qtd: 2 },
    ],
  }

  const abrirPainel = () => setOpen(true)
  const fecharPainel = () => setOpen(false)

  const handleAcao = (acao: string) => {
    alert(`Ação executada: ${acao}`)
    fecharPainel()
  }

  return (
    <Box>
      {/* Botão que simula o clique no alerta */}
      <Button
        variant="contained"
        color="error"
        onClick={abrirPainel}
        sx={{ borderRadius: 2 }}
      >
        🚨 Resolver Ruptura
      </Button>

      {/* Painel lateral */}
      <Drawer anchor="right" open={open} onClose={fecharPainel}>
        <Box sx={{ width: 360, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Resolver Ruptura
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Detalhes do pedido */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">
                Pedido:
              </Typography>
              <Typography variant="h6">{pedido.id}</Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                Funcionário:
              </Typography>
              <Typography variant="body1">{pedido.funcionario}</Typography>
            </CardContent>
          </Card>

          {/* Itens faltantes */}
          <Typography variant="subtitle1" gutterBottom>
            Itens Faltantes:
          </Typography>
          <List dense>
            {pedido.itensFaltantes.map((item, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={item.nome}
                  secondary={`Quantidade: ${item.qtd}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Ações */}
          <Stack spacing={2}>
            <Button
              startIcon={<AutorenewIcon />}
              variant="outlined"
              onClick={() => handleAcao('Reatribuir Pedido')}
            >
              Reatribuir pedido
            </Button>
            <Button
              startIcon={<InventoryIcon />}
              variant="outlined"
              onClick={() => handleAcao('Substituir Item')}
            >
              Substituir item
            </Button>
            <Button
              startIcon={<CheckCircleIcon />}
              variant="contained"
              color="success"
              onClick={() => handleAcao('Marcar como Resolvido')}
            >
              Marcar como resolvido
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}
