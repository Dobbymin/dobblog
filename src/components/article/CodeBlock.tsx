'use client';

import {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Check, Copy } from 'lucide-react';

export function CodeBlock({
  className,
  ...props
}: ComponentPropsWithoutRef<'pre'>) {
  const ref = useRef<HTMLPreElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copyCode = async () => {
    const text = ref.current?.textContent;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const label = copied ? '복사됨' : '코드 복사';

  return (
    <div className='code-block'>
      <button
        aria-label={label}
        className='code-copy-button'
        data-copied={copied ? 'true' : 'false'}
        onClick={copyCode}
        title={label}
        type='button'
      >
        {copied ? <Check /> : <Copy />}
      </button>
      <pre
        className={['code-block-pre', className].filter(Boolean).join(' ')}
        ref={ref}
        {...props}
      />
    </div>
  );
}
