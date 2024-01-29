import { describe, expect, it } from '@jest/globals';
import { game_list, team_list, index_template } from './html';

describe('html', () => {
	describe('index_template', () => {
		it('Only', () => {
			expect(index_template()).toEqual('<html lang="en"><head><title>Ball League</title></head><body><ul><li><a href="leikir.html">Games</a></li><li><a href="stada.html">Standings</a></li></ul></body></html>');
		})
	});
	describe.only('game_list', () => {
		it('Single game', () => {
			expect(game_list([
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
			])).toEqual('<table><thead><tr><th>Home</th><th>Away</th><th>Score</th></tr></thead><tbody id="2024-02-02"><tr><th colspan="3">2024-02-02</th></tr><tr><td>lorem</td><td>ipsum</td><td>3-2</td></tr></tbody></table>');
		});

		it('Multiple days', () => {
			expect(game_list([
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
			])).toEqual('<table><thead><tr><th>Home</th><th>Away</th><th>Score</th></tr></thead><tbody id="2024-02-02"><tr><th colspan="3">2024-02-02</th></tr><tr><td>lorem</td><td>ipsum</td><td>3-2</td></tr></tbody><tbody id="2024-02-03"><tr><th colspan="3">2024-02-03</th></tr><tr><td>dolor</td><td>set</td><td>3-2</td></tr></tbody></table>');
		});
	});

	describe.only('team_list', () => {
		it('One team', () => {
			expect(team_list([
				{
					name: 'lorem',
					points: 4
				}
			])).toEqual('<table><thead><tr><th>Team</th><th>Score</th></tr></thead><tbody><tr id="lorem"><td>lorem</td><td>4</td></tr></tbody></table>');
		})
	});
});
