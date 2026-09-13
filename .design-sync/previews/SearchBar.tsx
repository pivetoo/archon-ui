import * as React from 'react'
import { SearchBar } from 'archon-ui'

export function Campo() {
  const [valor, setValor] = React.useState('Horizonte')
  return (
    <div style={{ width: 360 }}>
      <SearchBar value={valor} onChange={setValor} placeholder="Buscar clientes" />
    </div>
  )
}

export function Gatilho() {
  return (
    <div style={{ width: 360 }}>
      <SearchBar asButton onButtonClick={() => undefined} placeholder="Buscar em todo o sistema" hotkeyHint="Ctrl K" />
    </div>
  )
}
