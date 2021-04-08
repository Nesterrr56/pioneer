import React from 'react'

import { FailureIcon } from '../../../common/components/icons/FailureIcon'
import { Modal, ModalHeader, ModalTitle, ResultModalBody, ResultText } from '../../../common/components/Modal'

interface Props {
  onClose: () => void
}

export const TransferInviteFailureModal = ({ onClose }: Props) => (
  <Modal modalSize="xs" modalHeight="s" onClose={onClose}>
    <ModalHeader title="" onClick={onClose} modalHeaderSize="s" />
    <ResultModalBody>
      <FailureIcon />
      <ModalTitle as="h4">
        <span className="red-title">Oh no!</span> Failure
      </ModalTitle>
      <ResultText>There was a problem transfering your invites.</ResultText>
    </ResultModalBody>
  </Modal>
)