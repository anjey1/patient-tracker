'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UseChatOptions } from '@ai-sdk/react';
import { Message } from '@/components/ui/chat-message';

import { cn } from '@/lib/utils';
import { transcribeAudio } from '@/lib/audio';
import { Chat } from '@/components/ui/chat';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const MODELS = [
  { id: 'llama-3.3-70b-versatile', name: 'DR ZUCKERBERG - Llama 3.3 70B' },
  { id: 'deepseek-r1-distill-llama-70b', name: 'DR WENFENG - Deepseek R1 70B' }
];

const convertToMessage = (uiMessage: any): Message => {
  const baseParts =
    uiMessage.parts?.filter((part: any) =>
      ['text', 'reasoning', 'tool-invocation', 'source'].includes(part.type)
    ) || [];

  return {
    id: uiMessage.id,
    role: uiMessage.role,
    content: uiMessage.content || '',
    createdAt: uiMessage.createdAt,
    parts: baseParts,
    experimental_attachments: uiMessage.experimental_attachments,
    toolInvocations: uiMessage.toolInvocations
  };
};

export default function ChatDemo(props: {
  initialMessages?: UseChatOptions['initialMessages'];
}) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
    setMessages
  } = useChat({
    ...props,
    api: '/api/chat',
    body: {
      model: selectedModel
    }
  });

  const convertedMessages = messages.map(convertToMessage);

  return (
    <div className={cn('flex', 'flex-col', 'h-[500px]', 'w-full')}>
      <div className={cn('flex', 'justify-end', 'mb-2')}>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Chat
        className="grow p-4"
        messages={convertedMessages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        transcribeAudio={transcribeAudio}
        suggestions={[
          "I'm feeling a bit low today can you help lift my spirits?",
          'Can you guide me through a step-by-step breathing meditation?',
          "Could you please check when my next doctor's appointment at your clinic is scheduled?"
        ]}
      />
    </div>
  );
}
