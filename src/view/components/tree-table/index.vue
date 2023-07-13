<template>
  <div>
    <Card shadow>
      <!-- 树状表格组件tree-table-vue，基于<a href="https://github.com/MisterTaki/vue-table-with-tree-grid">vue-table-with-tree-grid</a>进行开发，修复了一些bug，添加了一些新属性
      <p><b>支持使用slot-scope进行自定义列渲染内容</b></p>
      <p>文档请看<a href="https://github.com/lison16/tree-table-vue">https://github.com/lison16/tree-table-vue</a></p> -->
      <tree-table expand-key="name" :expand-type="true" :selectable="true" :columns="columns" :data="data"
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
</template>

<script>
export default {
  name: 'tree_table_page',
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
      editedRow: null
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
    }
  }
}
</script>

<style>

</style>
