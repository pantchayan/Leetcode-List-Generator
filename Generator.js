let puppeteer = require("puppeteer");
let fs = require("fs");
let ExcelWriter = require("./ExcelWriter");

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
			console.log(tag+" "+questionsArr.length);
			console.table(questionsArr);
			ExcelWriter.writeData(questionsArr, "./res/questions.xlsx", tag);
		}
	}
	catch (err){
		console.log(err);
	}
  
})();

let getQuestions = async (page, link, tag) => {
	// .header__2ZIe > p:nth-child(3) > strong
	// tbody > tr
	let rowSelector = "tbody>tr";
	await page.waitForSelector(rowSelector, {visible:true});
	
	
	let consoleFn = (rowSelector) => {
		
		
		let arrQuestions = document.querySelectorAll(rowSelector);
		let arrLinks = document.querySelectorAll("tbody>tr>td>div>a");
		let detailsArr = [];
		for(let i =0;i<arrQuestions.length;i++){
			let quesDetails = arrQuestions[i].innerText;
			let quesArr = quesDetails.split("\t");
			let qnum = quesArr[1];
			let qname = quesArr[2].split("\n")[1];
			let acceptRate = quesArr[3];
			let qdiff = quesArr[4];

			let qlink = arrLinks[i].href;

			detailsArr.push({
				Number : qnum,
				Name: qname,
				Acceptance_Rate: acceptRate,
				Difficulty: qdiff,
				Link: qlink
			})
		}
		return detailsArr;
	}

	return await page.evaluate(consoleFn,rowSelector);
}
