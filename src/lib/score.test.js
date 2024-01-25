import { describe, expect, it } from '@jest/globals';
import { league_status } from './score';

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
});
