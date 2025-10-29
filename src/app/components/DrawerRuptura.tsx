'use client'
import { Drawer, Box, Typography, Button } from '@mui/material'
import { useState } from 'react'

export default function DrawerRuptura() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Ver detalhes da ruptura
      </Button>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 400, p: 3 }}>
          <Typography variant="h6">Pedido #1054</Typography>
          <Typography>Item: Caixa de Parafusos 8mm</Typography>
          <Typography>Funcionário: Marcos</Typography>

          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="contained" color="primary">Reatribuir Pedido</Button>
            <Button variant="contained" color="secondary">Substituir Item</Button>
            <Button variant="contained" color="success">Marcar como Resolvido</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
