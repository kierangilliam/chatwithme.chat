import '@total-typescript/ts-reset';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ChatWithMe {
	export namespace API {
		export type Message = {
			role: 'user' | 'assistant';
			content: string;
		};

		export type Choice = {
			message: Message;
			finish_reason: 'stop';
			index: number;
		};

		export type Completion = {
			// chatcmpl-6pSl2Nmyw9K0G1g7i56k2Siq5oe3c
			id: string;
			// chat.completion
			object: string;
			// 1677723292
			created: number;
			// gpt-3.5-turbo-0301
			model: string;
			usage: {
				// 10
				prompt_tokens: number;
				// 45
				completion_tokens: number;
				// 55
				total_tokens: number;
			};
			choices: Choice[];
		};

		export type CompletionResponse =
			| { type: 'success'; data: Completion }
			| { type: 'error'; kind: 'unknown' };
	}
}

export class OpenAIAPI {
	api_token: string;
	model = 'gpt-3.5-turbo';

	constructor() {
		this.api_token = '';
	}

	get headers() {
		return {
			Authorization: `Bearer ${this.api_token}`,
			'Content-Type': 'application/json'
		};
	}

	update_api_token(token: string) {
		this.api_token = token;
	}

	async completion(
		messages: ChatWithMe.API.Message[]
	): Promise<ChatWithMe.API.CompletionResponse> {
		const input = {
			model: this.model,
			messages
		};

		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: this.headers,
			method: 'POST',
			body: JSON.stringify(input)
		});

		// TODO: Check response code
		// TODO: Emit useful warning when api token is invalid

		const json = await response.json();
		const data = json as ChatWithMe.API.Completion;

		return { type: 'success', data };
	}
}
