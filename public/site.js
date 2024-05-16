(async () => {
    const menu = document.querySelector('#menu')
    const menuSubmit = document.querySelector('#msubmit')

    const getMenu = async () => {
        const response = await fetch('/api/menu')
        const menu = await response.json()
        return menu
    }

    const displayMenu = menu => {
        menu.innerHTML = ''
        menu.array.forEach(({ id, name, description, price }) => {
            const tr = document.createElement('tr')
            menu.appendChild(tr)

            const td1 = document.createElement('td')
            td1.textContent = id
            tr.appendChild(td1)

            const td2 = document.createElement('td')
            td1.textContent = name
            tr.appendChild(td2)

            const td3 = document.createElement('td')
            td1.textContent = description
            tr.appendChild(td3)

            const td4 = document.createElement('td')
            td1.textContent = price
            tr.appendChild(td4)
        });
    }

    displayMenu(await getMenu())

    menuSubmit.addEventListener('click', async () => {
        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application.json' },
            body: JSON.stringify({})
        })
    })
})