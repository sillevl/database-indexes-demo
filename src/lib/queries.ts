import { Connection, Pool } from "promise-mysql"

export async function getAllWords(connection: Pool, numberOfWords: number) {
    const wordList: string[] = []
    const query = `SELECT word FROM entries ORDER BY RAND() LIMIT ${numberOfWords}`
    const allWords = await connection.query(query)
    allWords.forEach( (row: any) => {
        wordList.push(row.word)
    });
    return wordList;
}

export async function findWord(connection: Pool, word: string) {
    await connection.query(`SELECT * FROM entries WHERE word="${word}"`)
}

export async function findIndexedWord(connection: Pool, word: string) {
    await connection.query(`SELECT * FROM entries WHERE word_indexed="${word}"`)
}

export async function findWords(connection: Pool, words: string[], progressBar: any) {
    let index = 0
    for( const word of words ) {
        await findWord(connection, word)
        progressBar.update(++index)
    }
}

export async function findIndexedWords(connection: Pool, words: string[], progressBar: any) {
    let index = 0
    for (const word in words) {
        await findIndexedWord(connection, word)
        progressBar.update(++index)
    }
}
