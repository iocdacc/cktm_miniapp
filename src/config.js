export default {
    baseUrl: 'http://192.168.1.101:8000/api/',
    getApiUrl(){
        return {
            selectById: this.baseUrl + 'selectById.json',
            selectSpace: this.baseUrl + 'selectSpace',
        }
    }
}