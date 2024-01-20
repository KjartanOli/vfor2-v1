import { describe, expect, it } from '@jest/globals';
import { is_gameday, is_valid_game } from './validate';

describe('validate', () => {

	describe.only('is_gameday', () => {
		it('Null object', () => {
			expect(is_gameday(null)).toEqual(false);
		});

		it('Missing date', () => {
			expect(is_gameday({games: []})).toEqual(false);
		});

		it('Missing games', () => {
			expect(is_gameday({date: "2024-01-19T23:05:31"})).toEqual(false);
		});

		it('Valid object', () => {
			expect(is_gameday({date: "2024-01-19T23:05:31", games: []})).toEqual(true);
		});
	});

	describe.only('is_valid_game', () => {
		it('Missing home', () => {
			expect(is_valid_game({
				away: {name: 'lorem', score: 0}
			},
				['lorem'])).toEqual(false);
		});

		it('Missing away', () => {
			expect(is_valid_game({
				home: {name: 'lorem', score: 0}
			},
				['lorem'])).toEqual(false);
		});

		it('Invalid team', () => {
			expect(is_valid_game({
				home: {name: 'lorem', score: 0},
				away: {name: 'ipsum'},
			},
				['lorem', 'ipsum'])).toEqual(false);
		});

		it('Invalid team name', () => {
			expect(is_valid_game({
				home: {name: 'lorem', score: 0},
				away: {name: 'ipsum', score: 0},
			},
				['lorem'])).toEqual(false);
		})
	});
})
