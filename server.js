const express = require("express");
const app = express();
const path = require("path");
const urllib = require("urllib");

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));

const URL = () => `http://data.nba.net/10s/prod/v1/2018/players.json`;
const URL1 = (firstName, lastName) =>
	`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`;

const teamToIDs = {
	lakers: "1610612747",
	warriors: "1610612744",
	heat: "1610612748",
	suns: "1610612756",
};

const player = (r) => {
	return {
		firstName: r.firstName,
		lastName: r.lastName,
		jersey: r.jersey,
		pos: r.pos,
	};
};

const relventData = (r, teamName) => {
	return r.isActive === true && r.teamId === teamToIDs[teamName];
};

app.get("/team/:teamName", function (req, res) {
	const teamName = req.params.teamName;
	urllib.request(URL(), function (err, data) {
		data = JSON.parse(data);
		const Data = data.league.standard
			.filter((r) => relventData(r, teamName))
			.map((r) => player(r));
		res.send(Data);
	});
});

app.get(`/playerStats/:player/:lastName`, function (req, res) {
	const firstName = req.params.player;
	const lastName = req.params.lastName;
	urllib.request(URL1(firstName, lastName), function (err, data) {
		data = JSON.parse(data);
		res.send(data);
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`server up and runing on port ${port}`);
});
