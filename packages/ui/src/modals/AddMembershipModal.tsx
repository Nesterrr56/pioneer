import React, { useCallback, useState } from 'react'
import { ButtonPrimaryMedium } from '../components/buttons'
import { Checkbox, InlineToggleWrap, Label, LabelLink, TextInput, ToggleCheckbox } from '../components/forms'
import { Help } from '../components/Help'
import { Modal, ModalFooter, ModalHeader, ScrolledModalBody } from '../components/Modal'
import { filterAccount, SelectAccount } from '../components/selects/SelectAccount'
import { Text, TokenValue } from '../components/typography'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useObservable } from '../hooks/useObservable'
import { BalanceInfoNarrow, InfoTitle, InfoValue, Row } from './common'

interface MembershipModalProps {
  onClose: () => void
}

type ModalState = 'Create' | 'Authorize'

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  const { api } = useApi()
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [])
  const [state, setState] = useState<ModalState>('Create')
  const [rootAccount, setRootAccount] = useState<Account | undefined>()
  const [controllerAccount, setControllerAccount] = useState<Account | undefined>()
  const [name, setName] = useState('')
  const [handle, setHandle] = useState('')
  const [about, setAbout] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isReferred, setIsReferred] = useState(false)
  const [hasTermsAgreed, setTerms] = useState(false)
  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])
  const isValid = !isReferred && rootAccount && controllerAccount && name && handle && about && avatar && hasTermsAgreed

  const stubHandler = () => undefined

  const onSubmit = () => {
    setState('Authorize')
  }

  if (state === 'Create') {
    return (
      <Modal modalSize={'m'}>
        <ModalHeader onClick={onClose} title="Add membership" />
        <ScrolledModalBody>
          <Row>
            <InlineToggleWrap>
              <Label>I was referred by a member: </Label>
              <ToggleCheckbox trueLabel="Yes" falseLabel="No" onChange={setIsReferred} checked={isReferred} disabled />
            </InlineToggleWrap>
            <TextInput
              type="text"
              value="Select Member or type a member"
              disabled={!isReferred}
              onChange={stubHandler}
            />
            <p>Please fill in all the details below.</p>
          </Row>

          <Row>
            <Label>
              Root account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} /> *
            </Label>
            <SelectAccount filter={filterRoot} onChange={setRootAccount} />
          </Row>

          <Row>
            <Label>
              Controller account <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} /> *
            </Label>
            <SelectAccount filter={filterController} onChange={setControllerAccount} />
          </Row>

          <Row>
            <Label>Member Name *</Label>
            <TextInput type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </Row>

          <Row>
            <Label>Membership handle *</Label>
            <TextInput type="text" value={handle} onChange={(event) => setHandle(event.target.value)} />
          </Row>

          <Row>
            <Label>About Member *</Label>
            <TextInput type="text" value={about} onChange={(event) => setAbout(event.target.value)} />
          </Row>

          <Row>
            <Label>Member Avatar *</Label>
            <TextInput type="text" value={avatar} onChange={(event) => setAvatar(event.target.value)} />
          </Row>
        </ScrolledModalBody>
        <ModalFooter>
          <Label>
            <Checkbox id={'privacy-policy-agreement'} onChange={(value) => setTerms(value)}>
              <Text size={2} dark={true}>
                I agree to our{' '}
                <LabelLink href={'http://example.com/'} target="_blank">
                  Terms of Service
                </LabelLink>{' '}
                and{' '}
                <LabelLink href={'http://example.com/'} target="_blank">
                  Privacy Policy
                </LabelLink>
                .
              </Text>
            </Checkbox>
          </Label>
          <BalanceInfoNarrow>
            <InfoTitle>Creation fee:</InfoTitle>
            <InfoValue>
              <TokenValue value={membershipPrice?.toBn()} />
            </InfoValue>
            <Help helperText={'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'} />
          </BalanceInfoNarrow>
          <ButtonPrimaryMedium onClick={onSubmit} disabled={!isValid}>
            Create a Membership
          </ButtonPrimaryMedium>
        </ModalFooter>
      </Modal>
    )
  }

  return (
    <Modal modalSize={'xs'} modalHeight={'s'}>
      <ModalHeader onClick={onClose} title="Authorize transaction" />
    </Modal>
  )
}