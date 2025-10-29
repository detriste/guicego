'use client'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [hora, setHora] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setHora(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatarHora = (d: Date) =>
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarehouseIcon />
          <Typography variant="h6" component="div">
            Painel Cego da Logística
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon />
          <Typography variant="body1">{formatarHora(hora)}</Typography>
          <Typography variant="body2" sx={{ ml: 2 }}>
            Supervisor: Carlos
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
