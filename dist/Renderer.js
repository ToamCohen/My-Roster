class Renderer {
	render(data, containerName, templateName) {
		$(`${containerName}-container`).empty()
		const source = $(`${templateName}-template`).html();
		const template = Handlebars.compile(source);
		const someHTML = template(data);
		$(`${containerName}-container`).append(someHTML);
	}
}
