import React from 'react'

import { COLORS } from '../lib/constants'

const LoadingModal = React.memo(() => {
  return (
    <div className="loading-modal">
      <div className="loading-wrapper">
        <div className="loading-inner">
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            alignSelf: 'center',
            justifySelf: 'center',
            display: 'block'
          }}>Finalizing your recording</div>
        </div>
      </div>
      <style jsx>
        {`
          .loading-modal {
            background-color: rgba(0,0,0,.3);
            position: absolute;
            display: block;
            z-index: 1000;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            align-items: center;
            justify-content: cetner;
            // background: white;
          }
          
          .loading-wrapper {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%; 
            justify-content: center;
            align-items: center;
          }
          
          .loading-inner {
            width: 770px;
            height: 519px;
            background: rgba(0,0,0,.2);
            align-self: center;
            justify-self: center;
            justify-content: center;
            align-items: center;
            text-align: center;
            display: flex;
            background-image: url('/static/svg/loadingBackground.svg');
        `}
      </style>
    </div>
  )
})

export default LoadingModal
