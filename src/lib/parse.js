import { direxists, readFile, readFilesFromDir } from './file';
import { is_valid_game, is_gameday } from './validate';

async function parse_file(file_path)
	{
		return JSON.parse(await readFile(file_path));
	}

/**
 * Parse a file containing team information
 * @param {string} file_path Path to the file to parse
 * @returns {string[]} Array of team names
 */
async function parse_teams_file(file_path)
	{
		return parse_file(file_path);
	}


/**
 * Parse game data for a single day from a file
 * @param {string} file_path Path to the file to parse
 * @param {string[]} Array of valid team names
 * @returns {Object} Game data for a single day, or `null` if the file
 * contains invalid data
 */
async function parse_game_file(file_path, team_names)
	{
		const gameday = await parse_file(file_path);

		if (!is_gameday(gameday))
			return null;

		return {
			date: Date.parse(gameday.date),
			games: gameday.games.filter(game => is_valid_game(game, team_names))
		};
	}

/**
 * Load data from a directory
 * @param {string} dir Directory to load data from
 * @returns {Promise<Object[]>} Array of game days
 */
export async function parse_dir(dir)
	{
		if (await !direxists(dir))
			return null;

		const files = await readFilesFromDir(dir);
		const teams_file = files.find(file => /teams.json$/.test(file))

		if (!teams_file)
			return null;

		const teams = await parse_teams_file(teams_file);
		const game_files = files.filter(file => /gameday-.+\.json$/.test(file))

		const gamedays = (await Promise.all(
			game_files.map(file => parse_game_file(file, teams)))
		).filter(obj => obj);

		return {
			teams,
			gamedays
		};
	}
