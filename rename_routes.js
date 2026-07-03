const fs = require('fs');

const replaceInFile = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace all links pointing to /student with /dashboard
  content = content.replace(/'\/student'/g, "'/dashboard'");
  content = content.replace(/'\/student\//g, "'/dashboard/");
  content = content.replace(/"\/student"/g, '"/dashboard"');
  content = content.replace(/"\/student\//g, '"/dashboard/');

  fs.writeFileSync(file, content);
};

const files = [
  'src/app/dashboard/layout.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/dashboard/tests/page.tsx',
  'src/app/dashboard/materials/page.tsx',
  'src/app/dashboard/attendance/page.tsx',
  'src/app/dashboard/fees/page.tsx',
  'src/app/dashboard/doubts/page.tsx'
];

files.forEach(replaceInFile);
