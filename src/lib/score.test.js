import { describe, expect, it } from '@jest/globals';
import { league_status, league_games } from './score';

describe('score', () => {
	describe('league_status', () => {
		it('No games', () => {
			expect(league_status(['lorem'], [])).toEqual([{
				name: 'lorem',
				points: 0
			}]);
		});

		it('One game', () => {
			expect(league_status(['lorem', 'ipsum'], [
				{
					home: {
						name: 'lorem',
						score: 3
					},
					away: {
						name: 'ipsum',
						score: 2
					}
				}
			])).toEqual([
				{
					name: 'lorem',
					points: 3
				},
				{
					name: 'ipsum',
					points: 0
				}
			]);
		});

		it('Draw', () => {
			expect(league_status(['lorem', 'ipsum'], [
				{
					home: {
						name: 'lorem',
						score: 2
					},
					away: {
						name: 'ipsum',
						score: 2
					}
				}
			])).toEqual([
				{
					name: 'lorem',
					points: 1
				},
				{
					name: 'ipsum',
					points: 1
				}
			]);
		});

		it('Multiple games', () => {
			expect(league_status(['lorem', 'ipsum', 'dolor'], [
				{
					home: {
						name: 'lorem',
						score: 2
					},
					away: {
						name: 'ipsum',
						score: 2
					}
				},
				{
					home: {
						name: 'lorem',
						score: 2
					},
					away: {
						name: 'dolor',
						score: 3
					}
				}
			])).toEqual([
				{
					name: 'dolor',
					points: 3
				},
				{
					name: 'lorem',
					points: 1
				},
				{
					name: 'ipsum',
					points: 1
				}
			]);
		});
	});

	describe('games', () => {
		it('No days', () => {
			expect(league_games([])).toEqual([]);
		});

		it('One day', () => {
			expect(league_games([
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
			])).toEqual([
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
			])
		});

		it('Multiple days', () => {
			expect(league_games([
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
			])).toEqual([
				{
					home: {
						name: 'lorem',
						score: 3,
					},
					away: {
						name: 'ipsum',
						score: 2,
					},
				},
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
			]);
		});

		it('Multiple games per day', () => {
			expect(league_games([
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
						},
						{
							home: {
								name: 'set',
								score: 3,
							},
							away: {
								name: 'dolor',
								score: 2,
							}
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
			])).toEqual([
				{
					home: {
						name: 'lorem',
						score: 3,
					},
					away: {
						name: 'ipsum',
						score: 2,
					},
				},
				{
					home: {
						name: 'set',
						score: 3,
					},
					away: {
						name: 'dolor',
						score: 2,
					}
				},
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
			]);
		});
	});
});
