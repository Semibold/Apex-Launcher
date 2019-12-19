export function shuffleArray<T>(array: T[], copy?: boolean): T[] {
    let len = array.length;
    let prime = copy ? array.slice() : array;
    while (len) {
        const randomIndex = Math.floor(Math.random() * len);
        const buffer = prime[--len];
        prime[len] = prime[randomIndex];
        prime[randomIndex] = buffer;
    }
    return prime;
}
