import { describe, expect, it } from '@jest/globals';
import { parse_dir } from './parse';

// The only public function in parse is `parse_dir` which does file
// system interaction and therefore can not be unit tested.
describe('parse', () => {
  describe.only('parse_dir', () => {
    it('Valid', async () => {
			const data = await parse_dir('src/test/data/3');
      expect(data).toEqual({
				teams: ['lorem', 'ipsum'],
				gamedays: [
					{
						date: Date.parse('2024-02-02T15:20:53.955Z'),
						games: [
							{
								home: {
									name: 'lorem',
									score: 0
								},
								away: {
									name: 'ipsum',
									score: 0
								}
							}
						]
					}]
			})
		});

		it('Missing teams.json', async () => {
			const data = await parse_dir('src/test/data/4');
			expect(data).toEqual(null);
		});

		it('Directory does not exist', async () => {
			const data = await parse_dir('src/test/data/none');
			expect(data).toEqual(null);
		});

		it('Invalid game day', async () => {
			const data = await parse_dir('src/test/data/5');
			expect(data).toEqual({
				teams: ['lorem', 'ipsum'],
				gamedays: []
			});
		});
	}
	);
}
);
