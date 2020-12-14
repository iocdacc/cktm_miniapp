import React, { useState, useEffect } from 'react'
import { View, Map, Image, CoverView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Api from '../../api'
import './index.css'
import nopic from '../../../public/pic/nopic.png'
import sign from '../../../public/pic/sign.png'

let Index = props => {
  let [latitude, setlatitude] = useState(28.051213)
  let [longitude, setlongitude] = useState(113.076138)
  let [mapheight, setmapheight] = useState(null)
  let [scale, setscale] = useState(15)
  let [boxshow, setboxshow] = useState(false)
  let [markers, setmarkers] = useState([])
  let [name, setname] = useState('加载中...')
  let [phoneNumber, setphoneNumber] = useState('加载中...')
  let [details, setdetails] = useState('加载中...')
  let [img, setimg] = useState(nopic)
  let [mapCtx] = useState(Taro.createMapContext('map'))

  useEffect(() => {

    // 计算并设置屏幕高度
    Taro.getSystemInfo({
      success: res=>setmapheight(res.windowHeight)
    })

    // 请求坐标点并渲染到地图上
    Api.selectById(latitude, longitude).then(res=>{
      res.data.FishInfoEntity.forEach((v, k)=>{
        res.data.FishInfoEntity[k].width = 40
        res.data.FishInfoEntity[k].height = 40
        res.data.FishInfoEntity[k].iconPath = sign
        res.data.FishInfoEntity[k].anchor = {x: .5, y: .8}
        res.data.FishInfoEntity[k].title = null
        res.data.FishInfoEntity[k].name = null
      })
      setmarkers(res.data.FishInfoEntity)
    })
  }, [])

  // 标记点点击事件
  // 根据ID获取当前坐标点的详细信息
  function MarkerTap(e) {
    Api.selectSpace(e.detail.markerId).then(res=>{
      setname(res.data.FishInfoEntity.name)
      setphoneNumber(res.data.FishInfoEntity.tel)
      setdetails(res.data.FishInfoEntity.details)
      setimg(res.data.FishInfoEntity.url)
    })
    setboxshow(true)
  }

  // 视野变化事件
  function RegionChange(e) {
    setboxshow(false)
  }

  // 打电话
  function call(phoneNumber){
    phoneNumber && Taro.makePhoneCall({phoneNumber})
  }

  function mapReset(){
    mapCtx.moveToLocation({latitude, longitude})
  }

  return (
    <View>
      {
        mapheight && <Map
          id="map"
          style={`width: 100%; height: ${mapheight - 5 + 'px'};`}
          latitude={latitude}
          longitude={longitude}
          scale={scale}
          onMarkerTap={MarkerTap}
          onRegionChange={RegionChange}
          markers={markers}
          // showScale={showScale}
          // showCompass={showCompass}
        >
          <CoverView>
            <View className="m-reset" onClick={mapReset}>重置位置</View>
          </CoverView>
        </Map>
      }

      <View className={`m-box ${boxshow && 'm-box-tran'}`} id="m-box">
        <View className="img g-box-main">
          <Image style="width: 100%;height: 300rpx;" mode="aspectFill" src={img} />
        </View>
        <View className="title g-box-main">{name}</View>
        <View className="tel g-box-main">联系电话: <View className="phoneNumber" onClick={call.bind(this, phoneNumber)}>{phoneNumber}</View></View>
        <View className="details g-box-main">
          <View className="details-title">介绍</View>
          <View className="details-content">{details}</View>
        </View>
      </View>
    </View>
  )
}

export default Index