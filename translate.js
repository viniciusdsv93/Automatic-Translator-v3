const axios = require("axios");
const fs = require("fs");

let object = {
	MESSAGE: "Good afternoon",
	OBJECT: "Food and Drinks",
	SENTENCE: "I am studying right now",
};

async function getSingleData(translateTo, text, key) {
	const translatedText = await axios.get(
		`http://localhost:3000?detect_linguage=en&translate_to=${translateTo}&text=${text}`
	);

	return {
		key: key,
		text: translatedText.data.response,
	};
}

async function getData(translateTo) {
	console.time(`getData - ${translateTo}`);
	let targetObject = {};
	let promisesArray = [];
	for (let obj of Object.entries(object)) {
		promisesArray.push(getSingleData(translateTo, obj[1], obj[0]));
	}

	return Promise.all(promisesArray).then((promises) => {
		promises.forEach((promise) => {
			targetObject[promise.key] = promise.text;
		});
		fs.writeFile(
			`translated-${translateTo}.json`,
			JSON.stringify(targetObject),
			(err) => {
				if (err) throw err;
				console.log(`File "translated-${translateTo}.json" successfully created`);
				console.timeEnd(`getData - ${translateTo}`);
			}
		);
	});
}

(async function () {
	await getData("es");
	await getData("ar");
	await getData("pt");
	await getData("de");
	await getData("fr");
	await getData("ja");
	await getData("ko");
	await getData("ru");
	await getData("zh-CN");
	await getData("zh-TW");
})();
