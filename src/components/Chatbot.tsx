'use client'

import { useChat } from 'ai/react'
import Markdown from 'react-markdown'
import { SendIcon, SquareIcon } from 'lucide-react'
import React, { useRef, useEffect } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: 'api/chat',
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-background border rounded-lg shadow-lg">
      <div className="flex-1 overflow-hidden">
        <ScrollArea.Root className="h-full w-full">
          <ScrollArea.Viewport ref={scrollAreaRef} className="h-full w-full">
            <div className="flex flex-col gap-4 p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full">
                  <Image
                    src="/ai-white.png"
                    alt="AI"
                    width={80}
                    height={80}
                    className="text-primary"
                  />
                  <p className="text-lg text-muted-foreground mt-4">
                    Welcome to the ChatbotAI! Do you need help?
                  </p>
                </div>
              ) : (
                messages.map((message) =>
                  message.role === 'assistant' ? (
                    <div key={message.id} className="flex items-start gap-3">
                      <div className="p-2 bg-primary rounded-full">
                        <Image src="/ai-white.png" alt="AI" width={20} height={20} />
                      </div>
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <Markdown className="text-sm text-foreground prose">
                          {message.content}
                        </Markdown>
                      </div>
                    </div>
                  ) : (
                    <div key={message.id} className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex touch-none select-none transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-muted-foreground/20" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-t bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Ask about nutrition..."
            className="rounded-lg pr-12 min-h-[64px] resize-none"
            rows={1}
            value={input}
            onChange={handleInputChange}
          />
          <Button
            type={isLoading ? 'button' : 'submit'}
            size="icon"
            disabled={!input && !isLoading}
            onClick={isLoading ? stop : undefined}
            className="absolute bottom-2 right-2 rounded-full"
          >
            {isLoading ? (
              <SquareIcon className="w-5 h-5" />
            ) : (
              <SendIcon className="w-5 h-5" />
            )}
            <span className="sr-only">{isLoading ? 'Stop' : 'Send'}</span>
          </Button>
        </div>
      </form>
    </div>
  )
}