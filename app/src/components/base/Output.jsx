import React from 'react'

const Output = ({output}) => {
  return (
    <div className='output-section'>
      <p>
      Output
      </p>
      <pre>
        {output}
      </pre>
    </div>
  )
}

export default Output
