import React, { useState } from 'react';
import { ClipboardIcon, ClipboardCheckIcon } from './icons';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="relative group my-2">
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                <code className="font-mono text-sm">{code}</code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 left-2 p-1.5 bg-gray-600 rounded-md text-gray-300 hover:bg-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="نسخ الكود"
            >
                {copied ? (
                    <ClipboardCheckIcon className="w-5 h-5 text-taww-accent" />
                ) : (
                    <ClipboardIcon className="w-5 h-5" />
                )}
            </button>
        </div>
    );
};


const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Regex for fenced code blocks
  const codeBlockRegex = /```([\s\S]*?)```/g;
  const parts = content.split(codeBlockRegex);

  const renderInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 text-gray-800 font-mono px-1.5 py-0.5 rounded-md text-sm">$1</code>');
  };

  const renderedParts = parts.map((part, index) => {
    // Code blocks are at odd indices
    if (index % 2 === 1) {
      return (
        <CodeBlock key={index} code={part.trim()} />
      );
    }

    // Regular text with inline markdown and lists
    const lines = part.split('\n').filter(line => line.trim() !== '');
    const elements: React.ReactElement[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag key={`list-${elements.length}`} className={`${ListTag === 'ul' ? 'list-disc' : 'list-decimal'} list-inside space-y-1 my-2 pl-4`}>
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }}></li>
            ))}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    lines.forEach((line) => {
      const ulMatch = line.match(/^(\s*)\* (.*)/);
      const olMatch = line.match(/^(\s*)\d+\. (.*)/);

      if (ulMatch) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(ulMatch[2]);
      } else if (olMatch) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(olMatch[2]);
      } else {
        flushList();
        elements.push(
          <p key={`p-${elements.length}`} className="my-1" dangerouslySetInnerHTML={{ __html: renderInline(line) }}></p>
        );
      }
    });

    flushList();

    return <div key={index}>{elements}</div>;
  });

  return <>{renderedParts}</>;
};

export default MarkdownRenderer;