import { describe, expect, it } from 'vitest';
import { format_message_content } from './format_message';

const code = (value: string) => {
	return { type: 'code', content: value } as const;
};
const text = (value: string) => {
	return { type: 'text', content: value } as const;
};

const message = `
As an AI language model, I don't have access to server-side functionality. However, here's the general concept of publishing an event in JavaScript:

1. Define the event you want to publish with a custom name. For example:

\`\`\`
const myEvent = new CustomEvent("myCustomEvent", { detail: { message: "Hello world!" } });
\`\`\`

2. Dispatch the event using the \`dispatchEvent()\` method. 

\`\`\`
document.dispatchEvent(myEvent);
\`\`\`

3. Listen for the event using \`addEventListener()\`. 

\`\`\`
document.addEventListener("myCustomEvent", function(event) {
  console.log(event.detail.message); // Prints "Hello world!"
});
\`\`\`

This way, when the event is published, any function that has subscribed/listened for that event will be executed."
`;

describe('format message', () => {
	it('formats correctly for code blocks', () => {
		const blocks = format_message_content(message);

		expect(blocks).toStrictEqual([
			text(
				"As an AI language model, I don't have access to server-side functionality. However, here's the general concept of publishing an event in JavaScript:"
			),
			text(
				'1. Define the event you want to publish with a custom name. For example:'
			),
			code(
				'const myEvent = new CustomEvent("myCustomEvent", { detail: { message: "Hello world!" } });'
			),
			text('2. Dispatch the event using the `dispatchEvent()` method. '),
			code('document.dispatchEvent(myEvent);'),
			text('3. Listen for the event using `addEventListener()`. '),
			code(
				'document.addEventListener("myCustomEvent", function(event) {\n' +
					'  console.log(event.detail.message); // Prints "Hello world!"\n' +
					'});'
			),
			text(
				'This way, when the event is published, any function that has subscribed/listened for that event will be executed."'
			)
		]);
	});
});
