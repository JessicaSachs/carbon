import React from 'react'

const SVG_RATIO = 0.81

const Record = ({ size, color, isRecording }) => {
  const width = size * SVG_RATIO
  const height = size

  const animate = isRecording ?
    <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite" /> :
    ''

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={5} cy={5} r={5} fill={color}>
        { animate }
      </circle>
    </svg>
  )
}

Record.defaultProps = {
  size: 16,
}

export default Record
