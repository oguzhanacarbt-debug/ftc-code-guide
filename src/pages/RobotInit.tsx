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
            Robotundaki motorları, servoları ve sensörleri kodda nasıl tanımlayacağını öğren.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Bu Bölümde Öğreneceklerin</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>hardwareMap nedir ve nasıl kullanılır?</li>
                <li>Motor initialization adımları</li>
                <li>Motor yönlerini ayarlama</li>
                <li>Sağ panelde robotun initialize edilmesini gerçek zamanlı göreceksin!</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            hardwareMap Nedir?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            <code className="bg-muted px-2 py-1 rounded text-sm">hardwareMap</code>, FTC SDK'da 
            robotun fiziksel donanımlarına erişmek için kullanılan özel bir objedir. 
            Bu obje sayesinde kod ile motor, servo, sensör gibi bileşenler arasında bağlantı kurarsın.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">hardwareMap Mantığı</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Robot Controller yapılandırmasında her donanıma bir <strong>isim</strong> veriyorsun 
              (örneğin "leftFront"). Sonra kodda bu ismi kullanarak o donanıma erişiyorsun.
            </p>
            <div className="bg-muted/50 rounded p-3 text-xs font-mono text-muted-foreground">
              Robot Config: leftFront → Port 0<br />
              Kodda: hardwareMap.dcMotor.get("leftFront")
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Motor Initialize Etme</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Bir motoru initialize etmek için önce bir <code className="bg-muted px-2 py-1 rounded text-sm">DcMotor</code> 
            değişkeni oluşturuyorsun, sonra <code className="bg-muted px-2 py-1 rounded text-sm">hardwareMap</code> 
            üzerinden bu değişkene motor objesini atıyorsun.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Örnek: Tek Motor</h3>
          <CodeBlock
            language="java"
            code={`@TeleOp(name="Motor Init Example", group="Rookie")
public class MotorInitExample extends OpMode {
    
    // Motor değişkenini tanımla
    private DcMotor leftFront;

    @Override
    public void init() {
        // hardwareMap ile motoru initialize et
        leftFront = hardwareMap.dcMotor.get("leftFront");
        
        // Motor yönünü ayarla
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        
        // Motor başlangıçta durgun olsun
        leftFront.setPower(0);
        
        telemetry.addData("Status", "Motor initialized!");
    }

    @Override
    public void loop() {
        // Motor kontrolü burada yapılacak
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Dikkat!</h4>
                <p className="text-sm text-muted-foreground">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">hardwareMap.dcMotor.get("leftFront")</code> 
                  içindeki isim, Robot Controller config'inde verdiğin isimle <strong>tamamen aynı</strong> olmalı. 
                  Aksi halde program çalışmaz!
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Dört Tekerlekli Drivetrain</h2>
          <p className="text-foreground leading-relaxed mb-4">
            FTC'de en yaygın kullanılan drivetrain yapılarından biri 4 motorlu sistemdir. 
            Aşağıdaki örnekte 4 motoru initialize edip yönlerini ayarlıyoruz.
          </p>

          <p className="text-sm text-muted-foreground mb-4">
            👉 <strong>Sağ panelde</strong> initialize edilen motorları görsel olarak takip edebilirsin!
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Four Wheel Drive", group="Rookie")
public class FourWheelDrive extends OpMode {
    
    // Dört motor değişkeni
    private DcMotor leftFront;
    private DcMotor rightFront;
    private DcMotor leftRear;
    private DcMotor rightRear;

    @Override
    public void init() {
        // Tüm motorları initialize et
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        // Motorların yönlerini ayarla
        // Sol taraf FORWARD, sağ taraf genellikle REVERSE olur
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        // Tüm motorlar durgun başlasın
        leftFront.setPower(0);
        rightFront.setPower(0);
        leftRear.setPower(0);
        rightRear.setPower(0);
        
        telemetry.addData("Status", "All motors initialized!");
        telemetry.update();
    }

    @Override
    public void loop() {
        // Hareket kodları buraya gelecek
        telemetry.addData("Mode", "Ready to drive");
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Neden Sağ Motorlar REVERSE?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Robotun iki tarafındaki motorlar birbirine zıt yönde monte edilir. Eğer hepsi aynı yöne 
              dönseydi, robot düz gitmek yerine dönerdi. Bu yüzden kodda bir tarafı tersine çevirerek 
              tüm motorların "forward" komutunda robotun düz gitmesini sağlıyoruz.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sırada Ne Var?</h2>
          <p className="text-foreground leading-relaxed">
            Artık motorları nasıl initialize edeceğini öğrendin! Bir sonraki adımda, bu motorları 
            joystick ile kontrol etmeyi ve temel hareket sistemlerini öğreneceksin.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default RobotInit;
