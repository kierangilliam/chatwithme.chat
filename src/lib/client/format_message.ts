export const format_message_content = (content: string) => {
	const parts: { type: 'code' | 'text'; content: string }[] = [];

	let buffer: string[] = [];
	let in_code_block = false;
	content.split('\n').forEach((line) => {
		if (line.trim() === '') {
			return;
		}

		if (line.trim() === '```' && in_code_block) {
			parts.push({ type: 'code', content: buffer.join('\n') });
			buffer = [];
			in_code_block = false;
			return;
		} else if (line.trim() === '```') {
			in_code_block = true;
			return;
		}

		if (in_code_block) {
			buffer.push(line);
			return;
		}

		parts.push({
			type: 'text',
			content: line
		});
	});

	return parts;
};
