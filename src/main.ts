import { getAllWords, findWords, findIndexedWords } from './lib/queries'
import mysql, { PoolConfig } from 'promise-mysql';
import progressbars, { statistics, printStatistics } from './lib/progressBar'
import cli from './lib/cli'

const connectionOptions: PoolConfig = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dictionary'
};

const numberOfWords: number = cli.number || 100;
const searchWord: string = cli.word;

(async function() {
    console.log('Connecting to MySQL/MariaDB')
    const connection = await mysql.createPool(connectionOptions)

    let words: string[] = [];
    if(searchWord) {
        console.log('Using given word')
        for( let i = 0; i < numberOfWords; i++) {
            words.push(searchWord);
            i++
        }
    } else {
        console.log(`Picking ${numberOfWords} random words`)
        words = await getAllWords(connection, numberOfWords)
    }

    console.log(words)

    // draw progressbars in console
    const normalBar = progressbars.create(words.length, 0, '')
    const indexedBar = progressbars.create(words.length, 0, '')

    // run all queries, normal and indexed at the same time
    await Promise.all( [
        findWords(connection, words, normalBar),
        findIndexedWords(connection, words, indexedBar)
    ])
    progressbars.stop()
    normalBar.stop()
    indexedBar.stop()

    // show statistics
    const normalStats = statistics(normalBar)
    const indexedStats = statistics(indexedBar)

    console.log(printStatistics(normalStats))
    console.log(printStatistics(indexedStats))

    const relative = normalStats.elapsedTime / indexedStats.elapsedTime
    console.log(`Indexed search is ${ relative.toFixed(2) } times faster than normal`)

    connection.end();
})();

