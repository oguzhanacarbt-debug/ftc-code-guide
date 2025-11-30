import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Activity, Gauge, Ruler, AlertCircle } from "lucide-react";

const Sensors = () => {
  const hardware = [
    { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
    { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
    { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
    { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
    { name: "imu", type: "sensor" as const, position: { x: 100, y: 100 } },
  ];

  return (
    <DocsLayout robotHardware={hardware}>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Sensörler</h1>
          <p className="text-lg text-muted-foreground">
            Robot sensörlerini kullanarak çevreyi algılamayı ve hassas hareketler yapmayı öğren.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Neler Öğreneceksin?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Motor Encoder'ları kullanma</li>
                <li>IMU (Gyro) ile yönelim ölçme</li>
                <li>Mesafe sensörleri ile nesne algılama</li>
                <li>Sensör verilerini otonom hareketlerde kullanma</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Gauge className="w-8 h-8 text-primary" />
            Motor Encoder'ları
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Encoder'lar, motorun ne kadar döndüğünü sayan sensörlerdir. FTC'deki çoğu motor 
            yerleşik encoder'larla gelir. Bu, robotunun ne kadar ilerlediğini ölçmeni sağlar.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">Encoder Birimleri</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Encoder'lar <strong>"ticks"</strong> (tık) cinsinden ölçer. Her motor tipinin turbaşı farklı tık sayısı vardır:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">REV HD Hex Motor:</strong> 28 tık/devir (gear ratio ile çarpılır)</li>
                <li><strong className="text-foreground">goBILDA 5202:</strong> 537.7 tık/devir</li>
                <li><strong className="text-foreground">Tetrix TorqueNADO:</strong> 1440 tık/devir</li>
              </ul>
            </div>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Encoder Kullanarak İleri Gitme</h3>
          <CodeBlock
            language="java"
            code={`@Autonomous(name="Encoder İle İleri", group="Sensörler")
public class EncoderIleri extends LinearOpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;
    
    // Encoder sabitleri
    static final double COUNTS_PER_MOTOR_REV = 537.7;  // goBILDA 5202 için
    static final double DRIVE_GEAR_REDUCTION = 1.0;    // Gear ratio yoksa
    static final double WHEEL_DIAMETER_CM = 10.0;      // Tekerlek çapı
    static final double COUNTS_PER_CM = (COUNTS_PER_MOTOR_REV * DRIVE_GEAR_REDUCTION) / 
                                        (WHEEL_DIAMETER_CM * Math.PI);

    @Override
    public void runOpMode() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        // Encoder'ları sıfırla
        leftFront.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        rightFront.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        leftRear.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        rightRear.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
        
        // Encoder ile çalışma moduna geç
        leftFront.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        rightFront.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        leftRear.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        rightRear.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        
        waitForStart();
        
        // 50 cm ileri git
        encoderDrive(0.5, 50, 50, 5.0);
        
        telemetry.addData("Yol", "Tamamlandı");
        telemetry.update();
        sleep(1000);
    }
    
    public void encoderDrive(double speed, double leftCM, double rightCM, double timeoutS) {
        int newLeftTarget;
        int newRightTarget;
        
        if (opModeIsActive()) {
            // Hedef pozisyonları hesapla
            newLeftTarget = leftFront.getCurrentPosition() + (int)(leftCM * COUNTS_PER_CM);
            newRightTarget = rightFront.getCurrentPosition() + (int)(rightCM * COUNTS_PER_CM);
            
            // Hedefleri ayarla
            leftFront.setTargetPosition(newLeftTarget);
            rightFront.setTargetPosition(newRightTarget);
            leftRear.setTargetPosition(newLeftTarget);
            rightRear.setTargetPosition(newRightTarget);
            
            // RUN_TO_POSITION moduna geç
            leftFront.setMode(DcMotor.RunMode.RUN_TO_POSITION);
            rightFront.setMode(DcMotor.RunMode.RUN_TO_POSITION);
            leftRear.setMode(DcMotor.RunMode.RUN_TO_POSITION);
            rightRear.setMode(DcMotor.RunMode.RUN_TO_POSITION);
            
            // Motorları başlat
            runtime.reset();
            leftFront.setPower(Math.abs(speed));
            rightFront.setPower(Math.abs(speed));
            leftRear.setPower(Math.abs(speed));
            rightRear.setPower(Math.abs(speed));
            
            // Hedefe ulaşana veya timeout olana kadar bekle
            while (opModeIsActive() &&
                   (runtime.seconds() < timeoutS) &&
                   (leftFront.isBusy() && rightFront.isBusy())) {
                
                // Telemetride ilerlemeyi göster
                telemetry.addData("Hedef", "%7d : %7d", newLeftTarget, newRightTarget);
                telemetry.addData("Şu an", "%7d : %7d",
                    leftFront.getCurrentPosition(),
                    rightFront.getCurrentPosition());
                telemetry.update();
            }
            
            // Motorları durdur
            leftFront.setPower(0);
            rightFront.setPower(0);
            leftRear.setPower(0);
            rightRear.setPower(0);
            
            // RUN_USING_ENCODER moduna geri dön
            leftFront.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
            rightFront.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
            leftRear.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
            rightRear.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
        }
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-8 h-8 text-primary" />
            IMU (Gyro Sensor)
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            IMU (Inertial Measurement Unit), robotun yönelimini (hangi yöne baktığını) ölçen bir sensördür. 
            Control Hub ve Expansion Hub'larda yerleşik bir IMU bulunur.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">IMU Başlatma ve Kullanma</h3>
          <CodeBlock
            language="java"
            code={`@Autonomous(name="IMU Dönüş", group="Sensörler")
public class IMUDonus extends LinearOpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;
    private IMU imu;

    @Override
    public void runOpMode() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        // IMU'yu başlat
        imu = hardwareMap.get(IMU.class, "imu");
        
        // IMU yönelimini ayarla (Control Hub'ın nasıl monte edildiğine göre)
        IMU.Parameters parameters = new IMU.Parameters(new RevHubOrientationOnRobot(
            RevHubOrientationOnRobot.LogoFacingDirection.UP,
            RevHubOrientationOnRobot.UsbFacingDirection.FORWARD));
        imu.initialize(parameters);
        
        waitForStart();
        
        // IMU'yu sıfırla
        imu.resetYaw();
        
        // 90 derece sağa dön
        turnToHeading(0.3, 90);
        
        sleep(1000);
        
        // -90 derece (90 derece sola) dön
        turnToHeading(0.3, -90);
        
        telemetry.addData("Yol", "Tamamlandı");
        telemetry.update();
        sleep(1000);
    }
    
    public void turnToHeading(double turnSpeed, double heading) {
        while (opModeIsActive()) {
            // Mevcut açıyı al
            double currentHeading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
            
            // Hedefe olan hatayı hesapla
            double error = heading - currentHeading;
            
            // Hatayı -180 ile 180 arasına normalleştir
            while (error > 180) error -= 360;
            while (error <= -180) error += 360;
            
            // Hedefe yeterince yakın mıyız?
            if (Math.abs(error) < 2.0) {
                break;  // Hedefe ulaştık
            }
            
            // Dönüş gücünü hesapla (basit P kontrolcüsü)
            double turnPower = error * 0.02;  // P sabiti
            turnPower = Math.max(-turnSpeed, Math.min(turnSpeed, turnPower));
            
            // Dönüş uygula
            leftFront.setPower(turnPower);
            leftRear.setPower(turnPower);
            rightFront.setPower(-turnPower);
            rightRear.setPower(-turnPower);
            
            telemetry.addData("Hedef", heading);
            telemetry.addData("Şu an", currentHeading);
            telemetry.addData("Hata", error);
            telemetry.update();
        }
        
        // Motorları durdur
        leftFront.setPower(0);
        leftRear.setPower(0);
        rightFront.setPower(0);
        rightRear.setPower(0);
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">IMU Yönelimi</h4>
                <p className="text-sm text-muted-foreground">
                  Control Hub'ın robot üzerinde nasıl monte edildiğini <code className="bg-muted px-1.5 py-0.5 rounded text-xs">RevHubOrientationOnRobot</code> 
                  parametreleriyle belirtmelisin. Aksi halde açı okumaları yanlış olur!
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Ruler className="w-8 h-8 text-primary" />
            Mesafe Sensörleri
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Mesafe sensörleri (distance sensors veya range sensors), robotun nesnelere olan uzaklığını ölçer. 
            FTC'de yaygın olarak REV 2m Distance Sensor kullanılır.
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Mesafe Sensörü", group="Sensörler")
public class MesafeSensoru extends OpMode {
    
    private DistanceSensor distanceSensor;
    private DcMotor leftFront, rightFront, leftRear, rightRear;

    @Override
    public void init() {
        // Mesafe sensörünü başlat
        distanceSensor = hardwareMap.get(DistanceSensor.class, "distance");
        
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        telemetry.addData("Durum", "Başlatıldı");
    }

    @Override
    public void loop() {
        // Mesafeyi oku (cm cinsinden)
        double distance = distanceSensor.getDistance(DistanceUnit.CM);
        
        // Sürüş kontrolü
        double drive = -gamepad1.left_stick_y;
        double turn = gamepad1.right_stick_x;
        
        // Duvara çok yakın mıyız?
        if (distance < 15.0 && drive > 0) {
            // 15 cm'den yakın ve ileri gitmeye çalışıyorsa, dur!
            drive = 0;
            telemetry.addData("UYARI", "Duvara çok yakın!");
        }
        
        double leftPower = drive + turn;
        double rightPower = drive - turn;
        
        leftFront.setPower(leftPower);
        leftRear.setPower(leftPower);
        rightFront.setPower(rightPower);
        rightRear.setPower(rightPower);
        
        telemetry.addData("Mesafe", "%.1f cm", distance);
        telemetry.addData("Sürüş", drive);
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Mesafe Sensörü İpuçları</h4>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>REV 2m sensörü 5 cm ile 200 cm arası mesafeleri güvenilir şekilde ölçer</li>
              <li>Parlak ışık altında veya çok koyu yüzeylerde okumalar güvenilir olmayabilir</li>
              <li>Otonom'da duvara hizalanma için veya nesne algılama için harikadır</li>
              <li>Birden fazla sensör kullanarak robotun etrafını algılayabilirsin</li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sensörleri Birleştirme</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Gerçek rekabetçi robotlar genellikle birden fazla sensör tipini birlikte kullanır. 
            Örneğin, encoder'lar ile hassas hareket + IMU ile doğru açı kontrolü.
          </p>

          <CodeBlock
            language="java"
            code={`// Encoder ve IMU ile düz git
public void straightDrive(double speed, double distanceCM, double heading) {
    // Hedef encoder değerini hesapla
    int targetPosition = (int)(distanceCM * COUNTS_PER_CM);
    
    // Encoder hedeflerini ayarla
    leftFront.setTargetPosition(leftFront.getCurrentPosition() + targetPosition);
    rightFront.setTargetPosition(rightFront.getCurrentPosition() + targetPosition);
    // ... diğer motorlar
    
    // RUN_TO_POSITION modu
    leftFront.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    rightFront.setMode(DcMotor.RunMode.RUN_TO_POSITION);
    
    while (opModeIsActive() && leftFront.isBusy()) {
        // IMU ile açı kontrolü
        double currentHeading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.DEGREES);
        double error = heading - currentHeading;
        
        // Düzeltme hesapla
        double correction = error * 0.02;
        
        // Motorları ayarla (sola kayıyorsa sağ motoru hızlandır)
        leftFront.setPower(speed - correction);
        rightFront.setPower(speed + correction);
    }
    
    // Durdur
    leftFront.setPower(0);
    rightFront.setPower(0);
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sırada Ne Var?</h2>
          <p className="text-foreground leading-relaxed">
            Artık temel sensörleri kullanmayı biliyorsun! Sırada, gelişmiş hareket sistemlerini 
            ve mecanum wheel programlamayı öğren.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default Sensors;