function generateID() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const stringLength = 8;
    let randomString = '';
    let charCount = 0;
    let numCount = 0;

    for (let i = 0; i < stringLength; i++) {
        if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
            const rnum = Math.floor(Math.random() * 10);
            randomString += rnum;
            numCount += 1;
        } else {
            const rnum = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(rnum,rnum+1);
            charCount += 1;
        }
    }
    return randomString
}

export default generateID