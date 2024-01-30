import { writeFile } from 'fs/promises';
import { join } from 'node:path';
import { createDirIfNotExists } from './lib/file.js';
import { standings_template, index_template, game_template } from './lib/html.js';
import { parse_dir } from './lib/parse.js';
import { league_games, league_status } from './lib/score.js';


const { teams, gamedays } = await parse_dir('./data');
const games = league_games(gamedays);
const standings = league_status(teams, games);
const OUTPUT_DIR = 'dist';

await createDirIfNotExists(OUTPUT_DIR);
await writeFile(join(OUTPUT_DIR, 'index.html'), index_template());
await writeFile(join(OUTPUT_DIR, 'leikir.html'), game_template(gamedays));
await writeFile(join(OUTPUT_DIR, 'stada.html'), standings_template(standings));
