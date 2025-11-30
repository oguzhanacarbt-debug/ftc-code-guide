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
          <h1 className="text-4xl font-bold text-foreground mb-4">Robot Başlatma</h1>
          <p className="text-lg text-muted-foreground">
            Robot kodunda motor, servo ve sensörleri nasıl tanımlayacağını öğren.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Neler Öğreneceksin?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>hardwareMap nedir ve nasıl kullanılır?</li>
                <li>Motor başlatma adımları</li>
                <li>Motor yönlerini ayarlama</li>
                <li>Sağdaki panelde robot başlatmayı gerçek zamanlı olarak gör!</li>
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
            robotunun fiziksel donanımına erişmek için kullanılan özel bir nesnedir. 
            Bu nesne, kodunla motor, servo ve sensörler gibi bileşenler arasında bağlantı kurar.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">hardwareMap Mantığı</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Robot Controller yapılandırmasında, her donanım parçasına bir <strong>isim</strong> verirsin 
              (örneğin, "leftFront"). Sonra kodunda, o ismi kullanarak donanıma erişirsin.
            </p>
            <div className="bg-muted/50 rounded p-3 text-xs font-mono text-muted-foreground">
              Robot Config: leftFront → Port 0<br />
              Kodda: hardwareMap.dcMotor.get("leftFront")
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Motorları Başlatma</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Bir motoru başlatmak için önce bir <code className="bg-muted px-2 py-1 rounded text-sm">DcMotor</code> 
            değişkeni oluştur, sonra <code className="bg-muted px-2 py-1 rounded text-sm">hardwareMap</code> 
            kullanarak motor nesnesini bu değişkene ata.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Örnek: Tek Motor</h3>
          <CodeBlock
            language="java"
            code={`@TeleOp(name="Motor Başlatma Örneği", group="Yeni Başlayanlar")
public class MotorBaslatmaOrnegi extends OpMode {
    
    // Motor değişkenini tanımla
    private DcMotor leftFront;

    @Override
    public void init() {
        // Motoru hardwareMap ile başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        
        // Motor yönünü ayarla
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        
        // Motoru sıfır güçle başlat
        leftFront.setPower(0);
        
        telemetry.addData("Durum", "Motor başlatıldı!");
    }

    @Override
    public void loop() {
        // Motor kontrolü buraya gelecek
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Uyarı!</h4>
                <p className="text-sm text-muted-foreground">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">hardwareMap.dcMotor.get("leftFront")</code> 
                  içindeki isim, Robot Controller config'de verdiğin isimle <strong>tamamen aynı</strong> olmalı. 
                  Aksi halde program çalışmaz!
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Dört Tekerlekli Tahrik Sistemi</h2>
          <p className="text-foreground leading-relaxed mb-4">
            FTC'de en yaygın tahrik yapılandırmalarından biri 4 motorlu sistemdir. 
            Aşağıdaki örnekte, 4 motoru başlatıyor ve yönlerini ayarlıyoruz.
          </p>

          <p className="text-sm text-muted-foreground mb-4">
            👉 Başlatılan motorları görselleştirilmiş halde görmek için <strong>sağ paneli</strong> izle!
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="Dört Tekerlekli Tahrik", group="Yeni Başlayanlar")
public class DortTekerlekliTahrik extends OpMode {
    
    // Dört motor değişkeni
    private DcMotor leftFront;
    private DcMotor rightFront;
    private DcMotor leftRear;
    private DcMotor rightRear;

    @Override
    public void init() {
        // Tüm motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        // Motor yönlerini ayarla
        // Sol taraf İLERİ, sağ taraf genellikle GERİ
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        // Tüm motorları sıfır güçle başlat
        leftFront.setPower(0);
        rightFront.setPower(0);
        leftRear.setPower(0);
        rightRear.setPower(0);
        
        telemetry.addData("Durum", "Tüm motorlar başlatıldı!");
        telemetry.update();
    }

    @Override
    public void loop() {
        // Hareket kodu buraya gelecek
        telemetry.addData("Mod", "Sürüş için hazır");
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Sağ Motorlar Neden REVERSE?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Robotun karşı taraflarındaki motorlar ters yönde monte edilmiştir. Hepsi aynı yönde 
              dönseydi, robot düz gitmek yerine dönüş yapardı. Kodda bir tarafı tersine çevirerek, 
              tüm motorlar "ileri" komutu aldığında robotun düz gitmesini sağlarız.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sırada Ne Var?</h2>
          <p className="text-foreground leading-relaxed">
            Artık motorları nasıl başlatacağını öğrendin! Bir sonraki adımda, 
            bu motorları joystick ile nasıl kontrol edeceğini ve temel hareket sistemlerini keşfedeceksin.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default RobotInit;