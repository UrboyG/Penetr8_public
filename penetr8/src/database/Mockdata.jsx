//Use in Easy-to-fix table, delete when backend is established
export const vulnerabilityData = () => {
  return [
    {
      Order: 1,
      Vulnerability: "SQL Injection",
      CWE: "CWE-89",
      Score: 9.8,
      Severity: "Critical",
      Description:
        "SQL Injection vulnerability allowing an attacker to manipulate database queries.",
      Solution: "Use parameterized queries and ORM to prevent SQL Injection.",
    },
    {
      Order: 2,
      Vulnerability: "Broken Authentication",
      CWE: "CWE-287",
      Score: 9.0,
      Severity: "Critical",
      Description:
        "Broken authentication mechanism that allows unauthorized access to user accounts.",
      Solution:
        "Implement multi-factor authentication and strong password policies.",
    },
    {
      Order: 3,
      Vulnerability: "Insecure Deserialization",
      CWE: "CWE-502",
      Score: 8.6,
      Severity: "High",
      Description:
        "Insecure deserialization that may lead to remote code execution or privilege escalation.",
      Solution:
        "Avoid deserialization of untrusted data and implement integrity checks.",
    },
    {
      Order: 4,
      Vulnerability: "Cross-Site Scripting (XSS)",
      CWE: "CWE-79",
      Score: 7.5,
      Severity: "High",
      Description:
        "XSS vulnerability that allows attackers to inject malicious scripts into webpages viewed by others.",
      Solution: "Sanitize user input and use Content Security Policy (CSP).",
    },
    {
      Order: 5,
      Vulnerability: "Sensitive Data Exposure",
      CWE: "CWE-200",
      Score: 7.3,
      Severity: "Medium",
      Description:
        "Sensitive data exposure due to improper encryption or poor access control.",
      Solution: "Encrypt sensitive data in transit and at rest.",
    },
  ];
};

export const mockEasytofixVulnerabilityData = () => {
  return [
    {
      Order: 1,
      Vulnerability: "SQL Injection",
      EasyToFix: "Easy",
      Solution: "Use parameterized queries and ORM to prevent SQL Injection.",
    },
    {
      Order: 2,
      Vulnerability: "Cross-Site Scripting (XSS)",
      EasyToFix: "Easy",
      Solution:
        "Sanitize user input and implement Content Security Policy (CSP).",
    },
    {
      Order: 3,
      Vulnerability: "Insecure Deserialization",
      EasyToFix: "Medium",
      Solution:
        "Avoid deserialization of untrusted data and implement integrity checks.",
    },
    {
      Order: 4,
      Vulnerability: "Broken Authentication",
      EasyToFix: "Hard",
      Solution:
        "Implement multi-factor authentication and strong password policies.",
    },
    {
      Order: 5,
      Vulnerability: "Sensitive Data Exposure",
      EasyToFix: "Hard",
      Solution: "Encrypt sensitive data in transit and at rest.",
    },
  ];
};

export const mockUnreferencedVulnerabilityData = () => {
  return [
    {
      Order: 1,
      Vulnerability: "SQL Injection",
      Description:
        "SQL Injection vulnerability allows an attacker to manipulate SQL queries in a way that can access, modify, or delete data in the database.",
      Solution:
        "Use parameterized queries and an ORM to prevent SQL Injection.",
    },
    {
      Order: 2,
      Vulnerability: "Cross-Site Scripting (XSS)",
      Description:
        "XSS allows attackers to inject malicious scripts into web pages viewed by other users, potentially stealing sensitive information.",
      Solution:
        "Sanitize user input and implement Content Security Policy (CSP).",
    },
    {
      Order: 3,
      Vulnerability: "Insecure Deserialization",
      Description:
        "Insecure deserialization may allow attackers to execute arbitrary code or escalate privileges within the application.",
      Solution: "Avoid deserializing untrusted data and use integrity checks.",
    },
    {
      Order: 4,
      Vulnerability: "Broken Authentication",
      Description:
        "Broken authentication mechanisms may allow attackers to gain unauthorized access to user accounts.",
      Solution:
        "Implement multi-factor authentication and enforce strong password policies.",
    },
    {
      Order: 5,
      Vulnerability: "Sensitive Data Exposure",
      Description:
        "Sensitive data exposure occurs when sensitive information is not adequately protected, potentially exposing it to unauthorized users.",
      Solution:
        "Encrypt sensitive data in transit and at rest, and use secure access controls.",
    },
  ];
};

