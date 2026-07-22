/* Troefcall server — serveert de app én de kamer-API.
   Geen dependencies nodig: draait op kale Node.js (18+). */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const rooms = new Map(); // code -> { data: jsonString, t: timestamp }
const TTL = 24 * 60 * 60 * 1000; // kamers verlopen na 24 uur

// oude kamers opruimen (elk uur)
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rooms) if (now - v.t > TTL) rooms.delete(k);
}, 60 * 60 * 1000);

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon" };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");

  // ---- kamer-API ----
  if (url.pathname.startsWith("/api/room/")) {
    const raw = decodeURIComponent(url.pathname.split("/")[3] || "");
    const code = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    if (!code) { res.writeHead(400, { "Content-Type": "application/json" }); return res.end("null"); }

    if (req.method === "GET") {
      const r = rooms.get(code);
      res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
      return res.end(r ? r.data : "null");
    }
    if (req.method === "PUT") {
      let body = "";
      req.on("data", (c) => { body += c; if (body.length > 300000) req.destroy(); });
      req.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          // last-write-wins, maar verouderde schrijfacties (lagere seq) negeren we
          const cur = rooms.get(code);
          if (cur) {
            try { if ((JSON.parse(cur.data).seq || 0) > (parsed.seq || 0)) {
              res.writeHead(200, { "Content-Type": "application/json" });
              return res.end('{"ok":true,"stale":true}');
            } } catch {}
          }
          rooms.set(code, { data: body, t: Date.now() });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end('{"ok":true}');
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end('{"ok":false}');
        }
      });
      return;
    }
    res.writeHead(405); return res.end();
  }

  // ---- statische bestanden ----
  let p = url.pathname === "/" ? "/index.html" : url.pathname;
  const file = path.join(__dirname, "public", path.normalize(p).replace(/^(\.\.[\/\\])+/, ""));
  if (!file.startsWith(path.join(__dirname, "public"))) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Niet gevonden"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => console.log("♠♥ Troefcall draait op poort " + PORT + " ♦♣"));
