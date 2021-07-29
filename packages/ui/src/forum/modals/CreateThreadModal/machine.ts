import { createMachine, assign } from 'xstate'

import { EmptyObject } from '@/common/types'

export interface CreateThreadContext {
  topic?: string
  description?: string
}

type CreateThreadState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'generalDetails'; context: CreateThreadContext }
  | { value: 'end'; context: Required<CreateThreadContext> }

export type CreateThreadEvent =
  | { type: 'FAIL' }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SET_TOPIC'; topic: string }
  | { type: 'SET_DESCRIPTION'; description: string }

export const createThreadMachine = createMachine<CreateThreadContext, CreateThreadEvent, CreateThreadState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        NEXT: 'generalDetails',
        FAIL: 'requirementsFailed',
      },
    },
    requirementsFailed: { type: 'final' },
    generalDetails: {
      on: {
        NEXT: {
          target: 'end',
          cond: (context) => !!(context.topic && context.description),
        },
        SET_TOPIC: {
          actions: assign({
            topic: (_, event) => event.topic,
          }),
        },
        SET_DESCRIPTION: {
          actions: assign({
            description: (_, event) => event.description,
          }),
        },
      },
    },
    end: { type: 'final' },
  },
})