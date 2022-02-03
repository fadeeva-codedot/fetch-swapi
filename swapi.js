const inputField = document.querySelector('.field__search')

const urls = [
	'https://swapi.dev/api/films/?search=',
	'https://swapi.dev/api/people/?search=',
	'https://swapi.dev/api/planets/?search=',
	'https://swapi.dev/api/species/?search=',
	'https://swapi.dev/api/starships/?search=',
	'https://swapi.dev/api/vehicles/?search='
]

const writeRes = (res) => {
	const list = document.querySelector('.list')
	list.innerHTML = ''
	res.forEach((element) => {
		list.innerHTML += `<li>${element.name || element.title}</li>`
	})
}

const search = async () => {
	if (inputField.value.length != 0) {
		const requests = urls.map((url) => fetch(`${url}${inputField.value}`))
		const res = await Promise.all(requests).then((responses) =>
			Promise.all(responses.map((response) => response.json())).then(
				(objects) => objects.map((obj) => obj.results)
			)
		)
		writeRes(res.flat())
	} else writeRes([])
}

inputField.addEventListener('input', search)
