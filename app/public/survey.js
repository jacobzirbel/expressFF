const questions = [
	"Question One",
	"Question Two",
	"Question Three",
	"Question Four",
	"Question Five",
	"Question Six",
	"Question Seven",
	"Question Eight",
	"Question Nine",
	"Question Ten",
];

let form = document.querySelector("form");

let nameInput = document.createElement("input");
let nameLabel = document.createElement("label");
nameLabel.setAttribute("for", "name");
nameInput.setAttribute("type", "text");
nameInput.setAttribute("name", "name");

nameLabel.textContent = "What is your name?";
form.appendChild(nameLabel);
form.appendChild(nameInput);

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

form.appendChild(submit);

function createSlider(questionID) {
	let slider = document.createElement("div");
	slider.setAttribute("class", "slider");
	let input = document.createElement("input");
	input.setAttribute("type", "range");
	input.setAttribute("min", "1");
	input.setAttribute("max", "10");
	input.setAttribute("name", questionID);
	slider.appendChild(input);
	return slider;
}
