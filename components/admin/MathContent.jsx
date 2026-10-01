"use client";

import { Fragment } from "react";
import { BlockMath, InlineMath } from "react-katex";

const TOKEN_PATTERN =
  /(\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\\\([\s\S]*?\\\)|\$[^$\n]+?\$)/g;

export default function MathContent({ children, className = "" }) {
  const text = typeof children === "string" ? children : String(children ?? "");
  if (!text) return <span className={className}>-</span>;

  const parts = text.split(TOKEN_PATTERN).filter(Boolean);

  return (
    <div className={`admin-math-content ${className}`.trim()}>
      {parts.map((part, index) => {
        const isBlock =
          (part.startsWith("$$") && part.endsWith("$$")) ||
          (part.startsWith("\\[") && part.endsWith("\\]"));
        const isInline =
          (part.startsWith("$") && part.endsWith("$")) ||
          (part.startsWith("\\(") && part.endsWith("\\)"));

        if (isBlock) {
          return (
            <div
              className="admin-math-block"
              key={`${index}-${part.slice(0, 12)}`}
            >
              <BlockMath math={part.slice(2, -2).trim()} errorColor="#dc2626" />
            </div>
          );
        }
        if (isInline) {
          const math = part.startsWith("\\(")
            ? part.slice(2, -2)
            : part.slice(1, -1);
          return (
            <InlineMath
              math={math.trim()}
              errorColor="#dc2626"
              key={`${index}-${part.slice(0, 12)}`}
            />
          );
        }
        return part.split("\n").map((line, lineIndex, lines) => (
          <Fragment key={`${index}-${lineIndex}`}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        ));
      })}
    </div>
  );
}
