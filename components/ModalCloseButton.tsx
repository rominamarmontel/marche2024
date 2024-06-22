import React from 'react'

interface ModalCloseButtonProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  show,
  setShow,
}) => {
  if (show) {
    return (
      <button
        onClick={() => setShow(false)}
        style={{ position: 'fixed', top: 30, right: 25, zIndex: 3 }}
      >
        X
      </button>
    )
  }

  return null
}

export default ModalCloseButton
