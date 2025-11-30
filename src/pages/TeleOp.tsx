import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Gamepad2, Zap, AlertCircle } from "lucide-react";

const TeleOp = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">TeleOp Modu</h1>
          <p className="text-lg text-muted-foreground">
            Joystick kontrolü ile robotunu nasıl süreceğini öğren.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Gamepad2 className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Neler Öğreneceksin?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Gamepad girdilerini okuma</li>
                <li>Joystick değerlerini motor gücüne dönüştürme</li>
                <li>Tank drive ve arcade drive kontrol şemaları</li>
                <li>Buton kontrolü ile ek fonksiyonlar</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            TeleOp Nedir?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            TeleOp (Teleoperated), robotun sürücüler tarafından gamepad kontrolörleri ile kontrol edildiği moddur. 
            FTC maçlarında, 30 saniyelik otonom periyoddan sonra genellikle 2 dakikalık bir TeleOp periyodu gelir.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">Gamepad Yapısı</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>FTC'de iki tane gamepad kullanılır: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">gamepad1</code> ve <code className="bg-muted px-1.5 py-0.5 rounded text-xs">gamepad2</code></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Analog Stickler:</strong> left_stick_x, left_stick_y, right_stick_x, right_stick_y (-1.0 ile 1.0 arası)</li>
                <li><strong className="text-foreground">Trigger'lar:</strong> left_trigger, right_trigger (0.0 ile 1.0 arası)</li>
                <li><strong className="text-foreground">Butonlar:</strong> a, b, x, y, dpad_up, dpad_down, dpad_left, dpad_right (true/false)</li>
                <li><strong className="text-foreground">Bumper'lar:</strong> left_bumper, right_bumper (true/false)</li>
              </ul>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Tank Drive Kontrolü</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Tank drive, en basit kontrol şemasıdır. Sol joystick sol motorları, sağ joystick sağ motorları kontrol eder. 
            Gerçek tanklar gibi çalışır!
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Tank Drive", group="TeleOp")
public class TankDrive extends OpMode {
    
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
        
