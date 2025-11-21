import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Camera, Package, Target, Code2, Play } from "lucide-react";

const SeasonExample = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Full Season Example Code</h1>
          <p className="text-lg text-muted-foreground">
            Complete, production-ready code examples for a full FTC season robot with AprilTags vision, intake, shooter, and all subsystems integrated.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Code2 className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Complete Codebase</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>AprilTags vision subsystem for localization</li>
                <li>Intake subsystem with sensor integration</li>
                <li>Shooter subsystem with velocity control</li>
                <li>Complete TeleOp and Autonomous OpModes</li>
                <li>All constants and configuration</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            AprilTags Vision Subsystem
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            AprilTags provide field localization for autonomous routines. This subsystem detects tags and provides pose information.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Subsystems;

import com.arcrobotics.ftclib.command.SubsystemBase;
import com.qualcomm.robotcore.hardware.HardwareMap;
import org.firstinspires.ftc.robotcore.external.Telemetry;
import org.firstinspires.ftc.robotcore.external.hardware.camera.BuiltinCameraName;
import org.firstinspires.ftc.robotcore.external.hardware.camera.WebcamName;
import org.firstinspires.ftc.vision.VisionPortal;
import org.firstinspires.ftc.vision.apriltag.AprilTagDetection;
import org.firstinspires.ftc.vision.apriltag.AprilTagProcessor;
import org.firstinspires.ftc.vision.apriltag.AprilTagPoseFtc;
import org.firstinspires.ftc.robotcore.external.navigation.AngleUnit;
import org.firstinspires.ftc.robotcore.external.navigation.DistanceUnit;

public class AprilTagSubsystem extends SubsystemBase {
    private AprilTagProcessor aprilTagProcessor;
    private VisionPortal visionPortal;
    private Telemetry telemetry;
    private WebcamName webcam;
    
    // Current detection data
    private AprilTagDetection currentDetection = null;
    private boolean tagDetected = false;

    public AprilTagSubsystem(HardwareMap hardwareMap, Telemetry telemetry) {
        this.telemetry = telemetry;
        this.webcam = hardwareMap.get(WebcamName.class, "Webcam 1");
        
        // Create AprilTag processor
        aprilTagProcessor = new AprilTagProcessor.Builder()
            .setDrawTagID(true)
            .setDrawTagOutline(true)
            .setDrawAxes(true)
            .setDrawCubeProjection(true)
            .build();
        
        // Create vision portal
        visionPortal = new VisionPortal.Builder()
            .setCamera(webcam)
            .addProcessor(aprilTagProcessor)
            .setCameraResolution(new android.util.Size(1280, 720))
            .setStreamFormat(VisionPortal.StreamFormat.YUY2)
            .enableLiveView(true)
            .setAutoStopLiveView(true)
            .build();
    }

    @Override
    public void periodic() {
        // Update detections
        updateDetections();
        
        // Display telemetry
        if (tagDetected && currentDetection != null) {
            telemetry.addData("Tag ID", currentDetection.id);
            telemetry.addData("Tag Detected", "YES");
            
            AprilTagPoseFtc pose = currentDetection.ftcPose;
            telemetry.addData("Range", "%.1f inches", pose.range);
            telemetry.addData("Bearing", "%.1f degrees", pose.bearing);
            telemetry.addData("Yaw", "%.1f degrees", pose.yaw);
        } else {
            telemetry.addData("Tag Detected", "NO");
        }
        telemetry.update();
    }

    private void updateDetections() {
        java.util.List<AprilTagDetection> detections = aprilTagProcessor.getDetections();
        
        if (detections.size() > 0) {
            // Get the first (closest) detection
            currentDetection = detections.get(0);
            tagDetected = true;
        } else {
            currentDetection = null;
            tagDetected = false;
        }
    }

    public boolean isTagDetected() {
        return tagDetected;
    }

    public int getDetectedTagId() {
        if (tagDetected && currentDetection != null) {
            return currentDetection.id;
        }
        return -1;
    }

    public double getTagRange() {
        if (tagDetected && currentDetection != null) {
            return currentDetection.ftcPose.range;
        }
        return 0.0;
    }

    public double getTagBearing() {
        if (tagDetected && currentDetection != null) {
            return currentDetection.ftcPose.bearing;
        }
        return 0.0;
    }

    public double getTagYaw() {
        if (tagDetected && currentDetection != null) {
            return currentDetection.ftcPose.yaw;
        }
        return 0.0;
    }

