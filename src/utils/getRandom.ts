
function getRandom(min: number, max: number): number {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * max + 1) + min;
}

export default getRandom;