import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ProposalVoteKind } from '@/common/api/queries'
import { SideBar, voteControl } from '@/common/components/storybookParts/previewStyles'
import { repeat } from '@/common/utils'
import { getMember } from '@/mocks/helpers'
import { countVoteMap, VoteMap } from '@/proposals/hooks/useVotingRounds'

import { VotesPreview } from './VotesPreview'

export default {
  title: 'Proposals/ProposalPreview/VotesPreview',
  component: VotesPreview,
  argTypes: {
    approve: voteControl,
    reject: voteControl,
    slash: voteControl,
    councilSize: { control: { type: 'range', min: 0, max: 30 } },
  },
} as Meta

const { Approve, Reject, Slash, Abstain } = ProposalVoteKind

interface Args {
  approve: number
  reject: number
  slash: number
  abstain: number
  councilSize: number
}

export const Default: Story<Args> = ({ approve = 0, reject = 0, slash = 0, abstain = 0, councilSize }) => {
  const lengths: [ProposalVoteKind, number][] = [
    [Approve, approve],
    [Reject, reject],
    [Slash, slash],
    [Abstain, abstain],
  ]

  const map: VoteMap = new Map(
    lengths.map(([voteKind, length]) => [
      voteKind,
      repeat(() => ({ voteKind, id: '1', votingRound: 1, voter: getMember('alice') }), length),
    ])
  )

  const count = countVoteMap(map, approve + slash + reject + abstain, councilSize || undefined)

  return (
    <SideBar>
      <VotesPreview votes={{ map, count }} />
    </SideBar>
  )
}

Default.args = {
  approve: 3,
  reject: 1,
  slash: 0,
  councilSize: 12,
}
