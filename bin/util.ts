export const seperateStrLineByLine = (text: string) => {
    text = text.trim();
    const result: string[] = [];
    let i =0;
    let j = 0;
    while ((j = text.indexOf("\n", i)) !== -1) {
        result.push(text.substring(i, j));
        i = j + 1;
    }
    result.push(text.substring(i));
    return result;
}

export const isPositiveInt = (checkNumber: number) => {
    return Number.isInteger(checkNumber) && checkNumber > 0;
}