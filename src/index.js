const htmlPdf = require('html-pdf-chrome');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

app.get('/', async (req, res) => {
    try {
        const url = req.query.url;
        if (url === undefined) {
            throw new Error("Missing URL param");
        }

        const pdf = await htmlPdf.create(url, {
            port: 9222,
            printOptions: {
                printBackground: true,
            }
        });

        res.setHeader('Content-Type', 'application/pdf');
        pdf.toStream()
            .on('data', chunk => res.write(chunk))
            .on('end', () => res.end())
        ;
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
