<template>
  <l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="center"></l-marker>
  </l-map>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
// import 'leaflet.chinesetmsproviders'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      zoom: 5,
      center: [35.8617, 104.1954],
      url: 'http://localhost:8080/5/26/12.png',
      // url: 'file:///D:/sourcecode/MapTilesDownloader_Node/out/5/26/12.png',
      // url: 'file:///path/to/offline/tiles/{z}/{x}/{y}.png',
      // url: './path/to/offline/tiles/{z}/{x}/{y}.png',
      // the url property value is a relative path to the offline map tiles. The ./ at the beginning of the path indicates that the path is relative to the current directory.
      // url: 'https://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
      attribution: 'Offline Map Tiles'
    }
  }
}
</script>

<style>

</style>
