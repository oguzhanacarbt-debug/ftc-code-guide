import { DocsLayout } from "@/components/DocsLayout";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { AlertCircle, BookOpen, Cpu } from "lucide-react";

const GettingStarted = () => {
  return (
    <DocsLayout>
      <article className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">FTC'ye Giriş</h1>
          <p className="text-lg text-muted-foreground">
            FIRST Tech Challenge robot programlamaya başlamadan önce bilmen gereken temel kavramlar.
          </p>
        </div>

        <Card className="p-6 mb-8 border-l-4 border-l-primary bg-primary/5">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Bu Bölümde Öğreneceklerin</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>FTC nedir ve nasıl çalışır?</li>
                <li>SDK (Software Development Kit) kavramı</li>
                <li>OpMode nedir ve türleri</li>
                <li>Robot Controller ve Driver Station</li>
              </ul>
            </div>
          </div>
        </Card>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Cpu className="w-8 h-8 text-primary" />
            FTC Nedir?
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            FIRST Tech Challenge (FTC), lise düzeyindeki öğrencilerin robot tasarlayıp programladığı 
            uluslararası bir robotik yarışmasıdır. Her takım, belirli görevleri yerine getiren bir 
            robot inşa eder ve programlar.
          </p>

          <Card className="p-5 bg-muted/50 border-border">
            <h4 className="font-semibold text-foreground mb-2">FTC Robot Anatomisi</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Robot Controller:</strong> Robotu kontrol eden Android telefon</li>
              <li><strong className="text-foreground">Driver Station:</strong> Sürücülerin kullandığı kontrol telefonu</li>
              <li><strong className="text-foreground">Control Hub/Expansion Hub:</strong> Motorlar ve sensörlerin bağlandığı elektronik beyin</li>
              <li><strong className="text-foreground">Motors & Servos:</strong> Hareket sağlayan aktuatörler</li>
              <li><strong className="text-foreground">Sensors:</strong> Robot çevresini algılayan bileşenler (IMU, encoder, distance sensor...)</li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">SDK (Software Development Kit)</h2>
          <p className="text-foreground leading-relaxed mb-4">
            FTC robot programlamak için <strong>FTC Robot Controller SDK</strong> kullanılır. 
            Bu SDK, Java tabanlıdır ve Android Studio üzerinde çalışır.
          </p>

          <div className="bg-card border border-border rounded-lg p-5 mb-4">
            <h4 className="font-semibold text-foreground mb-3">SDK İçeriği</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <strong className="text-foreground">OpMode Framework:</strong>
                  <span className="text-muted-foreground"> Robot programlarının yapısını oluşturan temel sınıflar</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <strong className="text-foreground">Hardware Classes:</strong>
                  <span className="text-muted-foreground"> Motor, servo, sensör gibi donanımları kontrol eden sınıflar</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <strong className="text-foreground">Telemetry:</strong>
                  <span className="text-muted-foreground"> Driver Station'a veri göndermek için kullanılan sistem</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">OpMode Nedir?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            <strong>OpMode</strong>, FTC'de yazdığın her robot programının temel yapı taşıdır. 
            Bir OpMode, robotun belirli bir görevi nasıl yapacağını tanımlar.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">OpMode Türleri</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-5 border-border">
              <h4 className="font-semibold text-foreground mb-2">TeleOp (Teleoperated)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Sürücü kontrolündeki mod. Joystick ve butonlarla robot kontrol edilir.
              </p>
              <div className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 inline-block">
                Örnek: Driver Period
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h4 className="font-semibold text-foreground mb-2">Autonomous</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Robotun kendi kendine çalıştığı mod. Önceden yazılmış komutlar sırayla çalışır.
              </p>
              <div className="text-xs text-muted-foreground bg-muted rounded px-2 py-1 inline-block">
                Örnek: 30 saniyelik otonom periyot
              </div>
            </Card>
          </div>

          <h3 className="text-xl font-semibold text-foreground mb-3">Basit Bir OpMode Örneği</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Aşağıda temel bir TeleOp OpMode yapısı görebilirsin:
          </p>

          <CodeBlock
            language="java"
            code={`@TeleOp(name="İlk TeleOp", group="Rookie")
public class FirstTeleOp extends OpMode {
    
    // Bu fonksiyon OpMode başlatıldığında bir kez çalışır
    @Override
    public void init() {
        telemetry.addData("Status", "Initialized");
    }

    // Bu fonksiyon START butonuna basıldıktan sonra sürekli çalışır
    @Override
    public void loop() {
        telemetry.addData("Status", "Running");
        telemetry.update();
    }
}`}
          />

          <Card className="mt-6 p-4 border-l-4 border-l-accent bg-accent/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Önemli Not</h4>
                <p className="text-sm text-muted-foreground">
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@TeleOp</code> annotation'ı, 
                  bu OpMode'un Driver Station'da "TeleOp" kategorisinde görünmesini sağlar. 
                  Autonomous için <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@Autonomous</code> kullanılır.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Sırada Ne Var?</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Artık FTC'nin temel kavramlarını öğrendin! Bir sonraki adımda, robotunu initialize 
            etmeyi ve ilk motorunu kontrol etmeyi öğreneceksin.
          </p>
        </section>
      </article>
    </DocsLayout>
  );
};

export default GettingStarted;
