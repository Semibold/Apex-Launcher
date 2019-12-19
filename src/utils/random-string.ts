export function randomString(len: number): string {
    const charPool = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    const totalLength = charPool.length;
    const buffer = [];
    for (let i = 0; i < len; i++) {
        const r = Math.floor(Math.random() * totalLength);
        buffer.push(charPool[r]);
    }
    return buffer.join("");
}
