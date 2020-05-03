import React from 'react'
import { withRouter } from 'next/router'
import { useCopyTextHandler, useAsyncCallback } from 'actionsack'
import morph from 'morphmorph'
import RecordSVG from './svg/Record'

import { COLORS } from '../lib/constants'
import Button from './Button'
import Popout, { managePopout } from './Popout'

const toIFrame = url =>
  `<iframe
  src="${location.origin}/embed${url.replace(/^\/\?/, '?')}"
  style="transform:scale(0.7); width:1024px; height:473px; border:0; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin">
</iframe>
`

const toURL = url => `${location.origin}${url}`
const toEncodedURL = morph.compose(encodeURI, toURL)

function CopyButton(props) {
  return (
    <Button
      {...props}
      hoverColor={COLORS.SECONDARY}
      color="rgba(255, 255, 255, 0.7)"
      padding="8px"
    />
  )
}

const CopyEmbed = withRouter(({ router: { asPath }, mapper, title }) => {
  const text = React.useMemo(() => mapper(asPath), [mapper, asPath])
  const { onClick, copied } = useCopyTextHandler(text)

  return <CopyButton onClick={onClick}>{copied ? 'Copied!' : title}</CopyButton>
})

const popoutStyle = { width: '140px', right: 0 }

function useClipboardSupport() {
  const [isClipboardSupports, setClipboardSupport] = React.useState(false)

  React.useEffect(() => {
    setClipboardSupport(
      window.navigator && window.navigator.clipboard && typeof ClipboardItem === 'function'
    )
  }, [])

  return isClipboardSupports
}

function RecordButton({ isVisible, isRecording, toggleRecording, copyImage }) {
  const clipboardSupported = useClipboardSupport()

  const [showCopied, { loading: copied }] = useAsyncCallback(
    () => new Promise(res => setTimeout(res, 1000))
  )

  const [copy, { loading }] = useAsyncCallback(async (...args) => {
    await copyImage(...args)
    showCopied()
  })

  return (
    <div className="recording-menu-container">
      <div className="flex">
        <Button
          center
          border
          large
          padding="0 16px"
          margin="0 8px 0 0"
          onClick={toggleRecording}
          color={isRecording ? 'red' : COLORS.SECONDARY}
        >
          <RecordSVG size={16} isRecording={isRecording} color={isRecording ? 'red' : COLORS.SECONDARY} />
        </Button>
      </div>
      <style jsx>
        {`
          .recording-menu-container {
            position: relative;
            color: ${COLORS.SECONDARY};
            flex: 1;
          }
        `}
      </style>
    </div>
  )
}

export default managePopout(React.memo(RecordButton))
