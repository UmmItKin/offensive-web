import { useState } from "react";
import { AppLayout } from "./AppLayout";
import { ReverseShellGenerator } from "./ReverseShellGenerator";
import { UrlParameterInjection } from "./UrlParameterInjection";
import { Footer } from "./Footer";

export function App() {
  const [currentSection, setCurrentSection] = useState("reverse-shell");

  const renderSection = () => {
    switch (currentSection) {
      case "reverse-shell":
        return <ReverseShellGenerator />;
      case "url-injection":
        return <UrlParameterInjection />;
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
                {currentSection === "reverse-shell" ? "Reverse Shell Generator" : "URL Parameter Injection"}
              </h1>
              <p className="text-muted-foreground">Security tools and utilities</p>
            </div>
            {renderSection()}
          </div>
        </div>
      </AppLayout>
      <Footer />
    </div>
  );
}
