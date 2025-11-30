import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { Zap, Play, AlertTriangle } from "lucide-react";

const Autonomous = () => {
  const hardware = [
    { name: "leftFront", type: "motor" as const, position: { x: 60, y: 60 } },
    { name: "rightFront", type: "motor" as const, position: { x: 140, y: 60 } },
    { name: "leftRear", type: "motor" as const, position: { x: 60, y: 140 } },
    { name: "rightRear", type: "motor" as const, position: { x: 140, y: 140 } },
  ];

  const movementSequence = [
    { type: "forward" as const, duration: 2000, power: 0.5 },
    { type: "rotate-right" as const, duration: 1000, power: 0.3 },
    { type: "forward" as const, duration: 1500, power: 0.5 },
    { type: "stop" as const, duration: 500 },
  ];

  return (
    <DocsLayout 
      robotHardware={hardware}
      movementSequence={movementSequence}
      codeDescription="Otonom rutin: İleri git, sağa dön, tekrar ileri git"
    >
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Otonom Mod</h1>
          <p className="text-lg text-muted-foreground">
            Sürücü girişi olmadan çalışan otonom rutinler oluşturmayı öğren.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <Play className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Neler Öğreneceksin?</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Otonom mod nedir?</li>
                <li>Zamanlı hareketler oluşturma</li>
                <li>Hareket dizileri oluşturma</li>
                <li>Kodunun sağ panelde gerçek zamanlı çalıştığını gör!</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-8 h-8 text-primary" />
            Otonom Nedir?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            Otonom mod, maçın başında robotun tamamen kendi başına, hiçbir sürücü kontrolü olmadan 
            önceden programlanmış talimatları takip ederek çalıştığı dönemdir. 
            FTC maçlarında bu genellikle 30 saniye sürer.
          </p>

          <Card className="p-5 bg-card border-border mb-6">
            <h4 className="font-semibold text-foreground mb-3">Otonom vs TeleOp</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong className="text-foreground">Otonom (@Autonomous):</strong> Robot 
                önceden programlanmış hareketleri sürücü girişi olmadan çalıştırır
              </p>
              <p>
                <strong className="text-foreground">TeleOp (@TeleOp):</strong> Sürücü 
                robotu gamepad girdileriyle kontrol eder
              </p>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Temel Otonom Program</h2>
          <p className="text-foreground leading-relaxed mb-4">
            En basit otonom program zamanlı hareketler kullanır. Robot belirli süreler boyunca 
            eylemler gerçekleştirir, sonra bir sonraki eyleme geçer.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Örnek: İleri Git ve Dön</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Bu kodun çalışmasını izlemek için sağ panelde <strong>Çalıştır</strong>'a tıkla!
          </p>

          <CodeBlock
            language="java"
            code={`@Autonomous(name="Basit Otonom", group="Yeni Başlayanlar")
public class BasitOtonom extends LinearOpMode {
    
    private DcMotor leftFront;
    private DcMotor rightFront;
    private DcMotor leftRear;
    private DcMotor rightRear;

    @Override
    public void runOpMode() {
        // Motorları başlat
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        // Yönleri ayarla
        leftFront.setDirection(DcMotor.Direction.FORWARD);
        leftRear.setDirection(DcMotor.Direction.FORWARD);
        rightFront.setDirection(DcMotor.Direction.REVERSE);
        rightRear.setDirection(DcMotor.Direction.REVERSE);
        
        telemetry.addData("Durum", "Çalışmaya hazır");
        telemetry.update();
        
        // Start butonunu bekle
        waitForStart();
        
        // === OTONOM RUTİN BURADA BAŞLAR ===
        
        // 2 saniye ileri git
        leftFront.setPower(0.5);
        rightFront.setPower(0.5);
        leftRear.setPower(0.5);
        rightRear.setPower(0.5);
        sleep(2000);  // 2 saniye bekle
        
        // 1 saniye sağa dön
        leftFront.setPower(0.3);
        rightFront.setPower(-0.3);
        leftRear.setPower(0.3);
        rightRear.setPower(-0.3);
        sleep(1000);  // 1 saniye bekle
        
        // Tekrar 1.5 saniye ileri git
        leftFront.setPower(0.5);
        rightFront.setPower(0.5);
        leftRear.setPower(0.5);
        rightRear.setPower(0.5);
        sleep(1500);
        
        // Tüm motorları durdur
        leftFront.setPower(0);
        rightFront.setPower(0);
        leftRear.setPower(0);
        rightRear.setPower(0);
        
        telemetry.addData("Durum", "Otonom Tamamlandı!");
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-5 bg-muted/30 border-border">
            <h4 className="font-semibold text-foreground mb-3">Kodu Anlamak</h4>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@Autonomous</code> - 
                Bunu bir otonom program olarak işaretler
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">LinearOpMode</code> - 
                sleep() ile adım adım programlamaya izin verir
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">waitForStart()</code> - 
                Start butonuna basılana kadar bekler
              </li>
              <li>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">sleep(milisaniye)</code> - 
                Kod yürütmesini belirli bir süre duraklatır
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Hareket Fonksiyonları Oluşturma</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Aynı motor komutlarını tekrarlamak yerine, kodumuzu daha temiz ve okunabilir hale 
            getirmek için yardımcı fonksiyonlar oluşturabiliriz.
          </p>

          <CodeBlock
            language="java"
            code={`@Autonomous(name="Fonksiyon Otonom", group="Yeni Başlayanlar")
public class FonksiyonOtonom extends LinearOpMode {
    
    private DcMotor leftFront, rightFront, leftRear, rightRear;

    // İleri gitmek için yardımcı fonksiyon
    private void ileriGit(double guc, int sure) {
        leftFront.setPower(guc);
        rightFront.setPower(guc);
        leftRear.setPower(guc);
        rightRear.setPower(guc);
        sleep(sure);
    }
    
    // Sağa dönmek için yardımcı fonksiyon
    private void sagaDon(double guc, int sure) {
        leftFront.setPower(guc);
        rightFront.setPower(-guc);
        leftRear.setPower(guc);
        rightRear.setPower(-guc);
        sleep(sure);
    }
    
    // Durdurmak için yardımcı fonksiyon
    private void robotuDurdur() {
        leftFront.setPower(0);
        rightFront.setPower(0);
        leftRear.setPower(0);
        rightRear.setPower(0);
    }

    @Override
    public void runOpMode() {
        // Donanımı başlat...
        leftFront = hardwareMap.dcMotor.get("leftFront");
        rightFront = hardwareMap.dcMotor.get("rightFront");
        leftRear = hardwareMap.dcMotor.get("leftRear");
        rightRear = hardwareMap.dcMotor.get("rightRear");
        
        waitForStart();
        
        // Artık otonomumuz çok daha temiz!
        ileriGit(0.5, 2000);
        sagaDon(0.3, 1000);
        ileriGit(0.5, 1500);
        robotuDurdur();
    }
}`}
          />
        </section>

        <section className="mb-12">
          <Card className="p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Önemli Not</h4>
                <p className="text-sm text-muted-foreground">
                  Zamanlı hareketler basit otonom rutinler için işe yarar, ancak çok 
                  hassas değildir. Daha kesin hareketler için, Sensörler bölümünde 
                  öğreneceğimiz encoder ve odometry hakkında bilgi edinmek isteyeceksin.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sırada Ne Var?</h2>
          <p className="text-foreground leading-relaxed">
            Artık temel otonom programlamayı anlıyorsun! Sırada, farklı 
            hareket sistemleri ve robotunu sensörler ve encoder'lar ile 
            daha hassas bir şekilde nasıl hareket ettireceğini öğren.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default Autonomous;