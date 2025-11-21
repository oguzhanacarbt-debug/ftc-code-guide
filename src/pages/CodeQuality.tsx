import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { CheckCircle2, Bug, FileCode, Zap, AlertTriangle, TrendingUp } from "lucide-react";

const CodeQuality = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Code Quality & Testing</h1>
          <p className="text-lg text-muted-foreground">
            Learn best practices for writing maintainable, testable, and reliable FTC robot code.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Why code quality matters</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Easier debugging when things break during competition</li>
                <li>Faster development when adding new features</li>
                <li>Better collaboration when multiple programmers work on the code</li>
                <li>More reliable autonomous routines that work consistently</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-primary" />
            Code Organization Best Practices
          </h2>

          <div className="space-y-6">
            <Card className="p-5 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Package Structure</h3>
              <CodeBlock
                language="java"
                code={`org.firstinspires.ftc.teamcode/
├── Constants.java
├── Commands/
│   ├── DefaultDriveCommand.java
│   ├── DriveToPoseCommand.java
│   └── IntakeCommand.java
├── Subsystems/
│   ├── DriveTrainSubsystem.java
│   ├── IntakeSubsystem.java
│   └── ShooterSubsystem.java
└── OpModes/
    ├── TeleOp.java
    └── Autonomous.java`}
              />
              <p className="text-muted-foreground mt-4">
                Keep related code together. Commands go in Commands/, subsystems in Subsystems/, and OpModes in their own folder.
              </p>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">2. Naming Conventions</h3>
              <CodeBlock
                language="java"
                code={`// Good naming
public class DriveTrainSubsystem extends SubsystemBase { }
public class IntakeSubsystem extends SubsystemBase { }
public void setTargetVelocity(double velocity) { }
public static final double MAX_VELOCITY = 1.0;

// Bad naming
public class Drive extends SubsystemBase { }  // Too vague
public class Intake1 extends SubsystemBase { }  // Unclear
public void go(double x) { }  // What does 'go' mean?
public static final double MAX = 1.0;  // MAX what?`}
              />
              <p className="text-muted-foreground mt-4">
                Use descriptive names that explain what the code does. Future you (and your teammates) will thank you.
              </p>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">3. Single Responsibility Principle</h3>
              <CodeBlock
                language="java"
                code={`// Good: Each subsystem does one thing
public class IntakeSubsystem extends SubsystemBase {
    // Only handles intake mechanism
    public void intake() { }
    public void outtake() { }
    public boolean hasGameElement() { }
}

// Bad: One class doing too much
public class RobotSubsystem extends SubsystemBase {
    // Handles intake, shooter, lift, and drive - too much!
    public void intake() { }
    public void shoot() { }
    public void lift() { }
    public void drive() { }
}`}
              />
              <p className="text-muted-foreground mt-4">
                Each class should have one clear purpose. If a subsystem is doing multiple unrelated things, split it up.
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Bug className="w-6 h-6 text-accent" />
            Testing Strategies
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {[
              {
                title: "Unit Testing",
                detail: "Test individual methods in isolation. Use telemetry to verify each function works correctly.",
              },
              {
                title: "Integration Testing",
                detail: "Test subsystems working together. Verify commands execute correctly with real hardware.",
              },
              {
                title: "Field Testing",
                detail: "Test on the actual field with game elements. Verify autonomous paths and TeleOp controls.",
              },
              {
                title: "Regression Testing",
                detail: "Re-test after making changes. Ensure new code doesn't break existing functionality.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-4 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </Card>
            ))}
          </div>

          <Card className="p-5 border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Testing Checklist Template</h3>
            <CodeBlock
              language="java"
              code={`// Create a test OpMode for each subsystem
@TeleOp(name="Test Intake", group="Tests")
public class TestIntake extends OpMode {
    private IntakeSubsystem intake;
    
    @Override
    public void init() {
        intake = new IntakeSubsystem(hardwareMap, telemetry);
    }
    
    @Override
    public void loop() {
        // Test 1: Intake forward
        if (gamepad1.a) {
            intake.intake();
            telemetry.addData("Test", "Intake forward");
        }
        
        // Test 2: Intake reverse
        if (gamepad1.b) {
            intake.outtake();
            telemetry.addData("Test", "Intake reverse");
        }
        
        // Test 3: Check sensor
        telemetry.addData("Has Element", intake.hasGameElement());
        
        // Test 4: Stop
        if (gamepad1.x) {
            intake.stop();
        }
        
        telemetry.update();
    }
}`}
            />
            <p className="text-muted-foreground mt-4">
              Create dedicated test OpModes for each subsystem. This makes it easy to verify hardware works correctly before integrating into main code.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Debugging Techniques
          </h2>

          <div className="space-y-6">
            <Card className="p-5 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Strategic Telemetry</h3>
              <CodeBlock
                language="java"
                code={`@Override
public void periodic() {
    // Always show critical state
    telemetry.addData("State", currentState);
    telemetry.addData("Target", targetPosition);
    telemetry.addData("Current", getCurrentPosition());
    
    // Show errors clearly
    if (hasError) {
        telemetry.addLine("ERROR: " + errorMessage);
        telemetry.addData("Error Code", errorCode);
    }
    
    // Group related data
    telemetry.addLine("--- Drive Info ---");
    telemetry.addData("Left Power", leftPower);
    telemetry.addData("Right Power", rightPower);
    
    telemetry.update();
}`}
              />
              <p className="text-muted-foreground mt-4">
                Use telemetry strategically. Show state, targets, and errors. Group related information for easier reading.
              </p>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">2. Defensive Programming</h3>
              <CodeBlock
                language="java"
                code={`public void setTargetPosition(int position) {
    // Validate input
    if (position < MIN_POSITION || position > MAX_POSITION) {
        telemetry.addLine("ERROR: Invalid position: " + position);
        return;  // Don't execute invalid command
    }
    
    // Check hardware is initialized
    if (motor == null) {
        telemetry.addLine("ERROR: Motor not initialized");
        return;
    }
    
    // Safe to proceed
    targetPosition = position;
    motor.setTargetPosition(position);
}

// Use null checks everywhere
public double getCurrentPosition() {
    if (motor == null) return 0.0;
    return motor.getCurrentPosition();
}`}
              />
              <p className="text-muted-foreground mt-4">
                Always validate inputs and check for null hardware. Fail gracefully with clear error messages instead of crashing.
              </p>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="text-xl font-semibold text-foreground mb-3">3. State Machine Debugging</h3>
              <CodeBlock
                language="java"
                code={`public enum IntakeState {
    IDLE,
    INTAKING,
    OUTTAKING,
    HOLDING
}

private IntakeState currentState = IntakeState.IDLE;

@Override
public void periodic() {
    // Always show current state in telemetry
    telemetry.addData("Intake State", currentState);
    
    switch (currentState) {
        case IDLE:
            // State logic
            break;
        case INTAKING:
            // State logic
            if (hasGameElement()) {
                currentState = IntakeState.HOLDING;
                telemetry.addLine("State transition: INTAKING -> HOLDING");
            }
            break;
        // ... other states
    }
}`}
              />
              <p className="text-muted-foreground mt-4">
                Use state machines for complex behaviors. Always log state transitions in telemetry to track what the robot is doing.
              </p>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-accent" />
            Common Errors & Solutions
          </h2>

          <div className="space-y-4">
            {[
              {
                error: "NullPointerException",
                cause: "Hardware not initialized or name mismatch",
                solution: "Check hardwareMap.get() calls match Robot Controller config names exactly",
              },
              {
                error: "Motor runs in wrong direction",
                cause: "Direction not set or set incorrectly",
                solution: "Set direction in Constants and verify in subsystem initialization",
              },
              {
                error: "Autonomous inconsistent",
                cause: "Timing issues or not waiting for commands to finish",
                solution: "Use isFinished() checks and add small delays between actions",
              },
              {
                error: "TeleOp controls feel laggy",
                cause: "Too much processing in loop() or blocking operations",
                solution: "Move heavy calculations to periodic(), use async operations",
              },
              {
                error: "Vision not detecting",
                cause: "Camera not initialized or wrong pipeline",
                solution: "Verify camera initialization order and pipeline selection",
              },
            ].map((item) => (
              <Card key={item.error} className="p-4 border-l-4 border-l-accent bg-accent/5">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.error}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Cause:</strong> {item.cause}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> {item.solution}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            Code Review Checklist
          </h2>

          <Card className="p-5 border-border">
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Hardware names</strong> come from Constants, not hardcoded strings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Null checks</strong> before accessing hardware objects</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Telemetry</strong> shows critical state and errors clearly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Magic numbers</strong> moved to Constants with descriptive names</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Subsystems</strong> are independent and don't access each other's hardware</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Commands</strong> use addRequirements() to prevent conflicts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Error handling</strong> fails gracefully with clear messages</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Code is commented</strong> for complex logic and non-obvious decisions</span>
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Performance Optimization
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: "Move calculations to periodic()",
                detail: "Heavy math should run in subsystem periodic(), not OpMode loop().",
              },
              {
                title: "Cache hardware references",
                detail: "Store hardwareMap.get() results in variables, don't call repeatedly.",
              },
              {
                title: "Limit telemetry updates",
                detail: "Update telemetry once per loop, group all addData() calls together.",
              },
              {
                title: "Use efficient data structures",
                detail: "Prefer arrays over ArrayLists for fixed-size collections in tight loops.",
              },
            ].map((item) => (
              <Card key={item.title} className="p-4 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </DocsLayout>
  );
};

export default CodeQuality;

