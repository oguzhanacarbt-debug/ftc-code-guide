import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Settings, Zap, AlertTriangle } from "lucide-react";

const RobotInit = () => {
  const hardware = [
    { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
    { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
    { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
    { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
  ];

  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Robot Initialization</h1>
          <p className="text-lg text-muted-foreground">
            Learn how to define motors, servos, and sensors in your robot code.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What You'll Learn</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>What is hardwareMap and how to use it?</li>
                <li>Motor initialization steps</li>
                <li>Setting motor directions</li>
                <li>See robot initialization in real-time on the right panel!</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            What is hardwareMap?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            <code className="bg-muted px-2 py-1 rounded text-sm">hardwareMap</code> is a special object 
            in the FTC SDK used to access your robot's physical hardware. 
            This object creates the connection between your code and components like motors, servos, and sensors.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">hardwareMap Logic</h4>
            <p className="text-sm text-muted-foreground mb-3">
              In the Robot Controller configuration, you give each piece of hardware a <strong>name</strong> 
              (for example, "leftFront"). Then in your code, you use that name to access the hardware.
            </p>
            <div className="bg-muted/50 rounded p-3 text-xs font-mono text-muted-foreground">
              Robot Config: leftFront → Port 0<br />
              In Code: hardwareMap.dcMotor.get("leftFront")
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Initializing Motors</h2>
          <p className="text-foreground leading-relaxed mb-4">
            To initialize a motor, first create a <code className="bg-muted px-2 py-1 rounded text-sm">DcMotor</code> 
            variable, then assign the motor object to that variable using <code className="bg-muted px-2 py-1 rounded text-sm">hardwareMap</code>.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Example: Single Motor</h3>
          <CodeBlock
            language="java"
            code={`@TeleOp(name="Motor Init Example", group="Rookie")
public class MotorInitExample extends OpMode {
    
    // Define the motor variable
    private DcMotor leftFront;

    @Override
    public void init() {
        // Initialize the motor with hardwareMap
        leftFront = hardwareMap.dcMotor.get("leftFront");
        
        // Set motor direction
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        
        // Start motor at zero power
        leftFront.setPower(0);
        
        telemetry.addData("Status", "Motor initialized!");
    }

    @Override
    public void loop() {
        // Motor control will go here
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Warning!</h4>
                <p className="text-sm text-muted-foreground">
                  The name inside <code className="bg-muted px-1.5 py-0.5 rounded text-xs">hardwareMap.dcMotor.get("leftFront")</code> 
                  must be <strong>exactly the same</strong> as the name you gave it in the Robot Controller config. 
                  Otherwise, the program won't work!
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Four-Wheel Drivetrain</h2>
          <p className="text-foreground leading-relaxed mb-4">
            One of the most common drivetrain configurations in FTC is a 4-motor system. 
            In the example below, we initialize all 4 motors and set their directions.
          </p>

          <p className="text-sm text-muted-foreground mb-4">
            👉 Watch the <strong>right panel</strong> to see the initialized motors visualized!
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Four Wheel Drive", group="Rookie")
public class FourWheelDrive extends OpMode {
    
    // Four motor variables
    private DcMotor leftFront;
    private DcMotor rightFront;
    private DcMotor leftRear;
    private DcMotor rightRear;

    @Override
    public void init() {
        // Initialize all motors
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        // Set motor directions
        // Left side FORWARD, right side typically REVERSE
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        // Start all motors at zero power
        leftFront.setPower(0);
        rightFront.setPower(0);
        leftRear.setPower(0);
        rightRear.setPower(0);
        
        telemetry.addData("Status", "All motors initialized!");
        telemetry.update();
    }

    @Override
    public void loop() {
        // Movement code will go here
        telemetry.addData("Mode", "Ready to drive");
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Why Are Right Motors REVERSE?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Motors on opposite sides of the robot are mounted facing opposite directions. If they all 
              spun the same way, the robot would turn instead of moving straight. By reversing one side 
              in code, we ensure that when all motors receive a "forward" command, the robot drives straight.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">What's Next?</h2>
          <p className="text-foreground leading-relaxed">
            Now you've learned how to initialize motors! In the next step, you'll learn 
            how to control these motors with a joystick and explore basic movement systems.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default RobotInit;
