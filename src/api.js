import Taro from '@tarojs/taro'
import config from './config'

export default {
    async selectById(latitude, longitude, dis = 1) {
        let res = await new Promise((r, e)=>{
            Taro.request({
                url: config.getApiUrl().selectById,
                data: {
                    "dis": dis,	       //搜索半径内距离
                    "latitude": latitude,   //纬度
                    "longitude": longitude   //经度
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success(res){
                    res.data.code === 0 ? r(res) : e(res)
                }
            })
        })

        return res
    },
    async selectSpace(id) {
        let res = await new Promise(r=>{
            Taro.request({
                url: config.getApiUrl().selectSpace + '/' + id + '.json',
                data: {
                    "id": id, //id
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success(res){
                    res.data.code === 0 ? r(res) : e(res)
                }
            })
        })

        return res
    }
}