import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book, Code2, Zap, ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">FTC Rookie Developer Guide</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Learn FTC Robot
              <br />
              <span className="text-primary">Programming from Scratch</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive guide designed to teach FIRST Tech Challenge robot programming 
              step-by-step with visual support and interactive examples.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/getting-started">
                <Button size="lg" className="gap-2 text-base">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/robot-init">
                <Button size="lg" variant="outline" className="gap-2 text-base">
                  <Code2 className="w-4 h-4" />
                  Example Code
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Why This Guide?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow border-border bg-card">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Step-by-Step Learning
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Everything from basic programming concepts to advanced robot control, 
              explained in rookie-friendly language.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-border bg-card">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Copy-Paste Code Examples
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              All code examples feature syntax highlighting and one-click copy functionality.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-border bg-card">
            <div className="w-12 h-12 bg-robot-highlight/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-robot-highlight" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Interactive Robot Preview
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              See motors and sensors you initialize in code visualized in real-time on the robot diagram.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5 border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Begin learning FTC robot programming now. Everything you need 
            to write your first code is right here.
          </p>
          <Link to="/getting-started">
            <Button size="lg" className="gap-2">
              <Book className="w-5 h-5" />
              Go to Documentation
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
};

export default Index;