    public void stop() {
        if (visionPortal != null) {
            visionPortal.close();
        }
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Intake Subsystem
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Intake subsystem with motor control, sensor integration, and state management for reliable game element handling.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Subsystems;

import com.arcrobotics.ftclib.command.SubsystemBase;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DistanceSensor;
import com.qualcomm.robotcore.hardware.HardwareMap;
import org.firstinspires.ftc.robotcore.external.Telemetry;
import org.firstinspires.ftc.robotcore.external.navigation.DistanceUnit;
import org.firstinspires.ftc.teamcode.Constants;

public class IntakeSubsystem extends SubsystemBase {
    private DcMotor intakeMotor;
    private DistanceSensor intakeSensor;
    private Telemetry telemetry;
    
    private double intakePower = 0.0;
    private boolean hasElement = false;
    
    public enum IntakeState {
        IDLE,
        INTAKING,
        OUTTAKING,
        HOLDING
    }
    
    private IntakeState currentState = IntakeState.IDLE;

    public IntakeSubsystem(HardwareMap hardwareMap, Telemetry telemetry) {
        this.telemetry = telemetry;
        
        // Initialize motor from Constants
        intakeMotor = hardwareMap.get(DcMotor.class, 
            Constants.IntakeConstants.INTAKE_MOTOR_NAME);
        intakeMotor.setDirection(Constants.IntakeConstants.INTAKE_DIRECTION);
        intakeMotor.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.BRAKE);
        intakeMotor.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
        
        // Initialize sensor
        intakeSensor = hardwareMap.get(DistanceSensor.class, 
            Constants.IntakeConstants.INTAKE_SENSOR_NAME);
    }

    @Override
    public void periodic() {
        // Update sensor reading
        updateSensorReading();
        
        // State machine logic
        switch (currentState) {
            case IDLE:
                intakeMotor.setPower(0);
                break;
                
            case INTAKING:
                intakeMotor.setPower(Constants.IntakeConstants.INTAKE_POWER);
                if (hasElement) {
                    currentState = IntakeState.HOLDING;
                }
                break;
                
            case OUTTAKING:
                intakeMotor.setPower(-Constants.IntakeConstants.OUTTAKE_POWER);
                break;
                
            case HOLDING:
                intakeMotor.setPower(0);
                break;
        }
        
        // Telemetry
        telemetry.addData("Intake State", currentState);
        telemetry.addData("Has Element", hasElement);
        telemetry.addData("Distance (cm)", 
            intakeSensor.getDistance(DistanceUnit.CM));
    }

    private void updateSensorReading() {
        double distance = intakeSensor.getDistance(DistanceUnit.CM);
        hasElement = distance < Constants.IntakeConstants.ELEMENT_DETECTION_DISTANCE_CM;
    }

    public void intake() {
        currentState = IntakeState.INTAKING;
    }

    public void outtake() {
        currentState = IntakeState.OUTTAKING;
    }

    public void stop() {
        currentState = IntakeState.IDLE;
    }

    public void hold() {
        currentState = IntakeState.HOLDING;
    }

    public boolean hasGameElement() {
        return hasElement;
    }

    public IntakeState getState() {
        return currentState;
    }
}`}
          />
          
          <Card className="mt-6 p-5 border-l-4 border-l-accent bg-accent/5">
            <h4 className="font-semibold text-foreground mb-3">Intake Constants</h4>
            <CodeBlock
              language="java"
              code={`// Add to Constants.java
public static class IntakeConstants {
    public static String INTAKE_MOTOR_NAME = "intakeMotor";
    public static DcMotorSimple.Direction INTAKE_DIRECTION = 
        DcMotorSimple.Direction.FORWARD;
    public static String INTAKE_SENSOR_NAME = "intakeDistance";
    public static double INTAKE_POWER = 0.8;
    public static double OUTTAKE_POWER = 0.6;
    public static double ELEMENT_DETECTION_DISTANCE_CM = 5.0;
}`}
            />
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Shooter Subsystem
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Shooter subsystem with velocity control, PID tuning, and feed mechanism integration for accurate scoring.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.Subsystems;

import com.arcrobotics.ftclib.command.SubsystemBase;
import com.arcrobotics.ftclib.controller.PIDController;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorEx;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.hardware.HardwareMap;
import org.firstinspires.ftc.robotcore.external.Telemetry;
import org.firstinspires.ftc.teamcode.Constants;

public class ShooterSubsystem extends SubsystemBase {
    private DcMotorEx shooterMotor;
    private Servo feedServo;
    private PIDController velocityPID;
    private Telemetry telemetry;
    
    private double targetVelocity = 0.0;
    private boolean isShooting = false;
    
    public enum ShooterState {
        IDLE,
        SPINNING_UP,
        READY,
        SHOOTING
    }
    
    private ShooterState currentState = ShooterState.IDLE;

    public ShooterSubsystem(HardwareMap hardwareMap, Telemetry telemetry) {
        this.telemetry = telemetry;
        
        // Initialize shooter motor
        shooterMotor = hardwareMap.get(DcMotorEx.class, 
            Constants.ShooterConstants.SHOOTER_MOTOR_NAME);
        shooterMotor.setDirection(Constants.ShooterConstants.SHOOTER_DIRECTION);
        shooterMotor.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.FLOAT);
        shooterMotor.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        
        // Initialize PID controller from Constants
        velocityPID = new PIDController(
            Constants.ShooterConstants.KP,
            Constants.ShooterConstants.KI,
            Constants.ShooterConstants.KD
        );
        
        // Initialize feed servo
        feedServo = hardwareMap.get(Servo.class, 
            Constants.ShooterConstants.FEED_SERVO_NAME);
        feedServo.setPosition(Constants.ShooterConstants.FEED_RETRACT_POSITION);
    }

    @Override
    public void periodic() {
        // Update shooter velocity control
        updateShooterVelocity();
        
        // State machine
        switch (currentState) {
            case IDLE:
                targetVelocity = 0;
                feedServo.setPosition(Constants.ShooterConstants.FEED_RETRACT_POSITION);
                break;
                
            case SPINNING_UP:
                targetVelocity = Constants.ShooterConstants.TARGET_VELOCITY;
                if (isAtTargetVelocity()) {
                    currentState = ShooterState.READY;
                }
                break;
                
            case READY:
                targetVelocity = Constants.ShooterConstants.TARGET_VELOCITY;
                feedServo.setPosition(Constants.ShooterConstants.FEED_RETRACT_POSITION);
                break;
                
            case SHOOTING:
                targetVelocity = Constants.ShooterConstants.TARGET_VELOCITY;
                feedServo.setPosition(Constants.ShooterConstants.FEED_EXTEND_POSITION);
                // Auto-retract after shot
                if (System.currentTimeMillis() % 500 < 100) {
                    feedServo.setPosition(Constants.ShooterConstants.FEED_RETRACT_POSITION);
                    currentState = ShooterState.READY;
                }
                break;
        }
        
        // Telemetry
        telemetry.addData("Shooter State", currentState);
        telemetry.addData("Target Velocity", targetVelocity);
        telemetry.addData("Current Velocity", shooterMotor.getVelocity());
        telemetry.addData("At Target", isAtTargetVelocity());
    }

    private void updateShooterVelocity() {
        if (targetVelocity > 0) {
            double currentVelocity = shooterMotor.getVelocity();
            double output = velocityPID.calculate(currentVelocity, targetVelocity);
            shooterMotor.setPower(output);
        } else {
            shooterMotor.setPower(0);
        }
    }

    private boolean isAtTargetVelocity() {
        double currentVelocity = shooterMotor.getVelocity();
        double error = Math.abs(currentVelocity - targetVelocity);
        return error < Constants.ShooterConstants.VELOCITY_TOLERANCE;
    }

    public void spinUp() {
        currentState = ShooterState.SPINNING_UP;
    }

    public void shoot() {
        if (currentState == ShooterState.READY) {
            currentState = ShooterState.SHOOTING;
        }
    }

    public void stop() {
        currentState = ShooterState.IDLE;
    }

    public boolean isReady() {
        return currentState == ShooterState.READY;
    }

    public ShooterState getState() {
        return currentState;
    }
}`}
          />
          
          <Card className="mt-6 p-5 border-l-4 border-l-accent bg-accent/5">
            <h4 className="font-semibold text-foreground mb-3">Shooter Constants</h4>
            <CodeBlock
              language="java"
              code={`// Add to Constants.java
public static class ShooterConstants {
    public static String SHOOTER_MOTOR_NAME = "shooterMotor";
    public static DcMotorSimple.Direction SHOOTER_DIRECTION = 
        DcMotorSimple.Direction.FORWARD;
    public static String FEED_SERVO_NAME = "feedServo";
    
    // PID values (tune these for your robot)
    public static double KP = 0.01;
    public static double KI = 0.0;
    public static double KD = 0.0001;
    
    // Velocity control
    public static double TARGET_VELOCITY = 2000.0;  // ticks per second
    public static double VELOCITY_TOLERANCE = 50.0;
    
    // Servo positions
    public static double FEED_RETRACT_POSITION = 0.0;
    public static double FEED_EXTEND_POSITION = 1.0;
}`}
            />
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-primary" />
            Complete TeleOp OpMode
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Full TeleOp that integrates all subsystems with gamepad controls.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.OpModes;

