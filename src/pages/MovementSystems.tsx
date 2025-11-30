import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Compass, Zap, AlertCircle } from "lucide-react";

const MovementSystems = () => {
  const hardware = [
    { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
    { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
    { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
    { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
  ];

  const movementSequence = [
    { type: "forward" as const, duration: 1000, power: 0.5 },
    { type: "right" as const, duration: 1000, power: 0.5 },
    { type: "backward" as const, duration: 1000, power: 0.5 },
    { type: "left" as const, duration: 1000, power: 0.5 },
    { type: "stop" as const, duration: 500 },
  ];

  return (
    <DocsLayout 
      robotHardware={hardware}
      movementSequence={movementSequence}
      codeDescription="Mecanum hareket: İleri, sağa strafe, geri, sola strafe"
    >
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Hareket Sistemleri</h1>
          <p className="text-lg text-muted-foreground">
            Farklı tahrik sistemlerini ve mecanum wheel programlamayı öğren.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Compass className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Neler Öğreneceksin?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Tank Drive vs Mecanum Drive</li>
                <li>Mecanum wheel matematiği</li>
                <li>Omnidirectional hareket (strafe)</li>
                <li>Field-centric kontrol</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            Tahrik Sistemi Türleri
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            FTC'de iki ana tahrik sistemi türü vardır: Tank Drive ve Mecanum Drive. 
            Her birinin kendine özgü avantaj ve dezavantajları vardır.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-5 border-border">
              <h4 className="font-semibold text-foreground mb-2">Tank Drive</h4>
              <p className="text-sm text-muted-foreground mb-3">
                4 veya 6 normal tekerlek. Basit, güçlü, ve güvenilir.
              </p>
              <div className="text-xs space-y-1">
                <p className="text-green-600">✓ Maksimum itme gücü</p>
                <p className="text-green-600">✓ Basit programlama</p>
                <p className="text-green-600">✓ Çok güvenilir</p>
                <p className="text-red-600">✗ Yan hareket yok</p>
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h4 className="font-semibold text-foreground mb-2">Mecanum Drive</h4>
              <p className="text-sm text-muted-foreground mb-3">
                4 mecanum tekerlek. Omnidirectional hareket (tüm yönlere gidebilir).
              </p>
              <div className="text-xs space-y-1">
                <p className="text-green-600">✓ Yan hareket (strafe)</p>
                <p className="text-green-600">✓ Çok manevralı</p>
                <p className="text-green-600">✓ Hızlı pozisyonlama</p>
                <p className="text-red-600">✗ Daha az itme gücü</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Mecanum Drive Kontrolü</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Mecanum tekerlekler, açılı makaralar sayesinde robotun her yöne hareket etmesini sağlar. 
            Her motorun gücü, hareket vektörünü oluşturmak için özel bir formülle hesaplanır.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">Mecanum Matematiği</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Mecanum drive için motor güçleri şu formüllerle hesaplanır:
            </p>
            <div className="bg-muted/50 rounded p-3 text-xs font-mono text-muted-foreground space-y-1">
              <div>leftFront = drive + strafe + turn</div>
              <div>rightFront = drive - strafe - turn</div>
              <div>leftRear = drive - strafe + turn</div>
              <div>rightRear = drive + strafe - turn</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              drive = ileri/geri, strafe = yan hareket, turn = dönüş
            </p>
          </Card>

          <h3 className="text-xl font-semibold text-foreground mb-3">Temel Mecanum TeleOp</h3>
          <CodeBlock
            language="java"
            code={`@TeleOp(name="Mecanum Drive", group="Hareket")
public class MecanumDrive extends OpMode {
    
    private DcMotor leftFront;
    private DcMotor rightFront;
    private DcMotor leftRear;
    private DcMotor rightRear;

    @Override
    public void init() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        // ÖNEMLI: Mecanum için motor yönleri
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        telemetry.addData("Durum", "Mecanum Drive hazır!");
    }

    @Override
    public void loop() {
        // Gamepad değerlerini al
        double drive = -gamepad1.left_stick_y;   // İleri/geri
        double strafe = gamepad1.left_stick_x;   // Sağa/sola strafe
        double turn = gamepad1.right_stick_x;    // Dönüş
        
        // Mecanum formülü
        double leftFrontPower = drive + strafe + turn;
        double rightFrontPower = drive - strafe - turn;
        double leftRearPower = drive - strafe + turn;
        double rightRearPower = drive + strafe - turn;
        
        // Güçleri normalize et (maksimum 1.0)
        double maxPower = Math.max(Math.abs(leftFrontPower), Math.abs(rightFrontPower));
        maxPower = Math.max(maxPower, Math.abs(leftRearPower));
        maxPower = Math.max(maxPower, Math.abs(rightRearPower));
        
        if (maxPower > 1.0) {
            leftFrontPower /= maxPower;
            rightFrontPower /= maxPower;
            leftRearPower /= maxPower;
            rightRearPower /= maxPower;
        }
        
        // Motorlara uygula
        leftFront.setPower(leftFrontPower);
        rightFront.setPower(rightFrontPower);
        leftRear.setPower(leftRearPower);
        rightRear.setPower(rightRearPower);
        
        // Telemetri
        telemetry.addData("İleri", "%.2f", drive);
        telemetry.addData("Strafe", "%.2f", strafe);
        telemetry.addData("Dönüş", "%.2f", turn);
        telemetry.addData("LF", "%.2f", leftFrontPower);
        telemetry.addData("RF", "%.2f", rightFrontPower);
        telemetry.addData("LR", "%.2f", leftRearPower);
        telemetry.addData("RR", "%.2f", rightRearPower);
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Normalizasyon Neden Önemli?</h4>
                <p className="text-sm text-muted-foreground">
                  Mecanum formülü, güçlerin 1.0'dan büyük olmasına neden olabilir. Normalizasyon, 
                  tüm güçleri orantılı olarak ölçekleyerek hepsinin yasal aralıkta kalmasını sağlar 
                  (hareket yönünü korurken).
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Field-Centric Drive</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Field-centric (saha merkezli) kontrol, joystick yönlerini robot yerine sahaya göre yorumlar. 
            Bu, sürücünün robot ne tarafa dönük olursa olsun aynı yönde kontrol etmesini sağlar.
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Field-Centric Mecanum", group="Hareket")
public class FieldCentricMecanum extends OpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;
    private IMU imu;

    @Override
    public void init() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        // IMU'yu başlat
        imu = hardwareMap.get(IMU.class, "imu");
        IMU.Parameters parameters = new IMU.Parameters(
            new RevHubOrientationOnRobot(
                RevHubOrientationOnRobot.LogoFacingDirection.UP,
                RevHubOrientationOnRobot.UsbFacingDirection.FORWARD
            )
        );
        imu.initialize(parameters);
        
        telemetry.addData("Mod", "Field-Centric hazır!");
        telemetry.addData("İpucu", "IMU'yu sıfırlamak için OPTIONS'a bas");
    }

    @Override
    public void loop() {
        // IMU sıfırlama (gamepad2.options tuşu)
        if (gamepad1.options) {
            imu.resetYaw();
        }
        
        // Robot açısını al
        double botHeading = imu.getRobotYawPitchRollAngles().getYaw(AngleUnit.RADIANS);
        
        // Gamepad değerlerini al
        double y = -gamepad1.left_stick_y;  // İleri/geri
        double x = gamepad1.left_stick_x;   // Sağa/sola strafe
        double rx = gamepad1.right_stick_x; // Dönüş
        
        // Joystick vektörünü robot açısına göre döndür
        double rotX = x * Math.cos(-botHeading) - y * Math.sin(-botHeading);
        double rotY = x * Math.sin(-botHeading) + y * Math.cos(-botHeading);
        
        // Mecanum formülünü döndürülmüş değerlerle uygula
        double leftFrontPower = rotY + rotX + rx;
        double rightFrontPower = rotY - rotX - rx;
        double leftRearPower = rotY - rotX + rx;
        double rightRearPower = rotY + rotX - rx;
        
        // Normalize et
        double maxPower = Math.max(Math.abs(leftFrontPower), Math.abs(rightFrontPower));
        maxPower = Math.max(maxPower, Math.abs(leftRearPower));
        maxPower = Math.max(maxPower, Math.abs(rightRearPower));
        
        if (maxPower > 1.0) {
            leftFrontPower /= maxPower;
            rightFrontPower /= maxPower;
            leftRearPower /= maxPower;
            rightRearPower /= maxPower;
        }
        
        // Uygula
        leftFront.setPower(leftFrontPower);
        rightFront.setPower(rightFrontPower);
        leftRear.setPower(leftRearPower);
        rightRear.setPower(rightRearPower);
        
        telemetry.addData("Robot Açısı", "%.1f°", Math.toDegrees(botHeading));
        telemetry.addData("X (Strafe)", "%.2f", x);
        telemetry.addData("Y (İleri)", "%.2f", y);
        telemetry.addData("Dönüş", "%.2f", rx);
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Field-Centric Nasıl Çalışır?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Field-centric kontrol, joystick girdilerini trigonometri kullanarak robot açısına göre döndürür. 
              Bu sayede joystick yukarı = her zaman saha yukarısı olur, robot hangi yöne dönmüş olursa olsun. 
              IMU açısını kullanarak dönüşüm matrisi uygular.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Otonom Mecanum Hareketi</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Mecanum drive'ı otonom'da kullanmak, sana her yöne hareket özgürlüğü verir. 
            Bu, karmaşık yollarda zaman kazandırır.
          </p>

          <CodeBlock
            language="java"
            code={`@Autonomous(name="Mecanum Otonom", group="Hareket")
public class MecanumOtonom extends LinearOpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;
    
    // Mecanum hareket fonksiyonu
    public void mecanumDrive(double y, double x, double rx, double timeSeconds) {
        // Mecanum formülü
        double leftFrontPower = y + x + rx;
        double rightFrontPower = y - x - rx;
        double leftRearPower = y - x + rx;
        double rightRearPower = y + x - rx;
        
        // Normalize
        double maxPower = Math.max(Math.abs(leftFrontPower), Math.abs(rightFrontPower));
        maxPower = Math.max(maxPower, Math.abs(leftRearPower));
        maxPower = Math.max(maxPower, Math.abs(rightRearPower));
        
        if (maxPower > 1.0) {
            leftFrontPower /= maxPower;
            rightFrontPower /= maxPower;
            leftRearPower /= maxPower;
            rightRearPower /= maxPower;
        }
        
        // Güç uygula
        leftFront.setPower(leftFrontPower);
        rightFront.setPower(rightFrontPower);
        leftRear.setPower(leftRearPower);
        rightRear.setPower(rightRearPower);
        
        // Belirtilen süre bekle
        sleep((long)(timeSeconds * 1000));
        
        // Durdur
        leftFront.setPower(0);
        rightFront.setPower(0);
        leftRear.setPower(0);
        rightRear.setPower(0);
    }

    @Override
    public void runOpMode() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        waitForStart();
        
        // Otonom rutin
        mecanumDrive(0.5, 0, 0, 2.0);      // 2 saniye ileri
        mecanumDrive(0, 0.5, 0, 1.5);      // 1.5 saniye sağa strafe
        mecanumDrive(-0.5, 0, 0, 2.0);     // 2 saniye geri
        mecanumDrive(0, -0.5, 0, 1.5);     // 1.5 saniye sola strafe
        mecanumDrive(0, 0, 0.3, 1.0);      // 1 saniye yerinde dön
        
        telemetry.addData("Durum", "Tamamlandı!");
        telemetry.update();
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Özet</h2>
          <div className="bg-card border border-border rounded-lg p-5">
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li><strong className="text-foreground">Tank Drive:</strong> Basit, güçlü, güvenilir - yan hareket yok</li>
              <li><strong className="text-foreground">Mecanum Drive:</strong> Omnidirectional, manevralı - programlama biraz daha karmaşık</li>
              <li><strong className="text-foreground">Robot-Centric:</strong> Joystick robot perspektifinden kontrol eder</li>
              <li><strong className="text-foreground">Field-Centric:</strong> Joystick saha perspektifinden kontrol eder (IMU gerekir)</li>
              <li><strong className="text-foreground">Normalizasyon:</strong> Motor güçlerini yasal aralıkta tutar</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Tebrikler!</h2>
          <p className="text-foreground leading-relaxed">
            FTC robot programlamanın temellerini tamamladın! Artık motorları başlatabilir, otonom ve TeleOp 
            programları yazabilir, sensörleri kullanabilir ve gelişmiş hareket sistemlerini programlayabilirsin. 
            Öğrenmeye devam et ve iyi yarışmalar!
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default MovementSystems;