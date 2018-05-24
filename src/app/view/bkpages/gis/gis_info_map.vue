<template>
    <div>
      <div class="row tc">
          <div class="col">
              <div id="container"></div>
          </div>
      </div>
    </div>
</template>
<script>
  export default {
    vuem:['ammeter.get_position_info'],
    data(){
      return{
        id:'',
        gis:{
          imei: '',
          address: '',
          amapLatitude: '',
          amapLongitude: '',
          status: ''
        }
      }
    },
    methods:{
        initMap: function(){
          let _this = this
          //初始化地图对象，加载地图
          var map = new AMap.Map("container", {
              resizeEnable: true,
              center: [_this.gis.amapLongitude,_this.gis.amapLatitude],//地图中心点
              zoom: 13 //地图显示的缩放级别
          });

          AMapUI.loadUI(['overlay/AwesomeMarker','overlay/SimpleInfoWindow'],function(AwesomeMarker,SimpleInfoWindow) {
              var marker =new AwesomeMarker({
              // awesomeIcon: 'assistive-listening-systems',

              iconStyle: 'red',
              iconStyle: {

                  src: './db.png',
                  style: {
                      width: '38px',
                      height: '38px'
                  }
              },

              // iconLabel: {
              //     style: {
              //         color: '#c7e9c0', //字体颜色
              //         fontSize: 16 + 'px' //字号
              //     }
              // },
              // //图标
              // iconStyle: 'red',
              map: map,
              position: [_this.gis.amapLongitude, _this.gis.amapLatitude]
            })

            var infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>IMEI:'+_this.gis.imei+'</strong>',
              infoBody: '<p class="my-desc"><strong>状态：'+_this.gis.status
              +'</strong> <br/> 高德地图经度：' +_this.gis.amapLongitude+
                  '<br/> 高德地图纬度：'+_this.gis.amapLatitude+'<br/>地址：<strong>'+_this.gis.address+'</strong>'
                  +'</p>',

              //基点指向marker的头部位置
              offset: new AMap.Pixel(0, -31)
            });

            function openInfoWin() {
              infoWindow.open(map, marker.getPosition());
            }

            //marker 点击时打开
            AMap.event.addListener(marker, 'click', function() {
                openInfoWin();
            });

            // openInfoWin();

          });

          AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {

            //缩放控件，显示Zoom值
            map.addControl(new BasicControl.Zoom({
                position: 'lb',
                showZoomNum: true
            }));

            //图层切换控件
            map.addControl(new BasicControl.LayerSwitcher({
                position: 'rt'
            }));
          });

          AMap.plugin(['AMap.ToolBar'], function() {
            map.addControl(new AMap.ToolBar({
                map: map
            }));
          });
        },
        getPositionInfo:function(id){
          this.$m.ammeter.get_position_info({positionId:id,sn:'position'}).then(res => {
            if (res.code === 10000) {
              this.gis.imei = res.data.imei
              this.gis.address = res.data.address
              this.gis.amapLatitude = res.data.amapLatitude
              this.gis.amapLongitude = res.data.amapLongitude
              this.gis.status = res.data.statusName
              this.initMap()
            }
          })
        }
    },
    ready(){
      this.id = this.$route.query.id
      this.getPositionInfo(this.id)
    }
  }
</script>
<style>
    #container{
        margin: 62px 20px;
    }
    .eg{
        color: #ccc;
    }
</style>
