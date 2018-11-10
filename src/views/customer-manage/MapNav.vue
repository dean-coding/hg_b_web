<template>
    <div class="home-content">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>个人中心</el-breadcrumb-item>
                <el-breadcrumb-item>地图导航</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key -->
        <div class="crumbs">
            <el-col :span="12">
                 <el-input
                  placeholder="请选择搜索條件"
                  icon="search"
                  v-model="keyword">
                </el-input>

    
            </el-col>
             &nbsp;&nbsp;&nbsp;&nbsp;
             <el-col :span="8">
                 <el-select v-model="mapMode" placeholder="请选择团队">
                  <el-option label="普通街道视图" value="BMAP_NORMAL_MAP"></el-option>
                  <el-option label="透视图像" value="BMAP_PERSPECTIVE_MAP"></el-option>
                  <el-option label="卫星路网混合" value="BMAP_HYBRID_MAP"></el-option>
                  <el-option label="卫星视图" value="BMAP_SATELLITE_MAP"></el-option>
              </el-select>
             </el-col>

      
            
        </div>
        <!-- 自定义主题：http://developer.baidu.com/map/custom/-->
         <baidu-map class="bm-view" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="false" :theme="mytheme" :mapType="mapMode">
           <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
           <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showlocaltionBar="true" :autoLocation="true"></bm-geolocation>
           <bm-panorama></bm-panorama>
           <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
              <bm-label content="hi,I'm fuhw/DeanKano" :labelStyle="{color: 'red', fontSize : '14px'}" :offset="{width: -35, height: 30}"/>
          </bm-marker>
          <bm-view class="bm-view"></bm-view>
         </baidu-map>

  </div>
</template>

<script>
    export default {
      data () {
        return {
          keyword: '',
          location: '上海市',
          mapMode: 'BMAP_NORMAL_MAP',
          center: {lng: 0, lat: 0},
          mytheme: [
              {
                  "elementType": "all",
                  "featureType": "water",
                  "stylers": {
                      "color": "#021019"
                  }
              },
              {
                  "elementType": "geometry.fill",
                  "featureType": "highway",
                  "stylers": {
                      "color": "#000000"
                  }
              },
              {
                  "elementType": "geometry.stroke",
                  "featureType": "highway",
                  "stylers": {
                      "color": "#147a92"
                  }
              },
              {
                  "elementType": "geometry.fill",
                  "featureType": "arterial",
                  "stylers": {
                      "color": "#000000"
                  }
              },
              {
                  "elementType": "geometry.stroke",
                  "featureType": "arterial",
                  "stylers": {
                      "color": "#0b3d51"
                  }
              },
              {
                  "elementType": "geometry",
                  "featureType": "local",
                  "stylers": {
                      "color": "#000000"
                  }
              },
              {
                  "elementType": "all",
                  "featureType": "land",
                  "stylers": {
                      "color": "#08304b"
                  }
              },
              {
                  "elementType": "geometry.fill",
                  "featureType": "railway",
                  "stylers": {
                      "color": "#000000"
                  }
              },
              {
                  "elementType": "geometry.stroke",
                  "featureType": "railway",
                  "stylers": {
                      "color": "#08304b"
                  }
              },
              {
                  "elementType": "geometry",
                  "featureType": "subway",
                  "stylers": {
                      "lightness": -70
                  }
              },
              {
                  "elementType": "geometry.fill",
                  "featureType": "building",
                  "stylers": {
                      "color": "#000000"
                  }
              },
              {
                  "elementType": "labels.text.fill",
                  "featureType": "all",
                  "stylers": {
                      "color": "#857f7f"
                  }
              },
              {
                  "elementType": "labels.text.stroke",
                  "featureType": "all",
                  "stylers": {
                      "color": "#000000"
                  }
              },
              {
                  "elementType": "geometry",
                  "featureType": "building",
                  "stylers": {
                      "color": "#022338"
                  }
              },
              {
                  "elementType": "geometry",
                  "featureType": "green",
                  "stylers": {
                      "color": "#062032"
                  }
              },
              {
                  "elementType": "all",
                  "featureType": "boundary",
                  "stylers": {
                      "color": "#1e1c1c"
                  }
              },
              {
                  "elementType": "all",
                  "featureType": "manmade",
                  "stylers": {
                      "color": "#022338"
                  }
              }
          ]
        }
      },
      methods: {
        handler () {
          this.lng = 116.404
          this.lat = 39.915
        }
      }
    }
</script>

<style>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>


