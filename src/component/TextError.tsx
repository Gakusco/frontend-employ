import React from 'react'

export const TextError = ({ ...rest }) => {
  return (
    <div>
      <small className="text-danger">{rest.children}</small>
    </div>
  )
}
