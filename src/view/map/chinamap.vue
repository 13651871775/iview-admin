<template>
  <div class="container">
    <el-amap vid="amapDemo" :zoom="zoom" :center="center">
      <el-amap-marker :key="marker.index1" v-for="marker in markers" :position="marker.position" :icon="marker.icon"></el-amap-marker>
    </el-amap>
  </div>
</template>

<style>
.container {
  width: 200%;
  height: 1000px;
  position: relative;
  left: 0;
  top: 100%;
  transform: translate3d(-50%, -50%, 0);
  border: 1px solid #999;
}

.search-box {
  position: absolute;
  z-index: 5;
  width: 70%;
  left: 13%;
  top: 10px;
  height: 30px;
}

.search-box input {
  float: left;
  width: 59%;
  height: 100%;
  border: 1px solid #30ccc1;
  padding: 0 8px;
  outline: none;
}

.search-box button {
  float: left;
  width: 20%;
  height: 100%;
  background: #30ccc1;
  border: 1px solid #30ccc1;
  color: #fff;
  outline: none;
}

.tip-box {
  width: 100%;
  max-height: 260px;
  position: absolute;
  top: 30px;
  overflow-y: auto;
  background-color: #fff;
}
</style>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap'

let amapManager = new AMapManager()
export default {
  data () {
    let self = this
    return {
      address: null,
      searchKey: '',
      amapManager,
      zoom: 13,
      center: [116.397428, 39.90923],
      markers: [
        {
          index1: 0,
          position: [116.397428, 39.90923],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png'
        },
        {
          index1: 1,
          position: [116.407428, 39.91923],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
        }
      ],
      searchOption: {
        city: '全国',
        citylimit: true
      },
      lng: 0,
      lat: 0,
      loaded: false,
      markerEvent: {
        click (e) {
          console.log(e)
        }
      },
      events: {
        init () {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch()
          })
        },
        // 点击获取地址的数据
        click (e) {
          self.markers = []
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          self.center = [lng, lat]
          self.markers.push([lng, lat])
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                console.log(result.regeocode.formattedAddress)
                self.address = result.regeocode.formattedAddress
                self.searchKey = result.regeocode.formattedAddress
                self.$nextTick()
              }
            }
          })
        }
      },
      // 一些工具插件
      plugin: [
        {
          // 定位
          pName: 'Geolocation',
          events: {
            init (o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  // 设置经度
                  self.lng = result.position.lng
                  // 设置维度
                  self.lat = result.position.lat
                  // 设置坐标
                  self.center = [self.lng, self.lat]
                  self.markers.push([self.lng, self.lat])
                  // load
                  self.loaded = true
                  // 页面渲染好后
                  self.$nextTick()
                }
              })
            },
            click (e) {
              console.log(e)
            }
          }
        },
        {
          // 工具栏
          pName: 'ToolBar',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          // 鹰眼
          pName: 'OverView',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          // 地图类型
          pName: 'MapType',
          defaultType: 0,
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          // 搜索
          pName: 'PlaceSearch',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        }
      ]
    }
  },
  methods: {
    submitAddress () {
      consoel.log('经纬度', this.center)
      consoel.log('地址', this.address)
    },
    initSearch () {
      let vm = this
      let map = this.amapManager.getMap()
      AMapUI.loadUI(['misc/PoiPicker'], function (PoiPicker) {
        var poiPicker = new PoiPicker({
          input: 'search',
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: 'searchTip',
          searchResultsContainer: 'searchTip'
        })
        vm.poiPicker = poiPicker
        // 监听poi选中信息
        poiPicker.on('poiPicked', function (poiResult) {
          // console.log(poiResult)
          let source = poiResult.source
          let poi = poiResult.item
          if (source !== 'search') {
            poiPicker.searchByKeyword(poi.name)
          } else {
            poiPicker.clearSearchResults()
            vm.markers = []
            let lng = poi.location.lng
            let lat = poi.location.lat
            let address = poi.cityname + poi.adname + poi.name
            vm.center = [lng, lat]
            console.log(vm.center)
            vm.markers.push([lng, lat])
            vm.lng = lng
            vm.lat = lat
            vm.address = address
            vm.searchKey = address
          }
        })
      })
    },
    searchByHand () {
      if (this.searchKey !== '') {
        this.poiPicker.searchByKeyword(this.searchKey)
      }
    }
  }
}
</script>
