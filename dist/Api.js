const render = new Renderer();

class Api {
	players = (input) => {
		$.ajax({
			method: "GET",
			url: `team/${input}`,
			success: (data) => {
				return render.render({ player: data }, "#players", "#players");
			},
		});
	};

	stats = (firstName, lastName) => {
		$.ajax({
			method: "GET",
			url: `/playerStats/${firstName}/${lastName}`,
			success: (data) => {
				return render.render(data, "#players", "#stats"); 
			},
		});
	};
}
