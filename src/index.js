const htmlPdf = require('html-pdf-chrome');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(compression());

app.post('/', async (req, res) => {
    try {
        if (typeof req.body === 'object') {
            throw new Error("Service requires header 'Content-Type: text/plain', and a raw body that is either a URL or HTML content");
        }

        const pdf = await htmlPdf.create(req.body, {
            port: 9222,
            printOptions: {
                margins: 0,
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
