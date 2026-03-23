import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TeamBuilderFormData } from "@/schemas/team-builder";

// ─── JSON Syntax Tokenizer ────────────────────────────────────────────────────

type TokenType =
  | "key"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "punctuation"
  | "whitespace";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeJson(json: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < json.length) {
    // Whitespace
    if (/\s/.test(json[i])) {
      let ws = "";
      while (i < json.length && /\s/.test(json[i])) ws += json[i++];
      tokens.push({ type: "whitespace", value: ws });
      continue;
    }

    // String (key or value)
    if (json[i] === '"') {
      let str = '"';
      i++;
      while (i < json.length && json[i] !== '"') {
        if (json[i] === "\\") str += json[i++];
        if (i < json.length) str += json[i++];
      }
      if (i < json.length) {
        str += '"';
        i++;
      }
      // Peek past whitespace to check if followed by colon → it's a key
      let j = i;
      while (j < json.length && json[j] === " ") j++;
      const isKey = j < json.length && json[j] === ":";
      tokens.push({ type: isKey ? "key" : "string", value: str });
      continue;
    }

    // Number
    if (json[i] === "-" || (json[i] >= "0" && json[i] <= "9")) {
      let num = "";
      while (i < json.length && /[-\d.eE+]/.test(json[i])) num += json[i++];
      tokens.push({ type: "number", value: num });
      continue;
    }

    // Boolean / null
    if (json.slice(i, i + 4) === "true") {
      tokens.push({ type: "boolean", value: "true" });
      i += 4;
      continue;
    }
    if (json.slice(i, i + 5) === "false") {
      tokens.push({ type: "boolean", value: "false" });
      i += 5;
      continue;
    }
    if (json.slice(i, i + 4) === "null") {
      tokens.push({ type: "null", value: "null" });
      i += 4;
      continue;
    }

    // Punctuation
    tokens.push({ type: "punctuation", value: json[i++] });
  }

  return tokens;
}

const TOKEN_COLORS: Record<TokenType, string> = {
  key: "text-amber-300",
  string: "text-emerald-300",
  number: "text-sky-300",
  boolean: "text-violet-300",
  null: "text-stone-500",
  punctuation: "text-stone-400",
  whitespace: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

interface JsonOutputProps {
  values: TeamBuilderFormData;
}

export function JsonOutput({ values }: JsonOutputProps) {
  const [copied, setCopied] = useState(false);

  const json = JSON.stringify(values, null, 2);
  const tokens = tokenizeJson(json);
  const memberCount = values.people.length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Output</CardTitle>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
              Live
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={handleCopy}
              aria-label="Copy JSON"
            >
              <HugeiconsIcon
                icon={copied ? Tick01Icon : Copy01Icon}
                size={14}
              />
            </Button>
          </div>
        </div>
        <CardDescription>
          <span className="flex items-center gap-2">
            <Badge variant="secondary">
              {memberCount} {memberCount === 1 ? "member" : "members"}
            </Badge>
            <span>JSON preview</span>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[calc(100vh-16rem)] overflow-auto bg-foreground/[0.97] p-4">
          <pre className="font-mono text-[11px] leading-relaxed">
            {tokens.map((token, i) => (
              <span key={i} className={TOKEN_COLORS[token.type]}>
                {token.value}
              </span>
            ))}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
