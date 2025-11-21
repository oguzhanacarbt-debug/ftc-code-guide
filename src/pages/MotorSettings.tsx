import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Gauge, Settings2 } from "lucide-react";

const MotorSettings = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Motor Settings & Safety Checklist</h1>
          <p className="text-lg text-muted-foreground">
            Configure every motor the moment you initialize it to avoid runaway robots and inconsistent motion.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-accent bg-accent/5">
          <div className="flex items-start gap-3">
            <Gauge className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Three things to set every time</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Direction (FORWARD/REVERSE)</li>
                <li>ZeroPowerBehavior (BRAKE/FLOAT)</li>
                <li>RunMode (RUN_WITHOUT_ENCODER, RUN_USING_ENCODER, RUN_TO_POSITION)</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings2 className="w-6 h-6 text-primary" />
            Motor configuration in DriveTrainSubsystem
          </h2>

          <CodeBlock
            language="java"
            code={`// In DriveTrainSubsystem constructor
public DriveTrainSubsystem(HardwareMap hardwareMap, Telemetry telemetry){
    // Get motors from Constants
    FrontLeftMotor = hardwareMap.get(DcMotor.class, 
        Constants.DriveTrainConstants.FrontLeftName);
    FrontRightMotor = hardwareMap.get(DcMotor.class, 
        Constants.DriveTrainConstants.FrontRightName);
    BackLeftMotor = hardwareMap.get(DcMotor.class, 
        Constants.DriveTrainConstants.BackLeftName);
    BackRightMotor = hardwareMap.get(DcMotor.class, 
        Constants.DriveTrainConstants.BackRightName);
    
    // Set directions from Constants
    FrontLeftMotor.setDirection(
        Constants.DriveTrainConstants.FrontLeftDirection);
    FrontRightMotor.setDirection(
        Constants.DriveTrainConstants.FrontRightDirection);
    BackLeftMotor.setDirection(
        Constants.DriveTrainConstants.BackLeftDirection);
    BackRightMotor.setDirection(
        Constants.DriveTrainConstants.BackRightDirectiom);
    
    // Set zero power behavior from Constants
    setZeroPowerBehaviour();
}

// Helper method to set zero power behavior
public void setZeroPowerBehaviour(){
    FrontLeftMotor.setZeroPowerBehavior(
        Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
    FrontRightMotor.setZeroPowerBehavior(
        Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
    BackLeftMotor.setZeroPowerBehavior(
        Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
    BackRightMotor.setZeroPowerBehavior(
        Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
}`}
          />

          <p className="text-muted-foreground mt-4">
            All motor settings come from <code className="bg-muted px-2 py-1 rounded text-sm">Constants</code>, making it easy to change behavior across the entire robot. The <code className="bg-muted px-2 py-1 rounded text-sm">ZERO_POWER_BEHAVIOUR</code> is set to <code className="bg-muted px-2 py-1 rounded text-sm">BRAKE</code> by default for safety.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">When to change run modes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "RUN_WITHOUT_ENCODER",
                detail: "Direct power control. Use during TeleOp or when you have no encoders.",
              },
              {
                title: "RUN_USING_ENCODER",
                detail: "Closes the loop on velocity. Perfect for mecanum drives and feed-forward.",
              },
              {
                title: "RUN_TO_POSITION",
                detail: "Motor handles PID internally. Great for slides or arms with target positions.",
              },
            ].map((mode) => (
              <Card key={mode.title} className="p-4 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">{mode.title}</h3>
                <p className="text-sm text-muted-foreground">{mode.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Zero power behavior</h2>
          <p className="text-foreground leading-relaxed mb-4">
            <strong>BRAKE</strong> keeps mechanisms from drifting (slides, arms). <strong>FLOAT</strong> lets drivetrains coast—nice for smoother stops but risky on slopes. Mix and match per subsystem.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Helper utility example</h2>
          <CodeBlock
            language="java"
            code={`public static DcMotor configureMotor(HardwareMap hardwareMap, String name, 
        DcMotorSimple.Direction direction, DcMotor.RunMode mode) {
    DcMotor motor = hardwareMap.dcMotor.get(name);
    motor.setDirection(direction);
    motor.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
    motor.setMode(mode);
    motor.setPower(0);
    return motor;
}`}
          />

          <p className="text-muted-foreground mt-4">
            Centralizing configuration keeps every motor identical and makes debugging trivial when something feels different.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default MotorSettings;

