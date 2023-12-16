
const useWordCount = (str: string) => {
    let wordLen = str.trim() !== '' ? str.split(' ').filter((item) => item !== '').length : [].length;
    return wordLen;
}

export default useWordCount