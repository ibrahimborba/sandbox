import {fileURLToPath } from "url";
import path from "path";
import express from 'express';
import fs from 'fs';
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();

const parts = html.split('not rendered');

const app = express();
app.use("/assets",
    express.static(path.resolve(__dirname, './dist/client/assets'))
);

app.use((req, res) => {
    res.write(parts[0]);
    const stream = renderApp(req.url, {
        onShellReady() {
            stream.pipe(res)
        },
        onShellError(err) {
            console.error(err);

        },
        onAllReeady() {
            res.write(parts[1]);
            res.end();
        }
    })
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
