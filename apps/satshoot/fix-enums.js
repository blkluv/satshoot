const fs = require('fs');
const path = require('path');

const files = [
  'src/lib/components/Cards/UserCard.svelte',
  'src/lib/components/Cards/UserCard.svelte', // Has 2 enums
  'src/lib/components/Modals/ShareEventModal.svelte',
  'src/lib/components/Jobs/JobCard.svelte',
  'src/lib/components/Services/ServiceCard.svelte',
  'src/routes/[jobId=event]/+page.svelte',
  'src/routes/my-cashu-wallet/+page.svelte',
  'src/routes/[serviceId=service]/+page.svelte'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    console.log(`\n=== ${file} ===`);
    
    // Check if enums are between script tags
    const lines = content.split('\n');
    let inScript = false;
    
    lines.forEach((line, index) => {
      if (line.includes('<script')) {
        inScript = true;
      }
      if (line.includes('</script>')) {
        inScript = false;
      }
      
      if (line.includes('enum ') && !inScript) {
        console.log(`Line ${index + 1}: Enum outside script tag: ${line.trim()}`);
      }
    });
  }
});
