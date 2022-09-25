const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const puppeteer = require("puppeteer");
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

process.setMaxListeners(0);

const apiGoogleTranslate = async function (detect_linguage, translate_to, text) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setDefaultNavigationTimeout(0);
	page.setDefaultTimeout(60000);

	var url = `https://translate.google.com.br/?sl=${detect_linguage}&tl=${translate_to}&text=${encodeURIComponent(
		text
	)}&op=translate`;
	await page.goto(url);

	let result;
	let foundInFirstAttempt = true;

	await page
		.waitForSelector(".Q4iAWc")
		.then(async () => {
			result = await page.evaluate(() => {
				return document.getElementsByClassName("Q4iAWc")[0].innerText;
			});
		})
		.catch(() => {
			foundInFirstAttempt = false;
		});

	if (!foundInFirstAttempt) {
		await page
			.waitForSelector(".VIiyi")
			.then(async () => {
				result = await page.evaluate(() => {
					return document.getElementsByClassName("VIiyi")[1].innerText;
				});
			})
			.catch(() => {
				result = "undefined";
			});
	}

	browser.close();
	return result;
};

app.get("/", async (req, res) => {
	const params = req.query;
	var initialDate = new Date();
	const result = await apiGoogleTranslate(
		params.detect_linguage,
		params.translate_to,
		params.text
	);
	var finalDate = new Date();

	res.send({ response: result, delay: (finalDate - initialDate) / 1000 });
});

app.listen(3000, () => {
	console.log("listening on port 3000");
});
