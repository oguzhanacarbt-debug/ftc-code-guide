import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Laptop2, Rocket } from "lucide-react";

const FTCLabGuide = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">FTCLab Workflow</h1>
          <p className="text-lg text-muted-foreground">
            FTCLab (by the FIRST community) bundles templates, checklists, and testing utilities so rookies can launch a full codebase in minutes.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Rocket className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Why use FTCLab?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Generate OpMode templates (TeleOp + Autonomous) with IDs filled in</li>
                <li>Produce constants, subsystem, and command scaffolding</li>
                <li>Built-in TODO tracker for hardware bring-up</li>
                <li>Quick simulator to verify motor/servo direction without a robot</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Laptop2 className="w-6 h-6 text-accent" />
            Typical FTCLab session
          </h2>
          <ol className="space-y-4 text-foreground">
            <li>
              <span className="font-semibold">Start a new project:</span> enter season name, team number, and drivetrain; FTCLab clones the latest SDK + FTCLib packages.
            </li>
            <li>
              <span className="font-semibold">Fill out the hardware checklist:</span> map each motor/servo name and assign ports. Export as JSON for the Robot Controller config notes.
            </li>
            <li>
              <span className="font-semibold">Generate code:</span> choose the subsystems you want and FTCLab writes the files directly into your TeamCode module.
            </li>
            <li>
              <span className="font-semibold">Test in the sandbox:</span> toggle virtual gamepads/motors to see telemetry before deploying.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Command to sync changes</h2>
          <CodeBlock
            language="shell"
            code={`ftclab pull templates
ftclab push teamcode --android-path ~/FTC/TeamCode`}
          />
          <p className="text-muted-foreground mt-4">
            These commands keep FTCLab and your Android Studio project aligned; perfect for rookies who edit in the browser first.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default FTCLabGuide;

