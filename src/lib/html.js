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

function th(content, attributes = {})
	{
		return el('th', attributes, content);
	}

function thead(...columns) {
	return el('thead', {},
		el('tr', {}, ...columns)
	);
}

function game_row(game) {
	return el('tr', {},
		el('td', {}, game.home.name),
		el('td', {}, game.away.name),
		el('td', {}, `${game.home.score}-${game.away.score}`)
	);
}

function game_day(day) {
	return el('tbody', {
		id: day.date.toISOString().substring(0, 'yyyy-mm-dd'.length)
	},
		el('tr', {},
			th(day.date.toISOString().substring(0, 'yyyy-mm-dd'.length),
				{colspan: 3}
			)
		),
		...day.games.map(game_row));
}

export function game_list(gamedays) {
	return el('table', {},
		thead(th('Home'), th('Away'), th('Score')),
		...gamedays.map(game_day)
	);
}

export function team_list(teams) {
	return el('table', {},
		thead(th('Team'), th('Score')),
		el('tbody', {},
			...teams.map(team => el('tr', { id: team.name },
				el('td', {}, team.name),
				el('td', {}, team.points)
			))
		)
	);
}
