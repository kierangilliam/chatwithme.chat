# chatwithme.chat

An open source, MIT licensed, ChatGPT UI.

[chatwithme.chat](https://www.chatwithme.chat)

## Features

**No login** Bring your own API key.

**Private** Your chat history is only visible to you and OpenAI - no intermediaries.

**Secure** Your API key is never sent to any server other than OpenAI. It is saved locally, not in the cloud.

**Cost effective** Cheaper than ChatGPT Pro as you only pay for what you use.

## Security

All of your data is stored locally on your machine.

I do not have access to your API token or chat history.

You can verify this using two methods:
1. Inspect your browser's network requests. You'll only see your API key being sent to OpenAI.
2. Read the open source code in this repo.

## Running locally

ChatWithMe is built with [SvelteKit](https://kit.svelte.dev/).

```
git clone https://github.com/kierangilliam/chatwithme.chat
cd chatwithme.chat
npm install
npm run dev
```
