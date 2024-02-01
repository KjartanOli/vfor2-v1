function el(element, attributes, ...children) {
	const attrs = Object.entries(attributes)
		.map(entry => {
			const [key, value] = entry;
			return `${key}="${value}"`
		});

	return `<${element}${attrs.length > 0 ? ' ' : ''}${attrs.join(' ')}>${children.join('')}</${element}>`
}

function document(title, language, head, ...body) {
	return el('html', { lang: language },
		el('head', {}, ...[
			el('title', {}, title),
			el('meta', { charset: 'UTF-8' }),
			 ...head
		]),
		el('body', {}, ...body)
	);
}

function th(content, attributes = {}) {
	return el('th', attributes, content);
}

function thead(...columns) {
	return el('thead', {},
		el('tr', {}, ...columns)
	);
}

function link(href, text, attributes = {}) {
	return el('a', { href, ...attributes }, text);
}

function stylesheet(path) {
	return el('link', {
		href: path,
		rel: 'stylesheet'
	})
}

function list(attributes, ...items) {
	({ attributes, items } = (typeof attributes !== 'string')
		? { attributes, items }
		: {
			attributes: {},
			items: [attributes, ...items]
		});

	return el('ul', attributes, ...items.map(item => el('li', {}, item)));
}

function game_row(game) {
	return el('tr', {},
		el('td', {}, game.home.name),
		el('td', {}, game.away.name),
		el('td', { class: 'centered' }, `${game.home.score}-${game.away.score}`)
	);
}

function game_day(day) {
	return el('tbody', {
		id: day.date.toISOString().substring(0, 'yyyy-mm-dd'.length)
	},
		el('tr', {},
			th(day.date.toISOString().substring(0, 'yyyy-mm-dd'.length),
				{ colspan: 3 }
			)
		),
		...day.games.map(game_row));
}

function game_list(gamedays) {
	return el('table', {},
		thead(th('Home'), th('Away'), th('Score')),
		...gamedays.map(game_day)
	);
}

function team_list(teams) {
	return el('table', {},
		thead(th('Team'), th('Score')),
		el('tbody', {},
			...teams.map(team => el('tr', { id: team.name },
				el('td', {}, team.name),
				el('td', { class: 'centered' }, team.points)
			))
		)
	);
}

function template(title, ...body) {
	return document(title, 'en', [
		stylesheet('./public/styles.css')
	], ...body);
}

export function index_template() {
	return template('Ball League',
		list(
			link('leikir.html', 'Games'),
			link('stada.html', 'Standings')
		)
	);
}

export function standings_template(standings) {
	return template('Standings', team_list(standings));
}

export function game_template(gamedays) {
	return template('Games', game_list(gamedays));
}
