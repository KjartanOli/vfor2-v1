/**
 * Check if an object has a given key.
 * @param {Object} obj Object to check
 * @param {string} key Key to check for
 * @returns `true` if obj has key, `false` otherwise
 */
function has_key(obj, key)
	{
		return Object.prototype.hasOwnProperty.call(obj, key);
	}

/**
 * Check if an object contains a date.
 * @param {Object} gameday Object to check
 * @returns `true` if gamyday contains a date, `false` otherwise
 */
function has_date(gameday)
	{
		return has_key(gameday, 'date');
	}

/**
 * Check if an object contains games.
 * @param {Object} gameday Object to check
 * @returns `true` if gamyday contains games, `false` otherwise
 */
function has_games(gameday)
	{
		return has_key(gameday, 'games') && Array.isArray(gameday.games);
	}

/**
 * Check if an object meets the structural requirements of a team.
 * @param {Object} obj Object to check
 * @returns `true` if obj is a structurally valid team, `false` otherwise
 */
function is_team(obj)
	{
		return has_key(obj, 'name') && has_key(obj, 'score');
	}

/**
 * Check if a given number is a valid score.
 * @param {number} score Number to check
 * @returns `true` if score is valid, `false` otherwise
 */
function is_valid_score(score)
	{
		return Number.isInteger(score) && score >= 0;
	}

/**
 * Check if a given name is a valid team name
 * @param {string} name Name to check
 * @param {string[]} names Array of valid names
 * @returns `true` if name is valid, `false` otherwise
 */
function is_valid_team_name(name, names)
	{
		return typeof name === 'string' && names.includes(name);
	}

/**
 * Check if an object is a valid team.
 * @param {Object} obj Object to check
 * @param {string[]} team_names Array of valid team names
 * @returns `true` if obj is a valid team, `false` otherwise
 */
function is_valid_team(obj, team_names)
	{
		return is_team(obj)
			&& is_valid_score(obj.score)
			&& is_valid_team_name(obj.name, team_names);
	}

/**
 * Check if an object meets the structural requirements of a game.
 * @param {Object} obj Object to check
 * @returns `true` if obj is a structurally valid game, `false` otherwise
 */
function is_game(obj)
	{
		return has_key(obj, 'home') && has_key(obj, 'away');
	}

/**
 * Check if an object is a valid game.
 * @param {Object} obj Object to check
 * @param {string[]} team_names Array of valid team names
 * @returns `true` if obj is a valid game, `false` otherwise
 */
export function is_valid_game(obj, team_names)
	{
		return is_game(obj)
			&& is_valid_team(obj.home, team_names)
			&& is_valid_team(obj.away, team_names);
	}

/**
 * Check if an object meets the structural requirements of a gameday.
 * @param {Object} obj Object to check
 * @returns `true` if obj is a structurally valid gameday, `false` otherwise
 */
export function is_gameday(obj)
	{
		return (obj !== null) && has_date(obj) && has_games(obj);
	}
