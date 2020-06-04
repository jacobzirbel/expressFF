const questions = [
	"I like to try new things",
	"I like to understand the underlying theory",
	"I prefer loud music",
	"I like being with big groups of people",
	"I like fixing things",
	"I like to travel",
	"I prefer cats over dogs",
	"It's fun to go to the bar",
	"My mind is always buzzing with unexplored ideas and plans",
	"I rarely do something just out of sheer curiosity",
];

let form = document.querySelector("form");
form.setAttribute("id", "form");

let nameInput = document.createElement("input");
let nameLabel = document.createElement("label");
nameLabel.setAttribute("for", "name");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("name", "name");
nameInput.setAttribute("id", "name");

nameLabel.textContent = "What is your name?";
form.appendChild(nameLabel);
form.appendChild(nameInput);

let bioInput = document.createElement("input");
let bioLabel = document.createElement("label");
bioLabel.setAttribute("for", "bio");
bioInput.setAttribute("type", "textarea");
bioInput.setAttribute("bio", "bio");
bioInput.setAttribute("id", "bio");
bioLabel.textContent = "Bio:";
form.appendChild(bioLabel);
form.appendChild(bioInput);

questions.forEach((question, index) => {
	let id = `Q${index}`;
	let text = document.createElement("p");
	text.textContent = question;
	let slider = createSlider(id);
	form.appendChild(text);
	form.appendChild(slider);
});

let submit = document.createElement("button");
submit.setAttribute("type", "submit");
submit.setAttribute("value", "Submit");
submit.textContent = "Submit";

form.appendChild(submit);

function createSlider(questionID) {
	let slider = document.createElement("div");
	let agreeText = document.createElement("p");
	let disagreeText = document.createElement("p");
	agreeText.textContent = "Agree";
	disagreeText.textContent = "Disagree";
	slider.setAttribute("class", "slider");
	let input = document.createElement("input");
	input.setAttribute("type", "range");
	input.setAttribute("min", "0");
	input.setAttribute("max", "10");
	input.setAttribute("name", questionID);

	slider.appendChild(disagreeText);
	slider.appendChild(input);
	slider.appendChild(agreeText);
	return slider;
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let t = e.target;
	let len = t.length;
	let values = [];
	for (let i = 0; i < len; i++) {
		values.push(t[i].value);
	}
	if (values[0].length) {
		values.pop();
		console.log(values);
		$.ajax({
			type: "POST",
			url: "/api/friends",
			data: { values },
			success: success,
		});
	} else {
		document.getElementById("modal-title").textContent = "Error";
		document.getElementById("modal-body").textContent = "You must enter a name";
		$("#modal").modal({ show: true });
	}
});
function success(e) {
	console.log("success");
	let text = "";
	e.forEach((e, i) => {
		text += `${i + 1}: ${e.name} <br />`;
		text += `&nbsp;&nbsp; Match Score: ${e.score} <br />`;
		text += e.bio;
		text += "<hr />";
	});
	document.getElementById("modal-title").textContent = "Closest Matches";

	document.getElementById("modal-body").innerHTML = text;
	$("#modal").modal({ show: true });
}