export const mockPenetrationReports = () => {
  return [
    {
      Timestamp: "2024-10-01T14:30:00Z",
      ReportName: "SQL Injection Assessment",
      PenetrationPoint: "20",
      Severity: "Critical",
      ProgrammingLanguage: "SQL",
    },
    {
      Timestamp: "2024-10-02T09:15:00Z",
      ReportName: "Cross-Site Scripting Audit",
      PenetrationPoint: "3",
      Severity: "High",
      ProgrammingLanguage: "JavaScript",
    },
    {
      Timestamp: "2024-10-03T16:45:00Z",
      ReportName: "API Security Review",
      PenetrationPoint: "27",
      Severity: "Medium",
      ProgrammingLanguage: "Python",
    },
    {
      Timestamp: "2024-10-04T11:20:00Z",
      ReportName: "Session Management Evaluation",
      PenetrationPoint: "8",
      Severity: "Critical",
      ProgrammingLanguage: "Java",
    },
    {
      Timestamp: "2024-10-05T08:50:00Z",
      ReportName: "Data Exposure Check",
      PenetrationPoint: "2",
      Severity: "High",
      ProgrammingLanguage: "PHP",
    },
    {
      Timestamp: "2024-10-06T12:00:00Z",
      ReportName: "Denial of Service Testing",
      PenetrationPoint: "9",
      Severity: "Medium",
      ProgrammingLanguage: "C#",
    },
  ];
};

export default mockPenetrationReports;

// Mockdata.jsx
export const KeyFeatures = () => {
  return [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-shield-checkered"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11.013 12v9.754a13 13 0 0 1 -8.733 -9.754h8.734zm9.284 3.794a13 13 0 0 1 -7.283 5.951l-.001 -9.745h8.708a12.96 12.96 0 0 1 -1.424 3.794zm-9.283 -13.268l-.001 7.474h-8.986c-.068 -1.432 .101 -2.88 .514 -4.282a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.192 -2.256l.276 -.219zm1.999 7.474v-7.453l-.09 -.073a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717c.413 1.403 .582 2.85 .514 4.282h-8.96z" />
        </svg>
      ),
      title: "Static Source Code Analysis",
      description:
        "Upload your source code (ZIP or GitHub URL) and get an in-depth vulnerability assessment.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
        </svg>
      ),
      title: "Severity-Based Insights",
      description:
        "View vulnerabilities ranked by severity to prioritize your fixes.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-seeding"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" />
        </svg>
      ),
      title: "Actionable Suggestions",
      description:
        "Receive tailored recommendations to resolve issues quickly and efficiently.",
    },
  ];
};

export const HowItWorks = () => {
  return [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-shield-checkered"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11.013 12v9.754a13 13 0 0 1 -8.733 -9.754h8.734zm9.284 3.794a13 13 0 0 1 -7.283 5.951l-.001 -9.745h8.708a12.96 12.96 0 0 1 -1.424 3.794zm-9.283 -13.268l-.001 7.474h-8.986c-.068 -1.432 .101 -2.88 .514 -4.282a1 1 0 0 1 1.005 -.717a11 11 0 0 0 7.192 -2.256l.276 -.219zm1.999 7.474v-7.453l-.09 -.073a11 11 0 0 0 7.189 2.537l.342 -.01a1 1 0 0 1 1.005 .717c.413 1.403 .582 2.85 .514 4.282h-8.96z" />
        </svg>
      ),
      title: "Step 1",
      description: "Upload your source code (ZIP or GitHub URL).",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
        </svg>
      ),
      title: "Step 2",
      description:
        "Our system scans for vulnerabilities using advanced algorithms.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-seeding"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 3a7 7 0 0 1 6.95 6.155a6.97 6.97 0 0 1 5.05 -2.155h3a1 1 0 0 1 1 1v1a7 7 0 0 1 -7 7h-2v4a1 1 0 0 1 -2 0v-7h-2a7 7 0 0 1 -7 -7v-2a1 1 0 0 1 1 -1z" />
        </svg>
      ),
      title: "Step 3",
      description:
        "View results with severity scores, difficulty levels, and recommendations.",
    },
  ];
};
