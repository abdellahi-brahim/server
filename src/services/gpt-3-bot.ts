import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from "openai";
import Message from '../models/Message';

// TODO: Configure the OpenAI API in an initializer and cache the context

export async function getBotMessage(text: string): Promise<string> {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const message_history = await Message.find().sort('timestamp');

    const messages = message_history.map(message => {
      return {
        role: message.type === 'user' ? ChatCompletionRequestMessageRoleEnum.User : ChatCompletionRequestMessageRoleEnum.Assistant,
        content: message.content,
      };
    });

    messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: text
    });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const content = completion?.data?.choices?.[0]?.message?.content;

    if (content) {
      return content.trim();
    } else {
      throw new Error('Failed to parse bot message');
    }

  } catch (err) {
    console.error('Failed to get bot message', err);
    return 'Sorry, I am currently unable to respond.';
  }
}
