<template>
  <div id="map-container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'Map',
  async mounted () {
    if ('geolocation' in navigator) {
      this.isGeolocationSupported = true

      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          this.isGeolocationEnabled = true
        } else {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              this.isGeolocationEnabled = true
            } else {
              this.isGeolocationEnabled = false
            }
          }
        }
      })
    }

    const AMap = await AMapLoader.load({
      key: '7b8cac9869020053334cc19a60356116',
      version: '2.0',
      resizeEnable: true,
      plugins: ['AMap.TileLayer',
        'AMap.ToolBar', // 工具条
        'AMap.Scale', // 比例尺
        'AMap.Geolocation' // 定位
      ]
    })

    const center = [116.397428, 39.90923]
    const zoom = 5

    const map = new AMap.Map('map-container', { // 设置地图容器id
      center: center,
      zoom: zoom
    })

    const tileLayer = new AMap.TileLayer({
      zooms: [1, 9],
      getTileUrl: (x, y, z) => {
        return `http://localhost:8080/out/${z}/${x}/${y}.png`
      }
    })
    map.add(tileLayer, 0)

    if (navigator.geolocation) {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 30000,
        buttonOffset: new AMap.Pixel(10, 10),
        zoomToAccuracy: true,
        buttonPosition: 'RB'
      })
      console.log('geolocation', geolocation)
      geolocation.getCurrentPosition()

      AMap.Event.addListener(geolocation, 'complete', function (data) {
        const marker = new AMap.Marker({
          position: [data.position.lng, data.position.lat],
          title: 'Your Location'
        })

        marker.setMap(map)

        const infoWindow = new AMap.InfoWindow({
          content: '<h1>Your Location</h1>',
          offset: new AMap.Pixel(0, -30)
        })

        marker.on('click', function () {
          infoWindow.open(map, marker.getPosition())
        })
      })

      AMap.Event.addListener(geolocation, 'error', function (data) {
        console.error('An error occurred while getting your location:', data)
      })
    } else {

    }
    const toolBar = new AMap.ToolBar()
    map.addControl(toolBar)

    const scale = new AMap.Scale()
    map.addControl(scale)

    const marker = new AMap.Marker({
      position: center,
      title: 'Hello, AMap!'
    })

    marker.setMap(map)

    // eslint-disable-next-line no-unused-vars
    const infoWindow = new AMap.InfoWindow({
      content: '<h1>Hello, AMap!</h1>',
      offset: new AMap.Pixel(0, -30)
    })

    AMap.Event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker.getPosition())
    })
  },
  data: function () {
    return {
      isGeolocationSupported: false,
      isGeolocationEnabled: false
    }
  }
}
</script>

<style>
#map-container {
  width: 100%;
  height: 100%;
}
</style>
