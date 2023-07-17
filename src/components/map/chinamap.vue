<!-- eslint-disable no-unused-vars -->
<template>
  <div class="main">
      <!-- <div>
          <Card>
                <Split>
                  <template slot="left" class="demo-split-pane">
                    <div>left</div>
                  </template>
                  <template slot="right" class="demo-split-pane">
                    <div>
                      <Divider>详细描述</Divider>
                      <h3>使用注意事项</h3>
                      <span>是否多选：</span><Switch v-model="showMultiple" />
                    </div>
                  </template>
                </Split>
          </Card>
      </div> -->
      <!-- 地图 -->
      <div id="container"></div>
  </div>
</template>

<script>
import icon from '@/assets/images/icon-qr-qq-wechat.png'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
export default {
  name: 'CenterMap',
  // props: {
  //   mapPointList: {
  //     type: Array,
  //     default: null
  //   }
  // },
  data () {
    return {
      showMultiple: true,
      mapPointList: []
    }
  },
  mounted () {
    console.log('components.map.chinamap.vue : mounted')
    this.mapPointList.push({
      point: [39.90923, 116.397428],
      deviceName: '北京',
      deviceCode: '123456',
      address: '1',
      status: '1'
    })
    // 地图初始化
    this.initMap(this.mapPointList)
  },
  methods: {
    // DOM初始化完成进行地图初始化
    initMap (list) {
      // 设置iocn
      // eslint-disable-next-line no-unused-vars
      var myIcon1 = L.icon({
        iconUrl: icon, // 图标
        iconSize: [25, 34], // 大小
        iconAnchor: [12.5, 34] // 偏移量
      })
      const myIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
      // 初始化地图
      var map = new L.Map('container').setView([39.90923, 116.397428], 5)
      console.log('map', map)
      // 瓦片图层
      L.tileLayer('http://localhost:8080/out/{z}/{x}/{y}.png', {
        minZoom: 5, // 最小缩小层级
        maxZoom: 10, // 最大放大层级
        attribution: '<b style="color:#40a9ff">高德地图</b>' // 版权信息
      }).addTo(map)
      // 通过数据标注icon
      if (list.length > 0) {
        list.forEach(v => {
          // 这里是纬度在前 【纬度，经度】
          var marker = L.marker(v.point, {
            icon: myIcon, // icon
            title: 'My Marker',
            alt: 'My Marker'
          }).bindPopup('Hello, world!')
            .addTo(map)
            // Tooltip 工具提示 https://leafletjs.cn/reference.html#tooltip
            .bindTooltip(v.deviceName, {
              permanent: true, // 是永久打开 Tooltip 还是只在鼠标移动时打开。
              direction: 'bottom', // 打开 Tooltip 的方向
              offset: [0, 5], // Tooltip 位置的可选偏移
              opacity: 1, // Tooltip 容器透明度
              autoPlan: true // 跟随缩放变化 好像没有起作用
            })

          marker.on('click', function (e) {
            L.popup({
              offset: [0, -25] // popup 位置的可选偏移
            })
              .setLatLng(v.point)
              .setContent(
                `<p style='text-align:center'>${v.deviceName}</p>
                <p>设备编码：${v.deviceCode}</p>
                <p>设备地址：${v.address}</p>
                <p>设备状态：<span style="background-color:${v.state === 0 ? 'green' : 'red'};color: #fff;
                padding: 2px 4px;">${v.state === 0 ? '在线' : '离线'}</span></p>`
              )
              .openOn(map)
          })
        })
      }
    },
    // 父组件调用 接口更新地图随之更新
    setMapData (list) {
      // 地图初始化
      this.initMap(list)
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
#container {
  padding: 250px;
  margin: 50px;
  width: 100%;
  height: 100%;
}
</style>
