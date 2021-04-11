let puppeteer = require("puppeteer");
let fs = require("fs");

let data = fs.readFileSync("./res/tags.txt");
data = data + "";
let tagArr = data.split(" ");
console.log(tagArr);

(async () => {

	try {
		let browserInstance = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
			args: ["--start-maximized"],
		     });
		   
		
		   
		let data = [];
		for (let i = 0; i < tagArr.length; i++) {
			let page = await browserInstance.newPage();
			let tag = tagArr[i];
			let link = `https://leetcode.com/tag/${tag}/`;
		   
			await page.goto(link);
			let questionsArr = await getQuestions(page, link, tag);
		}
	}
	catch (err){
		console.log(err);
	}
  
})();

let getQuestions = async (page, link, tag) => {
	// .header__2ZIe > p:nth-child(3) > strong
	await page.waitForSelector(".header__2ZIe > p:nth-child(3) > strong", {visible:true});
	let consoleFn = (tag) => {
		let totalQues = document.querySelector(".header__2ZIe > p:nth-child(3) > strong").innerText;
		totalQues = Number(totalQues.split("/")[1]);
		console.log(tag+" "+totalQues);
	}

	await page.evaluate(consoleFn,tag);
	 
	return 10;
}
