document.addEventListener('DOMContentLoaded', (event) => {
    const cats = document.querySelectorAll('.cat-item')
    const descriptionDiv = document.getElementById('cat-description')

    function loadCatDescriptions() {
        return fetch('mascotes.json')
            .then(response => response.json())
            .then(data => {
                const descriptions = {}
                data.forEach(cat => {
                    descriptions[cat.nome] = cat.descricao
                })
                return descriptions
            })
    }

    loadCatDescriptions().then(descriptions => {
        cats.forEach(cat => {
            cat.addEventListener('click', () => {
                const catName = cat.getAttribute('data-nome')
                const description = descriptions[catName]
                descriptionDiv.innerHTML = `<p>${description}</p>`
            })
        })
    })
})