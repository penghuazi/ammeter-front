<template>
<div>
    <div class="row tc">
        <div class="col">
            <div id="outer-box">
                <div id="container">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    vuem: ['ammeter.get_position_all'],
    data() {
        return {
            queryData: {},
            positionList: [],
            icon_db_red:  require('../../../../assets/image/db_red.png') ,
            icon_db: require('../../../../assets/image/db.png')
            
        }
    },
    methods: {
        //获取电表数据列表
        getPositionList: function () {
            //请求api
            this.$m.ammeter.get_position_all(this.queryData).then(response => {
                if (response.code == 10000) {
                    this.positionList = response.data;
                    this.initMap()
                }
            }, response => {
                console.log(response.data);
            })
        },

        initMap: function () {
            let _this = this;
            //创建地图
            var map = new AMap.Map('container', {
                zoom: 8
            });

            AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {

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
            AMap.plugin(['AMap.ToolBar'], function () {
                map.addControl(new AMap.ToolBar({
                    map: map
                }));
            });

            AMapUI.loadUI(['misc/MarkerList', 'overlay/SimpleMarker', 'overlay/SimpleInfoWindow'],
                function (MarkerList, SimpleMarker, SimpleInfoWindow) {

                    var markerList = new MarkerList({
                        //关联的map对象
                        map: map,
                        //列表的dom容器的id
                        // listContainer: 'my-list',

                        //返回数据项的Id
                        getDataId: function (dataItem, index) {
                            //index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
                            // return dataItem.id;
                            return index + 1
                        },
                        //返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
                        getPosition: function (dataItem) {
                            return dataItem.position;
                        },
                        //返回数据项对应的Marker
                        getMarker: function (dataItem, context, recycledMarker) {

                            //存在可回收利用的marker
                            if (recycledMarker) {
                                //直接更新内容返回
                                recycledMarker.setIconLabel(context.id);
                                recycledMarker.setIconStyle('red');
                                return recycledMarker;
                            }

                            //返回一个新的Marker
                            return new SimpleMarker({
                                containerClassNames: 'my-marker',
                                iconStyle: 'red',
                                iconStyle: {

                                    src: (dataItem.warningStatus === '1' || dataItem.statusName === '未上电') ? _this.icon_db_red  : _this.icon_db ,
                                    style: {
                                        width: '38px',
                                        height: '38px'
                                    }
                                },
                                //设置基点偏移
                                offset: new AMap.Pixel(-10, -60),
                                //设置节点属性
                                iconLabel: {
                                    //普通文本
                                    // innerHTML: '电',
                                    //设置样式
                                    style: {
                                        color: '#fff',
                                        fontSize: '120%',
                                        marginTop: '2px'
                                    }
                                }
                            });
                        },
                        //返回数据项对应的infoWindow
                        getInfoWindow: function (dataItem, context, recycledInfoWindow) {

                            let title = '<strong>IMEI:' + dataItem.imei + '</strong>';
                            let body = '<p class="my-desc"><strong>状态：' +
                                dataItem.statusName + '</strong><br/>电表名称：' +
                                dataItem.name + '<br/>电表位置：' +
                                dataItem.address + '<br/>备注：' +
                                dataItem.remark + '</p>'

                            if (recycledInfoWindow) {
                                //存在可回收利用的infoWindow, 直接更新内容返回
                                recycledInfoWindow.setInfoTitle(title);

                                recycledInfoWindow.setInfoBody(body);
                                return recycledInfoWindow;
                            }

                            //返回一个新的InfoWindow
                            return new SimpleInfoWindow({
                                offset: new AMap.Pixel(0, -37),
                                infoTitle: title,
                                infoBody: body
                            });
                        },
                        getListElement: function (dataItem, context, recycledListElement) {

                            var tpl = '<button style="background-color:<%= dataItem.iconStyle %>;color:#336699">' +
                                '<%- dataId %></button> <%- dataItem.title %>';

                            var content = MarkerList.utils.template(tpl, {
                                dataItem: dataItem,
                                dataId: context.id
                            });

                            if (recycledListElement) {
                                //存在可回收利用的listElement, 直接更新内容返回
                                recycledListElement.innerHTML = content;
                                return recycledListElement;
                            }

                            //返回一段html，MarkerList将利用此html构建一个新的dom节点
                            // return '<li>' + content + '</li>';
                        }

                    });

                    //构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPosition
                    var data = [{
                        id: '1',
                        position: [120.586626, 31.297032],
                        imei: '标题_1',
                        statusName: '在线',
                        address: '苏州'
                    }, {
                        id: '2',
                        position: [120.625078, 31.320498],
                        imei: '标题_2',
                        statusName: '在线',
                        address: '苏州'
                    }, {
                        id: '3',
                        position: [120.642931, 31.292338],
                        imei: '标题_3',
                        statusName: '在线',
                        address: '苏州'
                    }];

                    //展示该数据
                    markerList.render(_this.positionList);
                });
        }
    },
    ready() {
        this.getPositionList()
    }
}
</script>

<style>
.welcome {
    margin: 100px auto;
}

.eg {
    color: #ccc;
}
</style>
