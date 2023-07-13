<template>
  <div>
    <i-button @click="show">Click me!</i-button>
    <!-- <Button @click="show">Click me!</Button> -->
    <Modal v-model="visible" title="Welcome">Welcome to ViewUI</Modal>
  </div>
</template>

<script>

export default {
  name: 'MyComponent',
  components: {

  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    show: function () {
      this.visible = true
    },
    filterMethod (value, row) {
      const likes = row.likes
      if (value === '10+') {
        return likes >= 10
      } else if (value === '20+') {
        return likes >= 20
      }
    }
  }
}
</script>