        // Motor yönlerini ayarla
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        telemetry.addData("Durum", "Başlatıldı");
    }

    @Override
    public void loop() {
        // Sol joystick'ten güç değerini al
        double leftPower = -gamepad1.left_stick_y;  // Y ekseni ters
        double rightPower = -gamepad1.right_stick_y;
        
        // Motorlara güç uygula
        leftFront.setPower(leftPower);
        leftRear.setPower(leftPower);
        rightFront.setPower(rightPower);
        rightRear.setPower(rightPower);
        
        // Telemetride göster
        telemetry.addData("Sol Güç", leftPower);
        telemetry.addData("Sağ Güç", rightPower);
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Neden Eksi İşareti?</h4>
                <p className="text-sm text-muted-foreground">
                  Joystick'in Y ekseni tersine çalışır: yukarı -1.0, aşağı +1.0. Robot için ileri +1.0 
                  istediğimizden, <code className="bg-muted px-1.5 py-0.5 rounded text-xs">-gamepad1.left_stick_y</code> kullanırız.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Arcade Drive Kontrolü</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Arcade drive, daha sezgisel bir kontrol şemasıdır. Sol joystick ileri/geri ve yan hareket için, 
            sağ joystick yalnızca dönüş için kullanılır.
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Arcade Drive", group="TeleOp")
public class ArcadeDrive extends OpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;

    @Override
    public void init() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
    }

    @Override
    public void loop() {
        // Gamepad değerlerini al
        double drive = -gamepad1.left_stick_y;   // İleri/geri
        double turn = gamepad1.right_stick_x;    // Dönüş
        
        // Motor güçlerini hesapla
        double leftPower = drive + turn;
        double rightPower = drive - turn;
        
        // Güçleri -1.0 ile 1.0 arasında sınırla
        leftPower = Math.max(-1.0, Math.min(1.0, leftPower));
        rightPower = Math.max(-1.0, Math.min(1.0, rightPower));
        
        // Motorlara uygula
        leftFront.setPower(leftPower);
        leftRear.setPower(leftPower);
        rightFront.setPower(rightPower);
        rightRear.setPower(rightPower);
        
        telemetry.addData("Sür", drive);
        telemetry.addData("Dön", turn);
        telemetry.addData("Sol Güç", leftPower);
        telemetry.addData("Sağ Güç", rightPower);
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Arcade Drive Matematiği</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Arcade drive'da motor güçleri şu şekilde hesaplanır:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Sol Motor:</strong> İleri + Dönüş (sağa dönmek için sol hızlanır)</li>
              <li><strong className="text-foreground">Sağ Motor:</strong> İleri - Dönüş (sağa dönmek için sağ yavaşlar)</li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Buton Kontrolü</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Butonları servo kontrolleri, intake mekanizmaları veya diğer robot fonksiyonları için kullanabilirsin.
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Buton Kontrolü", group="TeleOp")
public class ButtonControl extends OpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;
    private DcMotor intakeMotor;
    private Servo clawServo;
    
    private boolean clawOpen = false;

    @Override
    public void init() {
        // Sürüş motorları
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        // Ek mekanizmalar
        intakeMotor = hardwareMap.dcMotor.get("intake");
        clawServo = hardwareMap.servo.get("claw");
        
        // Yönleri ayarla
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
    }

    @Override
    public void loop() {
        // === SÜRÜş KONTROLÜ ===
        double drive = -gamepad1.left_stick_y;
        double turn = gamepad1.right_stick_x;
        
        double leftPower = drive + turn;
        double rightPower = drive - turn;
        
        leftFront.setPower(leftPower);
        leftRear.setPower(leftPower);
        rightFront.setPower(rightPower);
        rightRear.setPower(rightPower);
        
        // === INTAKE KONTROLÜ ===
        if (gamepad1.right_bumper) {
            intakeMotor.setPower(1.0);    // Topla
        } else if (gamepad1.left_bumper) {
            intakeMotor.setPower(-1.0);   // At
        } else {
            intakeMotor.setPower(0);      // Dur
        }
        
        // === PENÇE KONTROLÜ (toggle) ===
        if (gamepad1.a) {
            clawOpen = !clawOpen;
            if (clawOpen) {
                clawServo.setPosition(0.5);  // Aç
            } else {
                clawServo.setPosition(0.0);  // Kapat
            }
            // Buton spam'ini önle
            while (gamepad1.a) {
                // Buton bırakılana kadar bekle
            }
        }
        
        telemetry.addData("Sürüş", "%.2f", drive);
        telemetry.addData("Dönüş", "%.2f", turn);
        telemetry.addData("Intake", intakeMotor.getPower());
        telemetry.addData("Pençe", clawOpen ? "Açık" : "Kapalı");
        telemetry.update();
    }
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Hız Sınırlama (Slow Mode)</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Hassas kontroller için bir "yavaş mod" eklemek çok faydalıdır. Bu, trigger kullanarak 
            motor gücünü azaltmanı sağlar.
          </p>

          <CodeBlock
            language="java"
            code={`@Override
public void loop() {
    double drive = -gamepad1.left_stick_y;
    double turn = gamepad1.right_stick_x;
    
    // Hız çarpanını hesapla
    double speedMultiplier = 1.0;
    if (gamepad1.right_trigger > 0.1) {
        speedMultiplier = 0.3;  // Yavaş mod
    }
    
    // Güçleri hesapla ve çarpan ile çarp
    double leftPower = (drive + turn) * speedMultiplier;
    double rightPower = (drive - turn) * speedMultiplier;
    
    // Sınırla
    leftPower = Math.max(-1.0, Math.min(1.0, leftPower));
    rightPower = Math.max(-1.0, Math.min(1.0, rightPower));
    
    // Uygula
    leftFront.setPower(leftPower);
    leftRear.setPower(leftPower);
    rightFront.setPower(rightPower);
    rightRear.setPower(rightPower);
    
    telemetry.addData("Mod", speedMultiplier < 1.0 ? "YAVAŞ" : "NORMAL");
    telemetry.update();
}`}
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sırada Ne Var?</h2>
          <p className="text-foreground leading-relaxed">
            Artık TeleOp kontrolünün temellerini biliyorsun! Sırada, robotunun konumunu ve 
            hareketini daha hassas bir şekilde ölçmek için sensörleri öğren.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default TeleOp;