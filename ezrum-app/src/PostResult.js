import React from 'react'

export const PostResult = ({ resource }) => {
  const data = resource.result.read();
  if (!data) {
    return null
  }

  return (
    <div>

      post request result: {JSON.stringify(data)}
    </div>
  )
}