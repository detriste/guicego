'use client'
import { Snackbar, Alert } from '@mui/material'
import { useState, useEffect } from 'react'

export default function AlertaToast() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000) // simula alerta após 3s
    return () => clearTimeout(timer)
  }, [])

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
      <Alert severity="error" onClose={() => setOpen(false)}>
        🚨 Ruptura detectada no Pedido #1054 (Setor A3)
      </Alert>
    </Snackbar>
  )
}
