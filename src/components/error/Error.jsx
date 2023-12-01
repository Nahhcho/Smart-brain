import React from 'react'

const Error = ({message}) => {
  return (
    <div class="alert alert-warning" role="alert">
        {message}
    </div>
  )
}

export default Error