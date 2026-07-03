const fs = require('fs');

const replaceInFile = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace blue with fuchsia to match Admin branding
  content = content.replace(/blue-500/g, 'fuchsia-500');
  content = content.replace(/blue-600/g, 'fuchsia-600');
  content = content.replace(/blue-700/g, 'fuchsia-700');
  content = content.replace(/blue-50\b/g, 'fuchsia-50');
  content = content.replace(/blue-100/g, 'fuchsia-100');
  content = content.replace(/blue-200/g, 'fuchsia-200');
  content = content.replace(/blue-300/g, 'fuchsia-300');
  content = content.replace(/blue-400/g, 'fuchsia-400');
  content = content.replace(/blue-800/g, 'fuchsia-800');
  content = content.replace(/blue-900/g, 'fuchsia-900');
  
  // Apply specific padding/sizing fixes from admin
  if (file.includes('layout.tsx')) {
    content = content.replace(/px-3 py-0\.5/g, 'px-1.5 py-0.5');
    content = content.replace(/text-\[14px\]/g, 'text-[13px]');
    content = content.replace(/'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800\/50'/g, "'text-slate-900 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'");
  }

  fs.writeFileSync(file, content);
};

const files = [
  'src/app/student/layout.tsx',
  'src/app/student/page.tsx',
  'src/app/student/tests/page.tsx',
  'src/app/student/materials/page.tsx',
  'src/app/student/attendance/page.tsx',
  'src/app/student/fees/page.tsx',
  'src/app/student/doubts/page.tsx'
];

files.forEach(replaceInFile);
