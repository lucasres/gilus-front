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
}