// Public press dossiers, kept outside public/: downloading grants no photo licence.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const documents = require('../press/downloads.json');

async function main() {
  const directory = path.resolve(__dirname, '../press/dossiers');
  await fs.mkdir(directory, { recursive: true });
  const results = [];
  for (const doc of documents) {
    try {
      const response = await fetch(doc.url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = Buffer.from(await response.arrayBuffer());
      if (data.subarray(0, 5).toString() !== '%PDF-') throw new Error('Le serveur ne renvoie pas un PDF');
      await fs.writeFile(path.join(directory, doc.filename), data);
      results.push({ ...doc, status: 'downloaded', bytes: data.length, sha256: crypto.createHash('sha256').update(data).digest('hex') });
      console.log(`Téléchargé : ${doc.filename}`);
    } catch (error) {
      results.push({ ...doc, status: 'failed', error: error.message });
      console.error(`Non téléchargé : ${doc.filename} (${error.message})`);
      process.exitCode = 1;
    }
  }
  await fs.writeFile(path.join(directory, 'receipts.json'), JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2) + '\n');
  console.log('Dossiers : press/dossiers. Les crédits et droits des photos restent à vérifier avant publication.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
