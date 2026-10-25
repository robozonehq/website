import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 8090);
const FIELDS = ["name", "email", "guardian", "guardian_email", "grade"];

const send = (res, status, body) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  });
  res.end(JSON.stringify(body));
};

createServer((req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});
  if (req.method !== "POST" || !req.url?.startsWith("/api/collections/signups/records")) {
    return send(res, 404, { code: 404, message: "Not found", data: {} });
  }
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return send(res, 400, { code: 400, message: "Invalid JSON", data: {} });
    }
    const keys = Object.keys(body).sort();
    const extra = keys.filter((k) => !FIELDS.includes(k));
    const missing = FIELDS.filter((k) => !(k in body));
    console.log("POST signups", { keys, extra, missing, gradeType: typeof body.grade });

    if (missing.length || extra.length || typeof body.grade !== "number") {
      return send(res, 400, { code: 400, message: "Contract mismatch", data: { missing, extra } });
    }
    if (String(body.name).includes("fail")) {
      return send(res, 500, { code: 500, message: "Something went wrong", data: {} });
    }
    if (String(body.guardian_email).includes("taken")) {
      return send(res, 400, {
        code: 400,
        message: "Failed to create record.",
        data: { guardian_email: { code: "validation_invalid_email", message: "Must be a valid email address." } },
      });
    }
    const respond = () =>
      send(res, 200, { id: Math.random().toString(36).slice(2, 17), collectionName: "signups", ...body });
    if (String(body.name).includes("slow")) setTimeout(respond, 3000);
    else respond();
  });
}).listen(port, () => console.log(`Mock PocketBase listening on http://localhost:${port}`));
