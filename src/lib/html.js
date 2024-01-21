function el(element, attributes, ...children)
	{
		const attrs = Object.entries(attributes)
			.map(entry => {
				const [key, value] = entry;
				return `${key}="${value}"`
			});

		return `<${element}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}>${children.join('')}</${element}>`
	}

export function game_list(gamedays)
	{
		return el('table', {},
			el('thead', {},
				el('tr', {},
					el('th', {}, 'Date'),
					el('th', {}, 'Home'),
					el('th', {}, 'Away'),
					el('th', {}, 'Score')
				)
			),
			el('tbody', {},
				...gamedays.map(day => day.games.map(game => el('tr', {},
					el('td', {}, day.date.toISOString().substring(0, 'yyyy-mm-dd'.length)),
					el('td', {}, game.home.name),
					el('td', {}, game.away.name),
					el('td', {}, `${game.home.score}-${game.away.score}`)
				)))
			)
		)
	}

export function team_list(teams)
	{
		return el('table', {},
			el('thead', {},
				el('tr', {},
					el('th', {}, 'Team'),
					el('th', {}, 'Score')
				)
			),
			el('tbody', {},
				...teams.map(team => el('tr', {id: team.name},
					el('td', {}, team.name),
					el('td', {}, team.score)
				))
			)
		);
	}