import com.arcrobotics.ftclib.command.CommandOpMode;
import com.arcrobotics.ftclib.command.RunCommand;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import org.firstinspires.ftc.teamcode.Subsystems.DriveTrainSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.IntakeSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.ShooterSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.AprilTagSubsystem;
import org.firstinspires.ftc.teamcode.Commands.DefaultDriveCommand;

@TeleOp(name="Full Season TeleOp", group="Competition")
public class FullSeasonTeleOp extends CommandOpMode {
    
    private DriveTrainSubsystem driveTrain;
    private IntakeSubsystem intake;
    private ShooterSubsystem shooter;
    private AprilTagSubsystem vision;

    @Override
    public void initialize() {
        // Initialize all subsystems
        driveTrain = new DriveTrainSubsystem(hardwareMap, telemetry);
        intake = new IntakeSubsystem(hardwareMap, telemetry);
        shooter = new ShooterSubsystem(hardwareMap, telemetry);
        vision = new AprilTagSubsystem(hardwareMap, telemetry);
        
        // Reset IMU
        driveTrain.resetHeading(false);
        
        // Set default drive command
        driveTrain.setDefaultCommand(
            new RunCommand(() -> {
                double x = gamepad1.left_stick_x;
                double y = -gamepad1.left_stick_y;
                double rx = gamepad1.right_stick_x;
                
                // Slow mode
                if (gamepad1.left_trigger > 0.5) {
                    x *= 0.4;
                    y *= 0.4;
                    rx *= 0.4;
                }
                
                new DefaultDriveCommand(driveTrain, x, y, rx).schedule();
            })
        );
        
        telemetry.addLine("Ready! Press START to begin.");
        telemetry.update();
    }

