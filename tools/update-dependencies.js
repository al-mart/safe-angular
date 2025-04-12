import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import https from 'https';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_JSON_PATH = path.resolve(__dirname, '../package.json');

function fetchLatestVersion(packageName) {
    return new Promise((resolve, reject) => {
        https.get(`https://registry.npmjs.org/${packageName}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(json['dist-tags'].latest);
                } catch (err) {
                    reject(`Failed to parse response for ${packageName}`);
                }
            });
        }).on('error', reject);
    });
}

async function updateDependencies() {
    const raw = await fs.readFile(PACKAGE_JSON_PATH, 'utf-8');
    const pkg = JSON.parse(raw);
    const sections = ['dependencies', 'devDependencies', 'peerDependencies'];

    for (const section of sections) {
        if (!pkg[section]) continue;

        console.log(`\n🔍 Updating ${section}...`);
        for (const dep of Object.keys(pkg[section])) {
            try {
                const latest = await fetchLatestVersion(dep);
                console.log(`- ${dep}: ${pkg[section][dep]} → ^${latest}`);
                pkg[section][dep] = `^${latest}`;
            } catch (err) {
                console.warn(`⚠️  Could not update ${dep}: ${err}`);
            }
        }
    }

    await fs.writeFile(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2));
    console.log('\n✅ package.json has been updated with latest versions.');
}

updateDependencies().catch(err => {
    console.error('❌ Failed to update dependencies:', err);
});
