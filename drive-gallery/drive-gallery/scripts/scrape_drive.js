// scripts/scrape_drive.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

const DRIVE_URL = process.env.DRIVE_FOLDER_URL;

if (!DRIVE_URL) {
    console.error("ERROR: falta DRIVE_FOLDER_URL");
    process.exit(1);
}

(async () => {
    try {
        console.log("Descargando HTML de Drive...");
        const html = await axios.get(DRIVE_URL).then(r => r.data);

        console.log("Procesando HTML...");
        const regex = /"((?:AKGpih|AKGpi)[a-zA-Z0-9_\-]+)"/g;
        let match;
        const urls = [];

        while ((match = regex.exec(html)) !== null) {
            const id = match[1];
            const finalUrl = `https://drive.google.com/u/0/drive-viewer/${id}`;
            urls.push(finalUrl);
        }

        const unique = [...new Set(urls)];

        const outPath = path.join(process.cwd(), "public", "images.txt");
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, unique.join("\n"), "utf8");

        console.log(`Listo. Se generaron ${unique.length} URLs.`);
    } catch (err) {
        console.error("ERROR:", err.message);
    }
})();
