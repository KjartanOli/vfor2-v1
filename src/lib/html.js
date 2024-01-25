function el(element, attributes, ...children) {
	const attrs = Object.entries(attributes)
		.map(entry => {
			const [key, value] = entry;
			return `${key}="${value}"`
		});

	return `<${element}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}>${children.join('')}</${element}>`
}

export function document(title, language, head, ...body) {
	return el('html', { lang: language },
		el('head', {}, ...[el('title', {}, title), ...head]),
		el('body', {}, ...body)
	);
}

function thead(...columns) {
	return el('thead', {},
		el('tr', {}, ...columns.map(column => el('th', {}, column)))
	);
}

function game_row(date, game) {
	return el('tr', {},
		el('td', {}, date.toISOString().substring(0, 'yyyy-mm-dd'.length)),
		el('td', {}, game.home.name),
		el('td', {}, game.away.name),
		el('td', {}, `${game.home.score}-${game.away.score}`)
	);
}

function game_day(day) {
	return el('tbody', {
		id: day.date.toISOString().substring(0, 'yyyy-mm-dd'.length)
	}, ...day.games.map(game => game_row(day.date, game)));
}

export function game_list(gamedays) {
	return el('table', {},
		thead('Date', 'Home', 'Away', 'Score'),
		...gamedays.map(game_day)
	);
}

export function team_list(teams) {
	return el('table', {},
		el('thead', {},
			el('tr', {},
				el('th', {}, 'Team'),
				el('th', {}, 'Score')
			)
		),
		el('tbody', {},
			...teams.map(team => el('tr', { id: team.name },
				el('td', {}, team.name),
				el('td', {}, team.score)
			))
		)
	);
}
