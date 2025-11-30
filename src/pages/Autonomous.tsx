import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Zap, Play, AlertTriangle } from "lucide-react";

const Autonomous = () => {
  const hardware = [
    { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
    { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
    { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
    { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
  ];

  const movementSequence = [
    { type: "forward" as const, duration: 2000, power: 0.5 },
    { type: "rotate-right" as const, duration: 1000, power: 0.3 },
    { type: "forward" as const, duration: 1500, power: 0.5 },
    { type: "stop" as const, duration: 500 },
  ];

  return (
    <DocsLayout 
      robotHardware={hardware}
      movementSequence={movementSequence}
      codeDescription="Autonomous routine: Drive forward, turn right, drive forward again"
    >
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Autonomous Mode</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to create autonomous routines that run without driver input.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Play className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What You'll Learn</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>What is Autonomous mode?</li>
                <li>Creating timed movements</li>
                <li>Building movement sequences</li>
                <li>See your code execute in real-time on the right panel!</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            What is Autonomous?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Autonomous mode is the period at the beginning of a match where the robot operates 
            completely on its own, following pre-programmed instructions without any driver control. 
            This typically lasts 30 seconds in FTC matches.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">Autonomous vs TeleOp</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Autonomous (@Autonomous):</strong> Robot runs 
                pre-programmed movements without driver input
              </p>
              <p>
                <strong className="text-foreground">TeleOp (@TeleOp):</strong> Driver controls 
                the robot with gamepad inputs
              </p>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Basic Autonomous Program</h2>
          <p className="text-foreground leading-relaxed mb-4">
            The simplest autonomous program uses timed movements. The robot performs actions 
            for specific durations, then moves to the next action.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Example: Drive Forward and Turn</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Click <strong>Run</strong> in the right panel to watch this code execute!
          </p>

          <CodeBlock
            language="java"
            code={'@Autonomous(name="Simple Auto", group="Rookie")\npublic class SimpleAutonomous extends LinearOpMode {\n    \n    private DcMotor leftFront;\n    private DcMotor rightFront;\n    private DcMotor leftRear;\n    private DcMotor rightRear;\n\n    @Override\n    public void runOpMode() {\n        // Initialize motors\n        leftFront = hardwareMap.dcMotor.get("leftFront");\n        rightFront = hardwareMap.dcMotor.get("rightFront");\n        leftRear = hardwareMap.dcMotor.get("leftRear");\n        rightRear = hardwareMap.dcMotor.get("rightRear");\n        \n        // Set directions\n        leftFront.setDirection(DcMotor.Direction.FORWARD);\n        leftRear.setDirection(DcMotor.Direction.FORWARD);\n        rightFront.setDirection(DcMotor.Direction.REVERSE);\n        rightRear.setDirection(DcMotor.Direction.REVERSE);\n        \n        telemetry.addData("Status", "Ready to run");\n        telemetry.update();\n        \n        // Wait for start button\n        waitForStart();\n        \n        // === AUTONOMOUS ROUTINE STARTS HERE ===\n        \n        // Drive forward for 2 seconds\n        leftFront.setPower(0.5);\n        rightFront.setPower(0.5);\n        leftRear.setPower(0.5);\n        rightRear.setPower(0.5);\n        sleep(2000);  // Wait 2 seconds\n        \n        // Turn right for 1 second\n        leftFront.setPower(0.3);\n        rightFront.setPower(-0.3);\n        leftRear.setPower(0.3);\n        rightRear.setPower(-0.3);\n        sleep(1000);  // Wait 1 second\n        \n        // Drive forward again for 1.5 seconds\n        leftFront.setPower(0.5);\n        rightFront.setPower(0.5);\n        leftRear.setPower(0.5);\n        rightRear.setPower(0.5);\n        sleep(1500);\n        \n        // Stop all motors\n        leftFront.setPower(0);\n        rightFront.setPower(0);\n        leftRear.setPower(0);\n        rightRear.setPower(0);\n        \n        telemetry.addData("Status", "Autonomous Complete!");\n        telemetry.update();\n    }\n}'}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Understanding the Code</h4>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@Autonomous</code> - 
                Marks this as an autonomous program
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">LinearOpMode</code> - 
                Allows step-by-step programming with sleep()
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">waitForStart()</code> - 
                Waits until the start button is pressed
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">sleep(milliseconds)</code> - 
                Pauses code execution for a specific time
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Creating Movement Functions</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Instead of repeating the same motor commands, we can create helper functions 
            to make our code cleaner and more readable.
          </p>

          <CodeBlock
            language="java"
            code={'@Autonomous(name="Function Auto", group="Rookie")\npublic class FunctionAutonomous extends LinearOpMode {\n    \n    private DcMotor leftFront, rightFront, leftRear, rightRear;\n\n    // Helper function to drive forward\n    private void driveForward(double power, int duration) {\n        leftFront.setPower(power);\n        rightFront.setPower(power);\n        leftRear.setPower(power);\n        rightRear.setPower(power);\n        sleep(duration);\n    }\n    \n    // Helper function to turn right\n    private void turnRight(double power, int duration) {\n        leftFront.setPower(power);\n        rightFront.setPower(-power);\n        leftRear.setPower(power);\n        rightRear.setPower(-power);\n        sleep(duration);\n    }\n    \n    // Helper function to stop\n    private void stopRobot() {\n        leftFront.setPower(0);\n        rightFront.setPower(0);\n        leftRear.setPower(0);\n        rightRear.setPower(0);\n    }\n\n    @Override\n    public void runOpMode() {\n        // Initialize hardware...\n        leftFront = hardwareMap.dcMotor.get("leftFront");\n        rightFront = hardwareMap.dcMotor.get("rightFront");\n        leftRear = hardwareMap.dcMotor.get("leftRear");\n        rightRear = hardwareMap.dcMotor.get("rightRear");\n        \n        waitForStart();\n        \n        // Now our autonomous is much cleaner!\n        driveForward(0.5, 2000);\n        turnRight(0.3, 1000);\n        driveForward(0.5, 1500);\n        stopRobot();\n    }\n}'}
          />
        </section>

        <section className="mb-12">
          <Card className="p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Important Note</h4>
                <p className="text-sm text-muted-foreground">
                  Timed movements work for simple autonomous routines, but they're not very 
                  accurate. For more precise movements, you'll want to learn about 
                  encoders and odometry, which we'll cover in the Sensors section.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What's Next?</h2>
          <p className="text-foreground leading-relaxed">
            Now you understand basic autonomous programming! Next, learn about different 
            movement systems and how to make your robot move more precisely with sensors 
            and encoders.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default Autonomous;
