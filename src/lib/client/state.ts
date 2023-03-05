import { getContext, setContext } from 'svelte'
import type { Readable } from 'svelte/store'
import type { ChatWithMe } from './OpenAI'

export type State = {
	chats: Readable<ChatWithMe.Models.Chat[]>
	api_token: Readable<string | null>
	set_api_token: (token: string) => Promise<void>
	add_message: (id: string, message: ChatWithMe.API.Message) => void
}

const context = {}

export const setStateContext = (state: State) => {
	return setContext<State>(context, state)
}

export const getStateContext = () => {
	return getContext<State>(context)
}
