import React from 'react'
import { useLocation } from 'react-router-dom'

export const NoMatch = () => {
  const location = useLocation();
  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center'}}>
      <h3>
        La dirección <code>{location.pathname}</code> no ha sido encontrada
      </h3>
    </div>
  )
}