    @Override
    public void run() {
        // Intake controls (Gamepad 1)
        if (gamepad1.right_bumper) {
            intake.intake();
        } else if (gamepad1.left_bumper) {
            intake.outtake();
        } else {
            intake.stop();
        }
        
        // Shooter controls (Gamepad 2)
        if (gamepad2.a) {
            shooter.spinUp();
        }
        if (gamepad2.b) {
            shooter.shoot();
        }
        if (gamepad2.x) {
            shooter.stop();
        }
        
        // Vision display (Gamepad 2)
        if (gamepad2.y) {
            telemetry.addLine("--- Vision Info ---");
            telemetry.addData("Tag Detected", vision.isTagDetected());
            if (vision.isTagDetected()) {
                telemetry.addData("Tag ID", vision.getDetectedTagId());
                telemetry.addData("Range", vision.getTagRange());
            }
        }
        
        run();
    }
    
    @Override
    public void stop() {
        // Clean shutdown
        vision.stop();
        shooter.stop();
        intake.stop();
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-primary" />
            Complete Autonomous OpMode
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Autonomous routine that uses vision, intake, shooter, and drive subsystems together.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode.OpModes;

import com.arcrobotics.ftclib.command.CommandOpMode;
import com.arcrobotics.ftclib.command.SequentialCommandGroup;
import com.arcrobotics.ftclib.command.WaitCommand;
import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import org.firstinspires.ftc.teamcode.Subsystems.DriveTrainSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.IntakeSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.ShooterSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.AprilTagSubsystem;
import org.firstinspires.ftc.teamcode.Subsystems.OdometrySubsystem;
import org.firstinspires.ftc.teamcode.Commands.DriveToPoseCommand;

@Autonomous(name="Full Season Auto", group="Competition")
public class FullSeasonAuto extends CommandOpMode {
    
    private DriveTrainSubsystem driveTrain;
    private IntakeSubsystem intake;
    private ShooterSubsystem shooter;
    private AprilTagSubsystem vision;
    private OdometrySubsystem odometry;

    @Override
    public void initialize() {
        // Initialize all subsystems
        driveTrain = new DriveTrainSubsystem(hardwareMap, telemetry);
        intake = new IntakeSubsystem(hardwareMap, telemetry);
        shooter = new ShooterSubsystem(hardwareMap, telemetry);
        vision = new AprilTagSubsystem(hardwareMap, telemetry);
        odometry = new OdometrySubsystem(hardwareMap, telemetry);
        
        // Reset and calibrate
        driveTrain.resetHeading(true);
        odometry.ResetandCalibrateIMU();
        
        telemetry.addLine("Ready! Press START to begin.");
        telemetry.update();
    }

    @Override
    public void run() {
        waitForStart();
        if (isStopRequested()) return;
        
        // Detect starting position from AprilTag
        int detectedTag = vision.getDetectedTagId();
        telemetry.addData("Starting Tag", detectedTag);
        telemetry.update();
        
        // Create autonomous sequence
        SequentialCommandGroup autoSequence = new SequentialCommandGroup(
            // Step 1: Spin up shooter
            new RunCommand(() -> shooter.spinUp()),
            new WaitCommand(2000),
            
            // Step 2: Drive to shooting position
            new DriveToPoseCommand(driveTrain, odometry, 0, 60, 0),
            new WaitCommand(500),
            
            // Step 3: Shoot preload
            new RunCommand(() -> shooter.shoot()),
            new WaitCommand(1000),
            
            // Step 4: Drive to pick up game element
            new DriveToPoseCommand(driveTrain, odometry, 30, 60, 0),
            new WaitCommand(500),
            
            // Step 5: Intake game element
            new RunCommand(() -> intake.intake()),
            new WaitCommand(1000),
            new RunCommand(() -> intake.stop()),
            
            // Step 6: Drive back to shooting position
            new DriveToPoseCommand(driveTrain, odometry, 0, 60, 0),
            new WaitCommand(500),
            
            // Step 7: Shoot collected element
            new RunCommand(() -> shooter.shoot()),
            new WaitCommand(1000),
            
            // Step 8: Park
            new DriveToPoseCommand(driveTrain, odometry, 0, 30, 0)
        );
        
        // Execute sequence
        autoSequence.schedule();
        
        while (opModeIsActive() && !autoSequence.isFinished()) {
            run();
        }
        
        // Cleanup
        shooter.stop();
        intake.stop();
        vision.stop();
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Complete Constants File</h2>
          <p className="text-foreground leading-relaxed mb-4">
            All constants organized by subsystem for easy configuration.
          </p>

          <CodeBlock
            language="java"
            code={`package org.firstinspires.ftc.teamcode;

import com.qualcomm.hardware.rev.RevHubOrientationOnRobot;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorSimple;

public class Constants {
    // DriveTrain constants (from previous examples)
    public static class DriveTrainConstants {
        // ... (see ConstantsGuide for full implementation)
    }
    
    // Intake constants
    public static class IntakeConstants {
        public static String INTAKE_MOTOR_NAME = "intakeMotor";
        public static DcMotorSimple.Direction INTAKE_DIRECTION = 
            DcMotorSimple.Direction.FORWARD;
        public static String INTAKE_SENSOR_NAME = "intakeDistance";
        public static double INTAKE_POWER = 0.8;
        public static double OUTTAKE_POWER = 0.6;
        public static double ELEMENT_DETECTION_DISTANCE_CM = 5.0;
    }
    
    // Shooter constants
    public static class ShooterConstants {
        public static String SHOOTER_MOTOR_NAME = "shooterMotor";
        public static DcMotorSimple.Direction SHOOTER_DIRECTION = 
            DcMotorSimple.Direction.FORWARD;
        public static String FEED_SERVO_NAME = "feedServo";
        public static double KP = 0.01;
        public static double KI = 0.0;
        public static double KD = 0.0001;
        public static double TARGET_VELOCITY = 2000.0;
        public static double VELOCITY_TOLERANCE = 50.0;
        public static double FEED_RETRACT_POSITION = 0.0;
        public static double FEED_EXTEND_POSITION = 1.0;
    }
    
    // Vision constants
    public static class VisionConstants {
        public static String WEBCAM_NAME = "Webcam 1";
        public static int CAMERA_WIDTH = 1280;
        public static int CAMERA_HEIGHT = 720;
    }
    
    // Odometry constants (from previous examples)
    public static class OdometryConstants {
        // ... (see SensorIntegration for full implementation)
    }
    
    // DriveToPose constants (from previous examples)
    public static class DriveToPoseConstants {
        // ... (see CommandsGuide for full implementation)
    }
}`}
          />
        </section>
      </article>
    </DocsLayout>
  );
};

export default SeasonExample;

