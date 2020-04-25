import cliProgress, { MultiBar, SingleBar } from 'cli-progress'

const progressbars: MultiBar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    // format: '[{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | {duration_formatted}'
 
}, cliProgress.Presets.shades_classic)

export function statistics(progressBar: SingleBar) {
    const count = progressBar.getTotal()
    const startTime = parseInt((progressBar as any).startTime)
    const endTime = (progressBar as any).eta.timeBuffer.slice(-1)[0] 
    const elapsedTime = endTime - startTime
    const frequency = count / elapsedTime * 1000

    return {
        count, startTime, endTime, elapsedTime, frequency
    }
}

export function printStatistics(statistics: any) {
    const { count, elapsedTime, frequency } = statistics
    return `Processed ${count} queries in ${elapsedTime / 1000} seconds (${frequency.toFixed(2)}/second)`
}

export default progressbars