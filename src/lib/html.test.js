import { describe, expect, it } from '@jest/globals';
import { game_template, index_template, standings_template } from './html';

describe('html', () => {
	describe('index_template', () => {
		it('Only', () => {
			expect(index_template()).toEqual('<html lang="en"><head><title>Ball League</title></head><body><ul><li><a href="leikir.html">Games</a></li><li><a href="stada.html">Standings</a></li></ul></body></html>');
		});
	});

	describe.only('standings_template', () => {
		it('One team', () => {
			expect(standings_template([
				{
					name: 'lorem',
					points: 4
				}
			])).toEqual('<html lang="en"><head><title>Standings</title></head><body><table><thead><tr><th>Team</th><th>Score</th></tr></thead><tbody><tr id="lorem"><td>lorem</td><td>4</td></tr></tbody></table></body></html>');
		});
	});

	describe.only('game_template', () => {
		it('Single game', () => {
			expect(game_template([
				{
					date: new Date('2024-02-02T15:20:53.955Z'),
					games: [
						{
							home: {
								name: 'lorem',
								score: 3,
							},
							away: {
								name: 'ipsum',
								score: 2,
							},
						}
					]
				}
			])).toEqual('<html lang="en"><head><title>Games</title></head><body><table><thead><tr><th>Home</th><th>Away</th><th>Score</th></tr></thead><tbody id="2024-02-02"><tr><th colspan="3">2024-02-02</th></tr><tr><td>lorem</td><td>ipsum</td><td>3-2</td></tr></tbody></table></body></html>');
		});

		it('Multiple days', () => {
			expect(game_template([
				{
					date: new Date('2024-02-02T15:20:53.955Z'),
					games: [
						{
							home: {
								name: 'lorem',
								score: 3,
							},
							away: {
								name: 'ipsum',
								score: 2,
							},
						}
					]
				},
				{
					date: new Date('2024-02-03T15:20:53.955Z'),
					games: [
						{
							home: {
								name: 'dolor',
								score: 3,
							},
							away: {
								name: 'set',
								score: 2,
							},
						}
					]
				}
			])).toEqual('<html lang="en"><head><title>Games</title></head><body><table><thead><tr><th>Home</th><th>Away</th><th>Score</th></tr></thead><tbody id="2024-02-02"><tr><th colspan="3">2024-02-02</th></tr><tr><td>lorem</td><td>ipsum</td><td>3-2</td></tr></tbody><tbody id="2024-02-03"><tr><th colspan="3">2024-02-03</th></tr><tr><td>dolor</td><td>set</td><td>3-2</td></tr></tbody></table></body></html>');
		});
	});
});
