import 'dotenv/config';

const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function callDeepSeek(messages, tools = null) {
  const body = {
    model: 'deepseek-chat',
    messages: messages,
    temperature: 0.7,
    max_tokens: 500
  };

  if (tools) {
    body.tools = tools;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('DeepSeek API Error:', error);
    throw new Error(`DeepSeek API调用失败: ${response.status}`);
  }

  return await response.json();
}

export async function callDeepSeekSimple(userMessage) {
  const messages = [
    { role: 'user', content: userMessage }
  ];
  
  const response = await callDeepSeek(messages);
  return response.choices[0].message.content;
}

export { callDeepSeek as callQwen, callDeepSeekSimple as callQwenSimple };
