import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Database, FolderGit2 } from "lucide-react";

const ConstantsGuide = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Constants & Configuration Files</h1>
          <p className="text-lg text-muted-foreground">
            Centralize robot measurements, motor names, and tuning values so every subsystem reads from a single source of truth.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Why invest in constants?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Change drivetrain measurements in one place</li>
                <li>Reuse motor names across TeleOp and Autonomous</li>
                <li>Avoid “magic numbers” buried inside OpModes</li>
                <li>Share motion constraints between commands</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Typical layout</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Create a <code className="bg-muted px-2 py-1 rounded text-sm">Constants</code> (or <code className="bg-muted px-2 py-1 rounded text-sm">RobotConfig</code>) class at the root of your TeamCode module. Group values by subsystem to keep them organized.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode;

import com.qualcomm.hardware.gobilda.GoBildaPinpointDriver;
import com.qualcomm.hardware.rev.RevHubOrientationOnRobot;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

import org.firstinspires.ftc.robotcore.external.navigation.AngleUnit;
import org.firstinspires.ftc.robotcore.external.navigation.DistanceUnit;
import org.firstinspires.ftc.robotcore.external.navigation.Pose2D;

public class Constants {
    public static class DriveTrainConstants{
        // Motor names (must match Robot Controller config)
        public static String FrontLeftName = "FrontLeftDrive";
        public static String FrontRightName = "FrontRightDrive";
        public static String BackLeftName = "BackLeftMotor";
        public static String BackRightName = "BackRightMotor";
        public static String imuName = "imu";

        // Motor directions
        public static DcMotorSimple.Direction FrontLeftDirection = DcMotorSimple.Direction.FORWARD;
        public static DcMotorSimple.Direction FrontRightDirection = DcMotorSimple.Direction.FORWARD;
        public static DcMotorSimple.Direction BackLeftDirection = DcMotorSimple.Direction.REVERSE;
        public static DcMotorSimple.Direction BackRightDirectiom = DcMotorSimple.Direction.REVERSE;
        
        // IMU orientation
        public static RevHubOrientationOnRobot revHubOrientationOnRobot = 
            new RevHubOrientationOnRobot(
                RevHubOrientationOnRobot.LogoFacingDirection.UP, 
                RevHubOrientationOnRobot.UsbFacingDirection.BACKWARD
            );
        
        // Motor behavior
        public static DcMotor.ZeroPowerBehavior ZERO_POWER_BEHAVIOUR = 
            DcMotor.ZeroPowerBehavior.BRAKE;

        // Speed limits for TeleOp
        public static double MAX_X_SPEED = 1;
        public static double MAX_Y_SPEED = 1;
        public static double MAX_RX_SPEED = 1;
        
        // Speed limits for Autonomous
        public static double MAX_X_AUTO_SPEED = 1;
        public static double MAX_Y_AUTO_SPEED = 1;
        public static double MAX_RX_AUTO_SPEED = 1;
    }
    
    public static class OdometryConstants{
        public static String PINPOINT_NAME = "pinpoint";
        public static GoBildaPinpointDriver.GoBildaOdometryPods POD_TYPE = 
            GoBildaPinpointDriver.GoBildaOdometryPods.goBILDA_4_BAR_POD;
        public static double X_OFFSET_CM = 0;
        public static double Y_OFFSET_CM = 0;
        public static GoBildaPinpointDriver.EncoderDirection ENCODER_DIRECTION_X = 
            GoBildaPinpointDriver.EncoderDirection.FORWARD;
        public static GoBildaPinpointDriver.EncoderDirection ENCODER_DIRECTION_Y = 
            GoBildaPinpointDriver.EncoderDirection.FORWARD;
        public static Pose2D STARTING_POSE_CM_DEGREE = 
            new Pose2D(DistanceUnit.CM, 0, 0, AngleUnit.DEGREES, 0);
    }

    public static class DriveToPoseConstants {
        public static final double ODO_COUNTS_PER_INCH = 307.699557;
        public static final double KP_X = 0.05;
        public static final double KP_Y = 0.05;
        public static final double KP_H = 0.01;
        public static final double POSE_TOLERANCE_X = 1.0;
        public static final double POSE_TOLERANCE_Y = 1.0;
        public static final double POSE_TOLERANCE_H = Math.toRadians(3);
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-primary" />
            Version control tips
          </h2>
          <ul className="space-y-3 text-foreground">
            <li>
              <span className="font-semibold">Snapshot every field measurement.</span> Commit constants changes with a descriptive message so other programmers know what changed on the robot.
            </li>
            <li>
              <span className="font-semibold">Annotate tuning values.</span> Add comments that describe how a number was derived or when it was last tested.
            </li>
            <li>
              <span className="font-semibold">Mirror in FTCLab or notebooks.</span> Keep the same values in your digital log to explain decisions to judges.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Using constants inside subsystems</h2>
          <CodeBlock
            language="java"
            code={`// In your DriveTrainSubsystem constructor
FrontLeftMotor = hardwareMap.get(DcMotor.class, Constants.DriveTrainConstants.FrontLeftName);
FrontRightMotor = hardwareMap.get(DcMotor.class, Constants.DriveTrainConstants.FrontRightName);
BackLeftMotor = hardwareMap.get(DcMotor.class, Constants.DriveTrainConstants.BackLeftName);
BackRightMotor = hardwareMap.get(DcMotor.class, Constants.DriveTrainConstants.BackRightName);
imu = hardwareMap.get(IMU.class, Constants.DriveTrainConstants.imuName);

// Set motor directions from constants
FrontLeftMotor.setDirection(Constants.DriveTrainConstants.FrontLeftDirection);
FrontRightMotor.setDirection(Constants.DriveTrainConstants.FrontRightDirection);
BackLeftMotor.setDirection(Constants.DriveTrainConstants.BackLeftDirection);
BackRightMotor.setDirection(Constants.DriveTrainConstants.BackRightDirectiom);

// Use speed limits from constants
double scaledX = Range.scale(x, -1, 1, 
    -Constants.DriveTrainConstants.MAX_X_SPEED, 
    Constants.DriveTrainConstants.MAX_X_SPEED);`}
          />

          <p className="text-muted-foreground mt-4">
            When someone renames a motor in the Robot Controller configuration, you only touch <code className="bg-muted px-2 py-1 rounded text-sm">Constants</code>. Every subsystem instantly receives the update.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default ConstantsGuide;

