<template>
  <div>
    <Table :columns="columns" :data="data" :filters="filters" @on-filter-change="handleFilterChange">
      <template slot="name" slot-scope="{ row }">
        {{ row.name }}
      </template>
      <template slot="age" slot-scope="{ row }">
        {{ row.age }}
      </template>
    </Table>
  </div>
</template>

<script>
import { Table, Input } from 'iview'

export default {
  name: 'MyTable',
  components: {
    Table,
    Input
  },
  data () {
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          filters: [
            {
              label: 'John',
              value: 'John'
            },
            {
              label: 'Jane',
              value: 'Jane'
            }
          ],
          filterMultiple: false,
          filterMethod: (value, row) => {
            return row.name.indexOf(value) > -1
          }
        },
        {
          title: 'Age',
          key: 'age',
          filters: [
            {
              label: '18-25',
              value: '18-25'
            },
            {
              label: '26-35',
              value: '26-35'
            }
          ],
          filterMultiple: false,
          filterMethod: (value, row) => {
            const age = row.age
            if (value === '18-25') {
              return age >= 18 && age <= 25
            } else if (value === '26-35') {
              return age >= 26 && age <= 35
            }
          }
        }
      ],
      data: [
        {
          name: 'John',
          age: 25
        },
        {
          name: 'Jane',
          age: 30
        },
        {
          name: 'Bob',
          age: 20
        }
      ],
      filters: {}
    }
  },
  methods: {
    handleFilterChange (filters) {
      this.filters = filters
    }
  }
}
</script>
