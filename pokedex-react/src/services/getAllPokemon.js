export async function getAllPokemon(url) {
    return new Promise((res, rej) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                res(data);
            });
    });
}

export async function getPokemon(url) {
    return new Promise((res, rej) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                res(data);
            });
    });
}