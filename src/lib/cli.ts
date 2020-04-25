import { Command } from 'commander'

const program = new Command()
program.version('1.0.0')


program
  .option('-n, --number <number>', 'number of random words to search', parseInt)
  .option('-w, --word <word>', 'search for a specific word')

program.parse(process.argv)

export default program;