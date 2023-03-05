import type { ChatWithMe } from '$lib/client/OpenAI';

export const user = (content: string): ChatWithMe.API.Message => {
	return { role: 'user', content: content.trim() };
};

export const assistant = (content: string): ChatWithMe.API.Message => {
	return { role: 'assistant', content: content.trim() };
};
