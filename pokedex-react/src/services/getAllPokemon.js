export default async function getAllPokemon(url) {
    return new Promise((res, rej) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                res(data);
            })
    })
}