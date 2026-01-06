import fs from 'fs';
import path from 'path';

const files = [
  'src/lib/components/Cards/UserCard.svelte',
  'src/lib/components/Modals/ShareEventModal.svelte',
  'src/lib/components/Jobs/JobCard.svelte',
  'src/lib/components/Services/ServiceCard.svelte',
  'src/routes/[jobId=event]/+page.svelte',
  'src/routes/my-cashu-wallet/+page.svelte',
  'src/routes/[serviceId=service]/+page.svelte'
];

async function checkFiles() {
  for (const file of files) {
    if (fs.existsSync(file)) {
      const content = await fs.promises.readFile(file, 'utf8');
      console.log(`\n=== ${file} ===`);
      
      const lines = content.split('\n');
      let inScript = false;
      let scriptTagCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.includes('<script') && !line.includes('</script>')) {
          inScript = true;
          scriptTagCount++;
        }
        if (line.includes('</script>')) {
          inScript = false;
        }
        
        if (line.includes('enum ') && !inScript) {
          console.log(`❌ Line ${i + 1}: Enum outside script tag:`);
          console.log(`   "${line.trim()}"`);
          console.log(`   Script tags found so far: ${scriptTagCount}`);
        }
      }
    }
  }
}

checkFiles().catch(console.error);
