/**
 * Get the winner of a game.
 * @param {Game} game Game whose winner should be checked
 * @returns {string | null} Name of the winning team, if there is no
 * winner `null` is returned.
 */
function game_winner(game) {
	const { home, away } = game;
	if (home.score > away.score)
		return home.name;
	if (away.score > home.score)
		return away.name;
	return null;
}

/**
 * Check whether a game was a draw
 * @param {Game} game Game to check
 * @returns `true` if game ended in a draw, `false` otherwise
 */
function is_draw(game) {
	const { home, away } = game;
	return home.score === away.score;
}

/**
 * Get the number of points a team receives for a game.
 *
 * team must have played in the game.
 *
 * @param {string} team Team whose points should be calculated
 * @param {Game} game Game for which the points should be calculated
 * @returns {number} team's points for game.
 */
function points_for_game(team, game) {
	if (is_draw(game))
		return 1;
	if (team === game_winner(game))
		return 3;

	return 0;
}

/**
 * Check whether a team played in a game
 * @param {string} team Team to check
 * @param {Game} game Game to check
 * @returns `true` if team played in game, `false` otherwise.
 */
function played_in_game_p(team, game) {
	const { home, away } = game;
	return home.name === team || away.name === team;
}


/**
 * Get the number of points a team received for a set of games.
 * @param {string} team Team whose point total should be calculated
 * @param {Game[]} games The games to calculate points from
 */
function points(team, games) {
	return games.filter(game => played_in_game_p(team, game))
		.map(game => points_for_game(team, game))
		.reduce((p, acc) => p + acc, 0);
}

/**
 * Get the status of the league based on a set of games.
 * @param {string[]} teams The teams in the league
 * @param {Game[]} games The games in the league
 * @returns {TeamStatus[]} Array of teams and their points, ordered by
 * position in the leauge
 */
export function league_status(teams, games) {
	return teams.map(team => ({
		name: team,
		points: points(team, games)
	})).sort((a, b) => b.points - a.points);
}
