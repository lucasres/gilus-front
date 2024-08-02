import axios from "axios";

export default class ExecutionService {
    /**
     * recupera todas as crons cadastradas
     * @returns {Promise<Array>}
     */
    async getCrons() {
        const response = await axios.get("http://localhost:8000/crons")
        return response.data
    }

    /**
     * recupera todas as execuções de uma cron
     * @param {string} name
     * @returns {Promise<Array>}
     */
    async getPingsByCron(name) {
        const consolidated = {}

        const response = await axios.get(`http://localhost:8000/crons/${name}/pings`)

        const sorted = response.data.sort((a, b) => (a - b))

        for (const ping of response.data) {
            if (consolidated[ping.pingAt] === undefined) {
                consolidated[ping.pingAt] = {
                    pingAt: ping.pingAt,
                    value: 0
                }
            }

            consolidated[ping.pingAt].value += 1
        }

        const sortedPings = Object.values(consolidated).sort((a, b) => new Date(a.pingAt) - new Date(b.pingAt));

        return sortedPings
    }
}