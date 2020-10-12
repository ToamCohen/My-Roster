const button = $("#button");
const input = $("#input");
const container = $("#players-container");
const api = new Api();

const renderData = function () {
	api.players(input.val());
};

const showStats = function () {
	let firstName = $(this).closest(".container").find(".firstName").text();
	let lastName = $(this).closest(".container").find(".lastName").text();
	firstName = firstName.replace(/\s/g, "");
	lastName = lastName.replace(/\s/g, "");
	console.log(firstName)
	console.log(lastName)
	api.stats(firstName, lastName);
};

container.on("click", ".img", showStats);
button.on("click", renderData);
