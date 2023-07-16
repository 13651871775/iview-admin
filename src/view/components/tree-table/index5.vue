<template>
  <div class="split-pane-page-wrapper">
    <split-pane v-model="offset" @on-moving="handleMoving">
      <div slot="right" class="pane right-pane">
        <!-- using split-pane to split from top to bottom -->
        <split-pane v-model="offsetVertical" mode="vertical" @on-moving="handleMoving">
          <div slot="top" class="pane top-pane">abc</div>
          <div slot="bottom" class="pane bottom-pane">
            <Card shadow>
              <tree-table expand-key="name" :expand-type="false" :selectable="true" :columns="columns" :data="data"
              @checkbox-click="handleCheckboxClick"
              >
                <template slot="likes" slot-scope="scope">
                  <Button @click="handle(scope)">123</Button>
                </template>
                <!-- <template slot="action" slot-scope="scope"> -->
                <template v-slot:action="scope">
                  <Button @click="addChildNode(scope)">Add Child</Button>
                  <Button @click="editCell(scope)">Edit</Button>
                  {{scope.row.name}}
                  <Button @click="exportExcel()">exportExcel</Button>
                </template>
              </tree-table>
            </Card>
            <Modal v-model="showModal" title="Edit Cell">
              <Input v-model="editedValue" />
              <div slot="footer">
                <Button @click="saveCell">Save</Button>
                <Button @click="cancelEdit">Cancel</Button>
              </div>
            </Modal>
          </div>
          <div slot="trigger" class="custom-trigger">
            <Icons class="trigger-icon" :size="22" type="resize-vertical" color="#fff"/>
          </div>
        </split-pane>
      </div>
      <div slot="left" class="pane left-pane">
        <draggable v-model="items">
          <template v-for = "item in items">
            <Tree :data="[item]" :key="item.id" :render="render" />
          </template>
        </draggable>
        <!-- <Tree :data="data4" show-checkbox multiple>
        </Tree> -->
      </div>
    </split-pane>
  </div>
</template>

<script>
// Import the SheetJS library
import XLSX from 'xlsx'
// import 'view-design/dist/styles/iview.css'
// import { Button, Card, Modal, Input, D } from 'view-design'
import SplitPane from '_c/split-pane'
import Icons from '_c/icons'
import draggable from 'vuedraggable'

