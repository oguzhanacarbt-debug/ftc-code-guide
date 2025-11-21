import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Boxes, Layers3 } from "lucide-react";

const Subsystems = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Subsystem Architecture</h1>
          <p className="text-lg text-muted-foreground">
            Break the robot into small, testable classes so rookies can focus on one mechanism at a time.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Boxes className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Subsystem checklist</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Own the hardware (motors, sensors) for one mechanism</li>
                <li>Expose intuitive methods (liftToHigh, intake, spit)</li>
                <li>Track internal state and telemetry</li>
                <li>Stay independent—no subsystem should reach into another</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers3 className="w-6 h-6 text-accent" />
            Example: DriveTrainSubsystem (FTCLib style)
          </h2>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Subsystems;

import com.arcrobotics.ftclib.command.SubsystemBase;
import com.qualcomm.robotcore.hardware.IMU;
import com.qualcomm.robotcore.util.Range;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.HardwareMap;
import org.firstinspires.ftc.robotcore.external.Telemetry;
import org.firstinspires.ftc.robotcore.external.navigation.AngleUnit;
import org.firstinspires.ftc.teamcode.Constants;

public class DriveTrainSubsystem extends SubsystemBase {
    public static DcMotor FrontLeftMotor;
    public static DcMotor FrontRightMotor;
    public static DcMotor BackLeftMotor;
    public static DcMotor BackRightMotor;
    public static IMU imu;
    public static Telemetry telemetry;
    
    IMU.Parameters parameters = new IMU.Parameters(
        Constants.DriveTrainConstants.revHubOrientationOnRobot
    );

    public DriveTrainSubsystem(HardwareMap hardwareMap, Telemetry telemetry){
        // Initialize motors from Constants
        FrontLeftMotor = hardwareMap.get(DcMotor.class, 
            Constants.DriveTrainConstants.FrontLeftName);
        FrontRightMotor = hardwareMap.get(DcMotor.class, 
            Constants.DriveTrainConstants.FrontRightName);
        BackLeftMotor = hardwareMap.get(DcMotor.class, 
            Constants.DriveTrainConstants.BackLeftName);
        BackRightMotor = hardwareMap.get(DcMotor.class, 
            Constants.DriveTrainConstants.BackRightName);
        imu = hardwareMap.get(IMU.class, 
            Constants.DriveTrainConstants.imuName);
        DriveTrainSubsystem.telemetry = telemetry;

        // Set motor directions from Constants
        FrontLeftMotor.setDirection(
            Constants.DriveTrainConstants.FrontLeftDirection);
        FrontRightMotor.setDirection(
            Constants.DriveTrainConstants.FrontRightDirection);
        BackLeftMotor.setDirection(
            Constants.DriveTrainConstants.BackLeftDirection);
        BackRightMotor.setDirection(
            Constants.DriveTrainConstants.BackRightDirectiom);

        // Initialize IMU
        imu.initialize(parameters);
        setZeroPowerBehaviour();
    }
    
    @Override
    public void periodic(){
        super.periodic();
        // Update telemetry every loop
        telemetry.addData("Robot heading", getHeadingDegrees());
        telemetry.update();
    }

    public double getHeadingRadians(){
        return imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.RADIANS);
    }
    
    public double getHeadingDegrees(){
        return imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
    }
    
    public void resetHeading(boolean reInit){
        imu.resetYaw();
        if (reInit){
            imu.initialize(parameters);
        }
    }
    
    public void FieldCentricDrive(double x, double y, double rx){
        // Field-centric drive implementation
        // (See MecanumDrive tutorial for full code)
    }
    
    public void setMotorPowers(double lf, double rf, double lb, double rb){
        FrontLeftMotor.setPower(lf);
        FrontRightMotor.setPower(rf);
        BackLeftMotor.setPower(lb);
        BackRightMotor.setPower(rb);
    }
    
    public void setZeroPowerBehaviour(){
        FrontLeftMotor.setZeroPowerBehavior(
            Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
        FrontRightMotor.setZeroPowerBehavior(
            Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
        BackLeftMotor.setZeroPowerBehavior(
            Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
        BackRightMotor.setZeroPowerBehavior(
            Constants.DriveTrainConstants.ZERO_POWER_BEHAVIOUR);
    }
}`}
          />

          <p className="text-muted-foreground mt-4">
            The subsystem updates itself inside <code className="bg-muted px-2 py-1 rounded text-sm">periodic()</code>, so commands only worry about high-level goals. Notice how all hardware names and settings come from <code className="bg-muted px-2 py-1 rounded text-sm">Constants</code>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Suggested subsystem list</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "DriveSubsystem", detail: "Owns the mecanum motors, odometry, IMU." },
              { title: "IntakeSubsystem", detail: "Controls rollers, sensors, and jam detection." },
              { title: "LiftSubsystem", detail: "Slides, arms, and preset levels." },
              { title: "ClawSubsystem", detail: "Grippers, servos, limit switches." },
            ].map((item) => (
              <Card key={item.title} className="p-4 border-border">
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </DocsLayout>
  );
};

export default Subsystems;

