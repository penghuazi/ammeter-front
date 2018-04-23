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
        position:{}
      }
    },
    methods:{
        initMap: function(){
          //初始化地图对象，加载地图
          var map = new AMap.Map("container", {
              resizeEnable: true,
              center: [120.618898,31.304659],//地图中心点
              zoom: 13 //地图显示的缩放级别
          });

          AMapUI.loadUI(['overlay/AwesomeMarker','overlay/SimpleInfoWindow'],function(AwesomeMarker,SimpleInfoWindow) {
              var marker =new AwesomeMarker({
              awesomeIcon: 'assistive-listening-systems',
              iconLabel: {
                  style: {
                      color: '#c7e9c0', //字体颜色
                      fontSize: 16 + 'px' //字号
                  }
              },
              //图标
              iconStyle: 'black',
              map: map,
              position: [120.593149,31.316099]
            })

            var infoWindow = new SimpleInfoWindow({
              infoTitle: '<strong>这里是标题</strong>',
              infoBody: '<p class="my-desc"><strong>这里是内容。</strong> <br/> 高德地图 JavaScript API，是由 JavaScript 语言编写的应用程序接口，' +
                  '它能够帮助您在网站或移动端中构建功能丰富、交互性强的地图应用程序</p>',

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
            if (res.code==10000) {
              this.position= res.data
            }
          })
        }
    },
    ready(){
      this.id = this.$route.query.id
      this.getPositionInfo(this.id)
      this.initMap()  
    }
  }
</script>
<style>
    .welcome{
        margin: 100px auto;
    }
    .eg{
        color: #ccc;
    }
</style>
