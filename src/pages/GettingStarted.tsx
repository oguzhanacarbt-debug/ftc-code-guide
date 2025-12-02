import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { AlertCircle, BookOpen, Cpu } from "lucide-react";

const GettingStarted = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        {/* --- your entire existing code stays exactly the same --- */}

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What's Next?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Now you've learned the basic concepts of FTC! In the next step, you'll learn 
            how to initialize your robot and control your first motor.
          </p>
        </section>
      </article>

      {/* ---------- Added component here ---------- */}

      <a
        className="group text-sm p-2.5 flex gap-4 flex-1 flex-row items-center pr-4 border border-tint-subtle rounded-sm circular-corners:rounded-2xl straight-corners:rounded-none hover:border-primary text-pretty md:p-4 md:text-base"
        href="/ftclib/installation"
      >
        <span className="flex flex-col flex-1">
          <span className="text-xs">Next</span>
          <span className="text-tint-strong group-hover:text-primary line-clamp-2">
            Installation
          </span>
        </span>

        <svg
          className="gb-icon hidden size-4 text-tint-subtle contrast-more:text-tint-strong group-hover:text-primary md:block"
          style={{
            maskImage:
              "url(https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/chevron-right.svg?v=2&token=a463935e93)",
            WebkitMaskImage:
              "url(https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/chevron-right.svg?v=2&token=a463935e93)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </a>

      {/* ---------- end ---------- */}

    </DocsLayout>
  );
};

export default GettingStarted;
