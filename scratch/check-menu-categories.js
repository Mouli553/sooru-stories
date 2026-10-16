const fs = require('fs');
const content = fs.readFileSync('lib/menu.ts', 'utf8');
const items = [];
const blocks = content.split('{\n    id:');
for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const id = block.match(/id:\s*"([^"]+)"/)?.[1] || block.match(/"([^"]+)"/)?.[1];
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const name = block.match(/name:\s*"([^"]+)"/)?.[1];
  const category = block.match(/category:\s*"([^"]+)"/)?.[1];
  if (name && category) {
    items.push({ id, slug, name, category });
  }
}
const byCat = {};
items.forEach(it => {
  if (!byCat[it.category]) byCat[it.category] = [];
  byCat[it.category].push(it);
});
for (const [cat, list] of Object.entries(byCat)) {
  console.log(`=== ${cat} (${list.length} dishes) ===`);
  console.log(list.map(l => l.name).join(', '));
}
