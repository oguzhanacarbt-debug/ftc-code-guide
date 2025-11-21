import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Compass, RefreshCw } from "lucide-react";

const hardware = [
  { name: "imu", type: "sensor" as const, position: { x: 100, y: 100 } },
];

const IMUSubsystem = () => {
  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">IMU Subsystem</h1>
          <p className="text-lg text-muted-foreground">
            Wrap the BHI260 / REV IMU in a subsystem so heading data stays calibrated for mecanum drive, odometry, and autonomous paths.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">IMU responsibilities</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Initialize parameters once</li>
                <li>Provide radians + degrees helpers</li>
                <li>Offer zeroHeading() for TeleOp and Auto</li>
                <li>Feed odometry filters or field-centric logic</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">IMU in DriveTrainSubsystem</h2>
          <p className="text-foreground leading-relaxed mb-4">
            The IMU is typically integrated into your <code className="bg-muted px-2 py-1 rounded text-sm">DriveTrainSubsystem</code> since it's used for field-centric drive. Here's how it's implemented:
          </p>
          <CodeBlock
            language="java"
            code={`// In DriveTrainSubsystem.java
public static IMU imu;
IMU.Parameters parameters = new IMU.Parameters(
    Constants.DriveTrainConstants.revHubOrientationOnRobot
);

public DriveTrainSubsystem(HardwareMap hardwareMap, Telemetry telemetry){
    // Initialize IMU from Constants
    imu = hardwareMap.get(IMU.class, Constants.DriveTrainConstants.imuName);
    
    // Configure IMU orientation (from Constants)
    imu.initialize(parameters);
}

// Get heading in radians (for field-centric math)
public double getHeadingRadians(){
    return imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.RADIANS);
}

// Get heading in degrees (for telemetry)
public double getHeadingDegrees(){
    return imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
}

// Reset heading (call at start of match)
public void resetHeading(boolean reInit){
    imu.resetYaw();
    if (reInit){
        imu.initialize(parameters);
    }
}`}
          />
          
          <p className="text-muted-foreground mt-4">
            The IMU orientation is configured in <code className="bg-muted px-2 py-1 rounded text-sm">Constants.DriveTrainConstants.revHubOrientationOnRobot</code>, making it easy to adjust if your Control Hub is mounted differently.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-accent" />
            Reset workflow
          </h2>
          <ol className="space-y-3 text-foreground">
            <li>Call <code className="bg-muted px-2 py-1 rounded text-sm">imuSubsystem.zeroHeading()</code> during <code className="bg-muted px-2 py-1 rounded text-sm">init()</code>.</li>
            <li>Allow drivers to press <code className="bg-muted px-2 py-1 rounded text-sm">gamepad1.y</code> to re-zero if the robot was bumped.</li>
            <li>Store the heading offset in telemetry so field-centric math stays transparent.</li>
          </ol>
        </section>
      </article>
    </DocsLayout>
  );
};

export default IMUSubsystem;

