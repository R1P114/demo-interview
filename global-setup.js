import fs from 'fs';

export default async function globalSetup() {
  const resultsDir = './allure-results';
  const reportDir = './allure-report';

  if (fs.existsSync(resultsDir)) {
    fs.rmSync(resultsDir, { recursive: true, force: true });
  }
  if (fs.existsSync(reportDir)) {
    fs.rmSync(reportDir, { recursive: true, force: true });
  }

  console.log("✅ Allure folders cleaned before tests run!");
}
