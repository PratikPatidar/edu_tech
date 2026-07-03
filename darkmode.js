const fs = require('fs');

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Slate background & border replacements
  content = content.replace(/bg-white/g, 'bg-white dark:bg-slate-900');
  content = content.replace(/bg-\[#f8fafc\]/g, 'bg-[#f8fafc] dark:bg-slate-950');
  content = content.replace(/border-slate-200/g, 'border-slate-200 dark:border-slate-800');
  content = content.replace(/border-slate-100/g, 'border-slate-100 dark:border-slate-800/50');
  content = content.replace(/bg-slate-50\b/g, 'bg-slate-50 dark:bg-slate-800/50');
  content = content.replace(/bg-slate-100/g, 'bg-slate-100 dark:bg-slate-800');
  content = content.replace(/bg-slate-200/g, 'bg-slate-200 dark:bg-slate-700');
  content = content.replace(/bg-slate-300/g, 'bg-slate-300 dark:bg-slate-700');
  
  // Slate text replacements
  content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
  content = content.replace(/text-slate-800/g, 'text-slate-800 dark:text-slate-200');
  content = content.replace(/text-slate-700/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/text-slate-600/g, 'text-slate-600 dark:text-slate-400');
  content = content.replace(/text-slate-500/g, 'text-slate-500 dark:text-slate-400');
  content = content.replace(/text-slate-400/g, 'text-slate-400 dark:text-slate-500');

  // Hover states
  content = content.replace(/hover:bg-slate-50/g, 'hover:bg-slate-50 dark:hover:bg-slate-800/50');
  content = content.replace(/hover:bg-slate-100/g, 'hover:bg-slate-100 dark:hover:bg-slate-800');
  
  // Fuchsia (Brand Color) Dark Overrides
  content = content.replace(/bg-fuchsia-50\b/g, 'bg-fuchsia-50 dark:bg-fuchsia-900/30');
  content = content.replace(/bg-fuchsia-100/g, 'bg-fuchsia-100 dark:bg-fuchsia-900/50');
  content = content.replace(/text-fuchsia-700/g, 'text-fuchsia-700 dark:text-fuchsia-400');
  content = content.replace(/text-fuchsia-600/g, 'text-fuchsia-600 dark:text-fuchsia-400');
  content = content.replace(/border-fuchsia-200/g, 'border-fuchsia-200 dark:border-fuchsia-800/50');

  // Utility cards dark mode
  content = content.replace(/bg-green-50\b/g, 'bg-green-50 dark:bg-green-900/30');
  content = content.replace(/text-green-600/g, 'text-green-600 dark:text-green-400');
  content = content.replace(/bg-red-50\b/g, 'bg-red-50 dark:bg-red-900/30');
  content = content.replace(/text-red-600/g, 'text-red-600 dark:text-red-400');
  content = content.replace(/text-red-500/g, 'text-red-500 dark:text-red-400');
  content = content.replace(/bg-red-50\/50/g, 'bg-red-50/50 dark:bg-red-900/20');
  content = content.replace(/border-red-100/g, 'border-red-100 dark:border-red-900/50');
  
  content = content.replace(/bg-orange-50\b/g, 'bg-orange-50 dark:bg-orange-900/30');
  content = content.replace(/bg-orange-100\b/g, 'bg-orange-100 dark:bg-orange-900/50');
  content = content.replace(/text-orange-600/g, 'text-orange-600 dark:text-orange-400');
  
  content = content.replace(/bg-blue-50\b/g, 'bg-blue-50 dark:bg-blue-900/30');
  content = content.replace(/bg-blue-100\b/g, 'bg-blue-100 dark:bg-blue-900/50');
  content = content.replace(/text-blue-600/g, 'text-blue-600 dark:text-blue-400');
  content = content.replace(/text-blue-700/g, 'text-blue-700 dark:text-blue-400');
  
  fs.writeFileSync(file, content);
};

replaceInFile('src/app/admin/layout.tsx');
replaceInFile('src/app/admin/page.tsx');
replaceInFile('src/app/admin/settings/page.tsx');
replaceInFile('src/app/admin/students/page.tsx');
replaceInFile('src/app/admin/tests/page.tsx');
replaceInFile('src/app/admin/omr/page.tsx');
replaceInFile('src/app/admin/materials/page.tsx');
replaceInFile('src/app/admin/attendance/page.tsx');
