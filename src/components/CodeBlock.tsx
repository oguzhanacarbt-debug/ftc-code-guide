import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = "java", showLineNumbers = true }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-code-bg">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-code-bg/80">
        <span className="text-xs text-code-foreground/60 font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 text-xs gap-1.5 text-code-foreground/80 hover:text-code-foreground hover:bg-code-foreground/10"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Kopyalandı
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Kopyala
            </>
          )}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <pre className="p-4">
          <code className="text-sm font-mono text-code-foreground leading-relaxed">
            {showLineNumbers ? (
              <table className="w-full border-spacing-0">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index}>
                      <td className="text-code-foreground/40 select-none pr-4 text-right align-top">
                        {index + 1}
                      </td>
                      <td className="text-code-foreground whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