export default {
  name: 'tree_table_page',
  components: {
    SplitPane,
    Icons,
    draggable
  },
  data () {
    return {
      columns: [
        {
          title: 'name',
          key: 'name',
          width: '400px'
        },
        {
          title: 'sex',
          key: 'sex',
          minWidth: '50px'
        },
        {
          title: 'score',
          key: 'score'
        },
        {
          title: 'likes',
          key: 'likes',
          minWidth: '200px',
          type: 'template',
          template: 'likes'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          type: 'template',
          template: 'action'
          // fixed: 'right',
          // align: 'center'
        }
      ],
      data: [
        {
          name: 'Jack',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 10,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20,
              children: [
                {
                  name: 'Ashley',
                  sex: 'female',
                  likes: ['football', 'basketball'],
                  score: 20
                },
                {
                  name: 'Taki',
                  sex: 'male',
                  likes: ['football', 'basketball'],
                  score: 10,
                  children: [
                    {
                      name: 'Ashley',
                      sex: 'female',
                      likes: ['football', 'basketball'],
                      score: 20
                    },
                    {
                      name: 'Taki',
                      sex: 'male',
                      likes: ['football', 'basketball'],
                      score: 10,
                      children: [
                        {
                          name: 'Ashley',
                          sex: 'female',
                          likes: ['football', 'basketball'],
                          score: 20
                        },
                        {
                          name: 'Taki',
                          sex: 'male',
                          likes: ['football', 'basketball'],
                          score: 10
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10
            }
          ]
        },
        {
          name: 'Tom1',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 20,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20,
              children: [
                {
                  name: 'Ashley',
                  sex: 'female',
                  likes: ['football', 'basketball'],
                  score: 20
                },
                {
                  name: 'Taki',
                  sex: 'male',
                  likes: ['football', 'basketball'],
                  score: 10
                }
              ]
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10,
              children: [
                {
                  name: 'Ashley',
                  sex: 'female',
                  likes: ['football', 'basketball'],
                  score: 20
                },
                {
                  name: 'Taki',
                  sex: 'male',
                  likes: ['football', 'basketball'],
                  score: 10
                }
              ]
            }
          ]
        },
        {
          name: 'Tom2',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 30
        },
        {
          name: 'Tom3',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 40,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10
            }
          ]
        }
      ],
      checkedArray: [],
      showModal: false,
      editedValue: '',
      editedRow: null,
      offset: 0.2,
      offsetVertical: 0.2,
      data4: [
        {
          id: 1,
          title: 'parent 1',
          expand: true,
          selected: true,
          children: [
            {
              id: 2,
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  id: 3,
                  title: 'leaf 1-1-1',
                  disabled: false
                },
                {
                  id: 4,
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              id: 5,
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  id: 6,
                  title: 'leaf 1-2-1',
                  checked: true
                },
                {
                  id: 7,
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      items: [
        {
          id: 1,
          title: 'Item 1',
          children: [
            {
              id: 2,
              title: 'Item 1-1',
              children: [
                {
                  id: 3,
                  title: 'Item 1-1-1'
                },
                {
                  id: 4,
                  title: 'Item 1-1-2'
                }
              ]
            },
            {
              id: 5,
              title: 'Item 1-2',
              children: [
                {
                  id: 6,
                  title: 'Item 1-2-1'
                },
                {
                  id: 7,
                  title: 'Item 1-2-2'
                }
              ]
            }
          ]
        },
        {
          id: 8,
          title: 'Item 2',
          children: [
            {
              id: 9,
              title: 'Item 2-1'
            },
            {
              id: 10,
              title: 'Item 2-2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handle (scope) {
      console.log(scope)
      const data = [1, 2, 3, 4, 5]
      const indexToRemove = 2

      const filteredData = data.reduce((acc, item, index) => {
        if (index !== indexToRemove) {
          acc.push(item)
        }
        return acc
      }, [])

      console.log(filteredData)
      // Output: [1, 2, 4, 5]
    },
    handleCheckboxClick (row, checked) {
      console.log('Row:', row)
      console.log('Checked:', checked)
      console.log('this.data:', this.data)
      console.log('this.row._isChecked:', row._isChecked)
      // Get the row data and checked state
      // const data =
      // if _isChecked is true, add the row to checkedArray
      // if _isChecked is false, remove the row from checkedArray
      // kindly send me the code
      const ischecked = row._isChecked
      if (ischecked) {
        this.checkedArray.push(row)
      } else {
        // check the row in checkedArray and remove it as per the checked state
        const nameToFind = 'Ashley'
        const foundObject = this.findObjectByName(nameToFind, this.data)

        if (foundObject) {
          console.log(`Object with name '${nameToFind}' found:`, foundObject)
        } else {
          console.log(`Object with name '${nameToFind}' not found.`)
        }

        var i = this.checkedArray.findIndex(item => {
          return item.name === row.name
        })
        this.checkedArray.splice(i, 1)
      }
      console.log('this.checkedArray:', this.checkedArray)
      // const filteredData =
      // console.log(filteredData)

      this.data.filter(function (item) {
        return item.name.trim() === row.name.trim()
      })
      // Do something with the row data and checked state
      //
    },
    findObjectByName (name, data) {
      for (let i = 0; i < data.length; i++) {
        const obj = data[i]
        if (obj.name === name) {
          return obj
        } else if (obj.children) {
          const foundObj = this.findObjectByName(name, obj.children)
          if (foundObj) {
            return foundObj
          }
        }
      }
      return null
    },
    deleteObjectByName (name, data) {
      for (let i = 0; i < data.length; i++) {
        const obj = data[i]
        if (obj.name === name) {
          data.splice(i, 1)
          return obj
        } else if (obj.children) {
          const foundObj = this.findObjectByName(name, obj.children)
          if (foundObj) {
            obj.children.splice(i, 1)
            return foundObj
          }
        }
      }
      return null
    },
    addChildNode1 (name, data) {
      const obj = this.findObjectByName(name, data)
      if (obj) {
        obj.children.push({
          name: 'Taki',
          sex: 'male',
          likes: ['football', 'basketball'],
          score: 10,
          children: [
            {
              name: 'Ashley',
              sex: 'female',
              likes: ['football', 'basketball'],
              score: 20
            },
            {
              name: 'Taki',
              sex: 'male',
              likes: ['football', 'basketball'],
              score: 10
            }]
        })
      }
    },
    addChildNode (scope) {
      console.log(scope)
      // const child = { id: row.children.length + 1, value: `Child ${row.children.length + 1}` }
      const child = {
        name: 'Tom44',
        sex: 'male',
        likes: ['football', 'basketball'],
        score: 40
      }
      scope.row.children.push(child)
    },
    editCell (scope) {
      this.editedRow = scope.row
      this.editedValue = scope.row.name
      this.showModal = true
    },
    saveCell () {
      const foundObject = this.findObjectByName(this.editedRow.name, this.data)
      foundObject.name = this.editedValue

      console.log(this.data[0].name)
      this.showModal = false
    },
    cancelEdit () {
      this.showModal = false
    },
    exportExcel () {
      // Convert the data to a WorkSheet object
      const worksheet = XLSX.utils.json_to_sheet(this.data)
      console.log(worksheet)
      // Convert the WorkSheet object to an array of arrays
      const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
      console.log(dataArray)
      // Convert the array of arrays to a new WorkSheet object
      const newWorksheet = XLSX.utils.aoa_to_sheet(dataArray)
      console.log(newWorksheet)
      // Create a new workbook and add the WorkSheet to it
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, newWorksheet, 'Tree Data')

      // Write the workbook to an Excel file
      XLSX.writeFile(workbook, 'tree_data.xlsx')
    },
    handleMoving (e) {
      console.log(e.atMin, e.atMax)
    },
    onExpand (e) {
      console.log(e)
    },
    render (h, { node, data }) {
      return h(
        'div',
        {
          class: 'tree-node',
          attrs: {
            'data-id': data.id
          }
        },
        [
          h('div', { class: 'tree-node-title' }, node.title),
          node.children &&
            node.children.length > 0 &&
            h('div', { class: 'tree-node-children' }, [
              h('draggable', { props: { list: node.children } }, [
                node.children.map(child =>
                  h('div', { class: 'tree-node-child', attrs: { 'data-id': child.id } }, [
                    h('div', { class: 'tree-node-title' }, child.title)
                  ])
                )
              ])
            ])
        ]
      )
    }
  }
}
</script>

<style lang="less">
.center-middle{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.split-pane-page-wrapper{
  height: 600px;
  .pane{
    width: 100%;
    height: 100%;
    &.left-pane{
      background: rgb(246, 245, 244);
    }
    &.right-pane{
      background: palevioletred;
    }
    &.top-pane{
      background: rgb(251, 251, 251);
    }
    &.bottom-pane{
      background: palevioletred;
    }
  }
  .custom-trigger{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #000000;
    position: absolute;
    .center-middle;
    box-shadow: 0 0 6px 0 rgba(28, 36, 56, 0.4);
    i.trigger-icon{
      .center-middle;
    }
  }
}
</style>
