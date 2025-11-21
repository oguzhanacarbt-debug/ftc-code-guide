import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Radar, ActivitySquare } from "lucide-react";

const hardware = [
  { name: "imu", type: "sensor" as const, position: { x: 100, y: 100 } },
];

const SensorIntegration = () => {
  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sensor Integration Essentials</h1>
          <p className="text-lg text-muted-foreground">
            Add awareness to your robot by reading encoders, distance sensors, and IMUs with safe initialization patterns.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Radar className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Integration goals</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Initialize sensors once inside subsystems</li>
                <li>Convert raw data to useful units (inches, degrees)</li>
                <li>Push readings to telemetry for drivers</li>
                <li>Fail gracefully when a sensor is unplugged</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Encoder utility</h2>
          <CodeBlock
            language="java"
            code={`public double encoderInches(int ticks) {
    double wheelCircumference = Math.PI * Constants.Drive.WHEEL_DIAMETER_IN;
    return (ticks / Constants.Drive.TICKS_PER_REV) * wheelCircumference;
}`}
          />
          <p className="text-muted-foreground mt-4">
            Call this helper anywhere you need to convert movement goals into encoder ticks (or vice versa).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Odometry subsystem example</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Odometry uses encoders and IMU to track robot position. Here's how it's implemented:
          </p>
          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Subsystems;

import com.arcrobotics.ftclib.command.SubsystemBase;
import com.qualcomm.hardware.gobilda.GoBildaPinpointDriver;
import com.qualcomm.robotcore.hardware.HardwareMap;
import org.firstinspires.ftc.robotcore.external.Telemetry;
import org.firstinspires.ftc.robotcore.external.navigation.AngleUnit;
import org.firstinspires.ftc.robotcore.external.navigation.DistanceUnit;
import org.firstinspires.ftc.robotcore.external.navigation.Pose2D;
import org.firstinspires.ftc.teamcode.Constants;

public class OdometrySubsystem extends SubsystemBase {
    private GoBildaPinpointDriver pinpoint;
    private Telemetry telemetry;

    public OdometrySubsystem(HardwareMap hardwareMap, Telemetry telemetry){
        // Initialize odometry pod from Constants
        pinpoint = hardwareMap.get(GoBildaPinpointDriver.class, 
            Constants.OdometryConstants.PINPOINT_NAME);
        
        // Configure from Constants
        pinpoint.setEncoderResolution(
            Constants.OdometryConstants.POD_TYPE);
        pinpoint.setOffsets(
            Constants.OdometryConstants.X_OFFSET_CM, 
            Constants.OdometryConstants.Y_OFFSET_CM, 
            DistanceUnit.CM);
        pinpoint.setEncoderDirections(
            Constants.OdometryConstants.ENCODER_DIRECTION_X, 
            Constants.OdometryConstants.ENCODER_DIRECTION_Y);
        pinpoint.setPosition(
            Constants.OdometryConstants.STARTING_POSE_CM_DEGREE);
        pinpoint.recalibrateIMU();
        this.telemetry = telemetry;
    }
    
    @Override
    public void periodic(){
        // Update telemetry with position data
        telemetry.addData("X CM", getX_CM());
        telemetry.addData("Y CM", getY_CM());
        telemetry.addData("Heading (DEGREES)", getHeadingDegrees());
        telemetry.addData("Heading (radians)", getHeadingRadians());
        telemetry.addData("Pinpoint loop time", getLoopTime());
        telemetry.update();
        
        // Update odometry calculations
        pinpoint.update();
    }
    
    public double getX_CM(){
        return pinpoint.getPosX(DistanceUnit.CM);
    }
    
    public double getY_CM(){
        return pinpoint.getPosY(DistanceUnit.CM);
    }
    
    public double getHeadingDegrees(){
        return pinpoint.getHeading(AngleUnit.DEGREES);
    }
    
    public double getHeadingRadians(){
        return pinpoint.getHeading(AngleUnit.RADIANS);
    }
    
    public Pose2D getPose_CM_Degrees(){
        return new Pose2D(DistanceUnit.CM, getX_CM(), getY_CM(), 
            AngleUnit.DEGREES, getHeadingDegrees());
    }
    
    public void calibrateIMU(){
        pinpoint.recalibrateIMU();
    }
    
    public void ResetandCalibrateIMU(){
        pinpoint.resetPosAndIMU();
    }
}`}
          />
          
          <p className="text-muted-foreground mt-4">
            This subsystem uses the GoBilda Pinpoint odometry pod, which combines encoder and IMU data to track robot position. All configuration comes from <code className="bg-muted px-2 py-1 rounded text-sm">Constants</code>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ActivitySquare className="w-6 h-6 text-accent" />
            Sensor telemetry template
          </h2>
          <CodeBlock
            language="java"
            code={`telemetry.addData("Lift ticks", liftSubsystem.getCurrentTicks());
telemetry.addData("Distance cm", intakeSensor.getDistance(DistanceUnit.CM));
telemetry.addData("Heading", imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES));
telemetry.update();`}
          />
          <p className="text-muted-foreground mt-4">
            Drivers trust the robot more when telemetry is clean and grouped logically.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default SensorIntegration;

