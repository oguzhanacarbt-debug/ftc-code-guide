import { NavLink } from "@/components/NavLink";
import { Book, Zap, Settings, Code2, Compass, Database, Lightbulb, HelpCircle } from "lucide-react";

const navigation = [
  {
    title: "Başlangıç",
    icon: Zap,
    items: [
      { title: "Ana Sayfa", href: "/" },
      { title: "FTC'ye Giriş", href: "/getting-started" },
    ],
  },
  {
    title: "Temel Programlama",
    icon: Code2,
    items: [
      { title: "Değişkenler & Fonksiyonlar", href: "/basics" },
      { title: "OpMode Yapısı", href: "/opmode" },
    ],
  },
  {
    title: "Robot Kurulumu",
    icon: Settings,
    items: [
      { title: "Hardware Initialization", href: "/robot-init" },
      { title: "Motor & Servo", href: "/motors" },
    ],
  },
  {
    title: "Hareket Sistemleri",
    icon: Compass,
    items: [
      { title: "Tank Drive", href: "/tank-drive" },
      { title: "Mecanum Drive", href: "/mecanum-drive" },
    ],
  },
  {
    title: "Sensörler",
    icon: Database,
    items: [
      { title: "IMU", href: "/sensors-imu" },
      { title: "Encoders", href: "/sensors-encoders" },
    ],
  },
  {
    title: "Örnek Kodlar",
    icon: Lightbulb,
    items: [
      { title: "Basit TeleOp", href: "/examples-teleop" },
      { title: "Autonomous", href: "/examples-auto" },
    ],
  },
  {
    title: "Yardım",
    icon: HelpCircle,
    items: [
      { title: "SSS", href: "/faq" },
    ],
  },
];

export const DocsSidebar = () => {
  return (
    <aside className="w-64 border-r border-border bg-sidebar h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Book className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">FTC Docs</h1>
        </div>

        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-muted-foreground">
                <section.icon className="w-4 h-4" />
                <span>{section.title}</span>
              </div>
              <ul className="space-y-1 ml-6">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NavLink
                      to={item.href}
                      className="block py-1.5 px-3 text-sm text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent rounded-md transition-colors"
                      activeClassName="text-primary bg-sidebar-accent font-medium"
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};
