import GithubUserResponse from "./interfaces/github-user-response"
import GithubRepoResponse from "./interfaces/github-repo-response"

const users: GithubUserResponse[] = []

async function fetchUser(username: string) {
    let response = await fetch(`https://api.github.com/users/${username}`)
    let user: GithubUserResponse = await response.json()
    if (user.message) {
        console.log(`Usuário ${username} não encontrado.`)
    } else {
        users.push(user)
        alert(
            `O usuário ${user.login} foi salvo.\n` +
            `\nid: ${user.id}` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`
        )
    }
}

async function showUser(username: string) {
    const user = users.find(user => user.login === username)

    if (typeof user === 'undefined') {
        console.log('Usuário não encontrado')
    } else {
        const response = await fetch(user.repos_url)
        const repos: GithubRepoResponse[] = await response.json()
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}\n`

        repos.forEach(repo => {
            message += `\nNome do repositório: ${repo.name}` +
                `\nDescrição: ${repo.description}` +
                `\nEstrelas: ${repo.stargazers_count}` +
                `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`
        })
        console.log(message)
        alert(message)

    }
}

function showAllUsers() {
    let message = ''
    users.forEach((currentUser, index) => {
        message += `${index + 1} - ${currentUser.name}` +
            `\nid: ${currentUser.id}` +
            `\nlogin: ${currentUser.login}` +
            `\nbio: ${currentUser.bio}` +
            `\nrepositórios públicos: ${currentUser.public_repos}\n`
    })
    console.log(message)
}

function showTotalOfRepositories() {
    let totalOfRepositories = users.reduce((accumulator, user) => accumulator + user.public_repos, 0)

    console.log(`Número total de repositórios entre os usuários informados: ${totalOfRepositories}`)
}

function showTop5UsersWithMoreRepos() {
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0, 5)
    let message = 'Top 5 usuários com mais repositórios públicos:\n'
    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`
    })

    alert(message)
}

async function main() {
    await fetchUser('pedrohlucena')
    await fetchUser('fulviocoelho')
    await fetchUser('rafaelportomoura')
    await fetchUser('vinniciusgomes')
    await fetchUser('mateusfv')
    await fetchUser('isaacpontes')

    await showUser('pedrohlucena')
    await showUser('fulviocoelho')

    showAllUsers()
    showTotalOfRepositories()
    showTop5UsersWithMoreRepos()
}

main()