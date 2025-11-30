import { useState } from "react";
import { AppLayout } from "./AppLayout";
import { ReverseShellGenerator } from "./ReverseShellGenerator";
import { UrlParameterInjection } from "./UrlParameterInjection";
import { Base64Tool } from "./Base64Tool";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";

const sectionTitles: Record<string, string> = {
  "reverse-shell": "Reverse Shell Generator",
  "url-injection": "URL Parameter Injection",
  "base64": "Base64 Encoder/Decoder",
};

export function App() {
  const [currentSection, setCurrentSection] = useState("reverse-shell");

  const renderSection = () => {
    switch (currentSection) {
      case "reverse-shell":
        return <ReverseShellGenerator />;
      case "url-injection":
        return <UrlParameterInjection />;
      case "base64":
        return <Base64Tool />;
      default:
        return <ReverseShellGenerator />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppLayout currentSection={currentSection} onSectionChange={setCurrentSection}>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">
                {sectionTitles[currentSection] || "Offensive Web"}
              </h1>
              <p className="text-muted-foreground">Security tools and utilities</p>
            </div>
            {renderSection()}
          </div>
        </div>
      </AppLayout>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
