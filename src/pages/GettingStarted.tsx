import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { AlertCircle, BookOpen, Cpu } from "lucide-react";

const GettingStarted = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Introduction to FTC</h1>
          <p className="text-lg text-muted-foreground">
            Essential concepts you need to know before starting FIRST Tech Challenge robot programming.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What You'll Learn</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>What is FTC and how does it work?</li>
                <li>SDK (Software Development Kit) concept</li>
                <li>What is an OpMode and its types</li>
                <li>Robot Controller and Driver Station</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Cpu className="w-8 h-8 text-primary" />
            What is FTC?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            FIRST Tech Challenge (FTC) is an international robotics competition where high school 
            students design and program robots. Each team builds and programs a robot to complete 
            specific tasks during competitions.
          </p>

          <Card className="p-5 bg-muted/50 border-border">
            <h4 className="font-semibold text-foreground mb-2">FTC Robot Anatomy</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Robot Controller:</strong> Android phone that controls the robot</li>
              <li><strong className="text-foreground">Driver Station:</strong> Control phone used by drivers</li>
              <li><strong className="text-foreground">Control Hub/Expansion Hub:</strong> Electronic brain where motors and sensors connect</li>
              <li><strong className="text-foreground">Motors & Servos:</strong> Actuators that provide movement</li>
              <li><strong className="text-foreground">Sensors:</strong> Components that detect the robot's environment (IMU, encoders, distance sensors...)</li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">SDK (Software Development Kit)</h2>
          <p className="text-foreground leading-relaxed mb-4">
            To program FTC robots, you use the <strong>FTC Robot Controller SDK</strong>. 
            This SDK is Java-based and runs on Android Studio.
          </p>

          <div className="bg-card border border-border rounded-lg p-5 mb-4">
            <h4 className="font-semibold text-foreground mb-3">SDK Contents</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <strong className="text-foreground">OpMode Framework:</strong>
                  <span className="text-muted-foreground"> Base classes that structure robot programs</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <strong className="text-foreground">Hardware Classes:</strong>
                  <span className="text-muted-foreground"> Classes that control hardware like motors, servos, and sensors</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <strong className="text-foreground">Telemetry:</strong>
                  <span className="text-muted-foreground"> System used to send data to the Driver Station</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What is an OpMode?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            An <strong>OpMode</strong> is the fundamental building block of every robot program you write in FTC. 
            An OpMode defines how the robot performs a specific task.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">OpMode Types</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-5 border-border">
              <h4 className="font-semibold text-foreground mb-2">TeleOp (Teleoperated)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Driver-controlled mode. Robot is controlled using joysticks and buttons.
              </p>
              <div className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 inline-block">
                Example: Driver Period
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h4 className="font-semibold text-foreground mb-2">Autonomous</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Mode where robot runs independently. Pre-written commands execute in sequence.
              </p>
              <div className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 inline-block">
                Example: 30-second autonomous period
              </div>
            </Card>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-3">Simple OpMode Example</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Below you can see a basic TeleOp OpMode structure:
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="First TeleOp", group="Rookie")
public class FirstTeleOp extends OpMode {
    
    // This function runs once when the OpMode is initialized
    @Override
    public void init() {
        telemetry.addData("Status", "Initialized");
    }

    // This function runs continuously after pressing START
    @Override
    public void loop() {
        telemetry.addData("Status", "Running");
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Important Note</h4>
                <p className="text-sm text-muted-foreground">
                  The <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@TeleOp</code> annotation 
                  makes this OpMode appear in the "TeleOp" category on the Driver Station. 
                  For Autonomous, use <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@Autonomous</code>.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What's Next?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Now you've learned the basic concepts of FTC! In the next step, you'll learn 
            how to initialize your robot and control your first motor.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default GettingStarted;
