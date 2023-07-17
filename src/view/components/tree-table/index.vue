<template>
    <div class="content-inner">
      <Card>
            <Split v-model="split1">
                <div slot="left" class="demo-split-pane">
                    <!-- <bingo-tree width="50%" :data="data"
                                title="name"
                                keyId="id"
                                parentValue="parentId"
                                draggable
                                :multiple="showMultiple"
                                :showCheckbox="showMultiple"
                                :editNodeBefore="editNodeBefore"
                                @edit-node="editNode"
                                :deleteNodeBefore="deleteNodeBefore"
                                @delete-node="deleteNode"
                                :onDragBefore="onDragBefore"
                                @on-drag="onDrag">
                        <template #topItem="datas">
                            <DropdownItem name="own" @click.native="ownClick" v-if="!datas.nodeInfo.disabledOwn">
                                <Icon type="md-create" style="margin-right: 10px" size="16"></Icon>自定义(上)
                            </DropdownItem>
                        </template>
                        <template #bottomItem="datas">
                            <DropdownItem name="own" @click.native="ownClick" v-if="!datas.nodeInfo.disabledOwn">
                                <Icon type="md-create" style="margin-right: 10px" size="16"></Icon>自定义(下)
                            </DropdownItem>
                        </template>
                    </bingo-tree> -->
                    <!-- <wj-flex-grid :items-source="data1"></wj-flex-grid> -->
                  <div class="tree-container">
                    <div class="row">
                      <div id="theTree"></div>
                      <div id="theTree2"></div>
                    </div>
                  </div>
                </div>
                <div slot="right" class="demo-split-pane">
                  <!--  <Divider>详细描述</Divider>
                    <h3>使用注意事项</h3>
                    <span>是否多选：</span><Switch v-model="showMultiple" />   -->
                    <center-map></center-map>
                </div>
            </Split>
      </Card>
    </div>
</template>
<script>
// import bingoTree from '@/components/tree/component/index.vue'
// import '@grapecity/wijmo.vue2.grid'
import * as wjNav from '@grapecity/wijmo.nav'
import '@grapecity/wijmo.styles/wijmo.css'
import CenterMap from '@/components/map/chinamap.vue'

export default {
  name: 'bingo-tree-demo',
  components: {
    CenterMap
    // bingoTree
  },
  data () {
    return {
      split1: 0.2,
      showMultiple: true, // 是否多选
      data: [
        {
          name: 'parent 1',
          expand: true,
          id: 0,
          selected: true,
          checked: false,
          children: [
            {
              name: 'parent 1-1',
              expand: true,
              id: 1,
              parentId: 0,
              selected: false,
              checked: false,
              children: [
                {
                  name: '拖拽1-不可拖拽',
                  expand: true,
                  id: 3,
                  selected: false,
                  checked: false,
                  disabledDrag: true,
                  parentId: 1
                },
                {
                  name: '拖拽2-不显示右键',
                  expand: true,
                  id: 4,
                  selected: false,
                  checked: false,
                  parentId: 1,
                  disabledAll: true
                }
              ]
            },
            {
              name: 'parent 1-2',
              expand: true,
              id: 2,
              disabledDelete: true,
              disabledAdd: true,
              parentId: 0,
              selected: false,
              checked: false,
              children: [
                {
                  name: '拖拽3-不可以拖拽到我身上',
                  expand: true,
                  id: 5,
                  selected: false,
                  checked: false,
                  parentId: 2
                },
                {
                  name: '拖拽4-不显示默认按钮',
                  expand: true,
                  id: 6,
                  selected: false,
                  checked: false,
                  parentId: 2,
                  disabledEdit: true,
                  disabledDelete: true,
                  disabledAdd: true
                },
                {
                  name: '拖拽5-已废弃',
                  expand: true,
                  id: 7,
                  selected: false,
                  checked: false,
                  parentId: 2,
                  tagColor: 'red'
                },
                {
                  name: '拖拽6-不显示自定义',
                  expand: true,
                  id: 8,
                  selected: false,
                  checked: false,
                  parentId: 2,
                  disabledOwn: true
                }
              ]
            },
            {
              name: 'parent 1-3',
              expand: true,
              id: 10,
              parentId: 0,
              selected: false,
              checked: false,
              children: [
                {
                  name: '拖拽7',
                  expand: true,
                  id: 11,
                  selected: false,
                  checked: false,
                  parentId: 10
                },
                {
                  name: '拖拽8-不可选中',
                  expand: true,
                  id: 12,
                  disabled: true,
                  selected: false,
                  checked: false,
                  parentId: 10
                },
                {
                  name: '拖拽9-不可删除',
                  expand: true,
                  id: 13,
                  selected: false,
                  checked: false,
                  parentId: 10
                },
                {
                  name: '拖拽10-不可编辑',
                  expand: true,
                  id: 14,
                  selected: false,
                  checked: false,
                  parentId: 10
                }
              ]
            }
          ]
        }
      ],
      data2: [
        {
          id: 1,
          header: 'Node 1',
          img: 'https://via.placeholder.com/16x16',
          items: [
            {
              id: 2,
              header: 'Node 1.1',
              img: 'https://via.placeholder.com/16x16',
              items: [
                {
                  id: 3,
                  header: 'Node 1.1.1',
                  img: 'https://via.placeholder.com/16x16',
                  items: []
                },
                {
                  id: 4,
                  header: 'Node 1.1.2',
                  img: 'https://via.placeholder.com/16x16',
                  items: []
                }
              ]
            },
            {
              id: 5,
              header: 'Node 1.2',
              img: 'https://via.placeholder.com/16x16',
              items: []
            }
          ]
        },
        {
          id: 6,
          header: 'Node 2',
          img: 'https://via.placeholder.com/16x16',
          items: []
        }
      ],
      // items1: [
      //   {
      //     header: 'Item 1',
      //     items: [
      //       { header: 'Item 1-1' },
      //       { header: 'Item 1-2' }
      //     ]
      //   },
      //   {
      //     header: 'Item 2',
      //     items: [
      //       { header: 'Item 2-1' },
      //       { header: 'Item 2-2' }
      //     ]
      //   }
      // ],
      items1: [
        {
          id: 1,
          header: 'Node 1',
          img: 'https://via.placeholder.com/16x16',
          items: [
            {
              id: 2,
              header: 'Node 1.1',
              img: 'https://via.placeholder.com/16x16',
              items: [
                {
                  id: 3,
                  header: 'Node 1.1.1',
                  img: 'https://via.placeholder.com/16x16',
                  items: []
                },
                {
                  id: 4,
                  header: 'Node 1.1.2',
                  img: 'https://via.placeholder.com/16x16',
                  items: []
                }
              ]
            },
            {
              id: 5,
              header: 'Node 1.2',
              img: 'https://via.placeholder.com/16x16',
              items: []
            }
          ]
        },
        {
          id: 6,
          header: 'Node 2',
          img: 'https://via.placeholder.com/16x16',
          items: []
        }
      ],
      items2: [
        {
          id: 1,
          header: 'Node 1',
          img: 'https://via.placeholder.com/16x16',
          items: [
            {
              id: 2,
              header: 'Node 1.1',
              img: 'https://via.placeholder.com/16x16',
              items: [
                {
                  id: 3,
                  header: 'Node 1.1.1',
                  img: 'https://via.placeholder.com/16x16',
                  items: []
                },
                {
                  id: 4,
                  header: 'Node 1.1.2',
                  img: 'https://via.placeholder.com/16x16',
                  items: []
                }
              ]
            },
            {
              id: 5,
              header: 'Node 1.2',
              img: 'https://via.placeholder.com/16x16',
              items: []
            }
          ]
        },
        {
          id: 6,
          header: 'Node 2',
          img: 'https://via.placeholder.com/16x16',
          items: []
        }
      ],
      data1: [
      ]
    }
  },
  computed: {},
  created () {
    console.log('wjNav:', wjNav)
    // this.data1 = this.getData()
    console.log('this.data1', this.data1)
  },
  mounted () {
    // create the tree
    // eslint-disable-next-line no-unused-vars
    var imgUrl = 'https://demos.wijmo.com/5/PureJS/TreeViewIntro/TreeViewIntro/resources/'
    var tree = new wjNav.TreeView('#theTree', {
      itemsSource: this.getData(),
      displayMemberPath: 'header',
      childItemsPath: 'items',
      showCheckboxes: true,
      imageMemberPath: 'img',
      allowDragging: true,
      dragOver: this.dragOverBetweenTrees
    })
    // eslint-disable-next-line no-unused-vars
    var tree2 = new wjNav.TreeView('#theTree2', {
      itemsSource: [
        { header: 'Electronics',
          img: imgUrl + 'electronics.png',
          items: [
            { header: 'Trimmers/Shavers' },
            { header: 'Tablets' },
            { header: 'Phones',
              img: imgUrl + 'phones.png',
              items: [
                { header: 'Apple' },
                { header: 'Motorola', newItem: true },
                { header: 'Nokia' },
                { header: 'Samsung' }]
            },
            { header: 'Speakers', newItem: true },
            { header: 'Monitors' }]
        },
        { header: 'Toys',
          img: imgUrl + '/toys.png',
          items: [
            { header: 'Shopkins' },
            { header: 'Train Sets' },
            { header: 'Science Kit', newItem: true },
            { header: 'Play-Doh' },
            { header: 'Crayola' } ]
        },
        { header: 'Home',
          img: imgUrl + 'home.png',
          items: [
            { header: 'Coffeee Maker' },
            { header: 'Breadmaker', newItem: true },
            { header: 'Solar Panel', newItem: true },
            { header: 'Work Table' },
            { header: 'Propane Grill' }]
        }
      ],
      displayMemberPath: 'header',
      childItemsPath: 'items',
      showCheckboxes: true,
      imageMemberPath: 'img',
      allowDragging: true,
      dragOver: this.dragOverBetweenTrees
    })
    console.log('tree', tree)
    console.log('tree2', tree2)
  },
  methods: {
    // 自定义按钮
    ownClick () {
      this.$Message.success('自定义按钮')
    },
    // 编辑前的方法 data1(全部数据) data2(编辑的数据) name(编辑后的内容) callback(确认编辑的回调)
    editNodeBefore (data1, data2, name, callback) {
      if (data2.id === 14) {
        this.$Message.warning(data2.name)
      } else {
        callback()
      }
    },
    // 编辑后的方法
    editNode (allData, oldData, newData) {
      this.$Message.success('编辑成功刷新页面！')
    },
    // 删除前的回调 data1(全部数据) data2(删除的数据) callback(确认删除的回调) callback不支持使用在异步请求里
    deleteNodeBefore (data1, data2, callback) {
      if (data2.node.id === 13) {
        this.$Message.warning(data2.node.name)
      } else {
        callback()
      }
    },
    // 删除成功后的方法
    deleteNode (allData, delData) {
      this.$Message.success('删除成功刷新页面！')
    },
    // 拖拽前的操作 allData(所有节点) data1(拖拽的节点) data2(拖拽到目标的节点) callback(拖拽成功后的回调)
    onDragBefore (allData, data1, data2, callback) {
      if (data2.id === 5) {
        this.$Message.warning(data2.name)
      } else {
        callback()
      }
    },
    // 拖拽成功后的方法
    onDrag (allData, dragData) {
      this.$Message.success('拖拽成功刷新页面！')
    },
    getData () {
      var imgUrl = 'https://demos.wijmo.com/5/PureJS/TreeViewIntro/TreeViewIntro/resources/'
      return [
        { header: 'Electronics',
          img: imgUrl + 'electronics.png',
          items: [
            { header: 'Trimmers/Shavers' },
            { header: 'Tablets' },
            { header: 'Phones',
              img: imgUrl + 'phones.png',
              items: [
                { header: 'Apple' },
                { header: 'Motorola', newItem: true },
                { header: 'Nokia' },
                { header: 'Samsung' }]
            },
            { header: 'Speakers', newItem: true },
            { header: 'Monitors' }
          ]
        },
        { header: 'Toys',
          img: imgUrl + '/toys.png',
          items: [
            { header: 'Shopkins' },
            { header: 'Train Sets' },
            { header: 'Science Kit', newItem: true },
            { header: 'Play-Doh' },
            { header: 'Crayola' } ]
        },
        { header: 'Home',
          img: imgUrl + 'home.png',
          items: [
            { header: 'Coffeee Maker' },
            { header: 'Breadmaker', newItem: true },
            { header: 'Solar Panel', newItem: true },
            { header: 'Work Table' },
            { header: 'Propane Grill' }]
        }
      ]
    },
    // 以下函数用于标签 wj-tree-view
    lazyLoadFunction (node) {
      // Load child nodes for the specified node
    },
    nodeEditEnding (node) {
      // Handle node editing before it ends
    },
    nodeEditEnded (node) {
      // Handle node editing after it ends
    },
    nodeDropping (sourceNode, targetNode, position) {
      // Handle node dragging and dropping
    },
    nodeDropped (sourceNode, targetNode, position) {
      // Handle node dragging and dropping
    },
    nodeChecked (node) {
      // Handle node checkbox being checked
    },
    nodeUnchecked (node) {
      // Handle node checkbox being unchecked
    },
    nodeExpanded (node) {
      // Handle node being expanded
    },
    nodeCollapsed (node) {
      // Handle node being collapsed
    },
    nodeClicked (node) {
      // Handle node being clicked
    },
    nodeDoubleClicked (node) {
      // Handle node being double-clicked
    },
    nodeSelected (node) {
      // Handle node being selected
    },
    nodeUnselected (node) {
      // Handle node being unselected
    },
    formatItem (args) {
      // Format the display text for the specified node
    },
    // handle drag-drop within or between trees
    dragOverBetweenTrees (s, e) {
      var t1 = e.dragSource.treeView
      var t2 = e.dropTarget.treeView

      // prevent dragging within trees
      if (t1 === t2) {
        e.cancel = true
      }

      // allow dragging between trees
      if (t1 !== t2) {
        e.cancel = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
    .demo-split-pane {
        width: 100%;
        height: 100%;
        button {
            margin-left: 20px;
        }
    }
    .wj-treeview {
        height: 250px;
        font-size: 120%;
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 3px;
        background: #f0f0f0;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    body
    {
        margin-bottom: 24pt;
    }
    .tree-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20px;
    }

    // .row {
    //   display: flex;
    //   flex-direction: row;
    //   justify-content: center;
    //   align-items: center;
    // }

    // .col-xs-6 {
    //   flex: 1;
    //   margin: 10px;
    // }

    // .short-tree {
    //   height: 300px;
    //   border: 1px solid #ccc;
    // }
</style>
