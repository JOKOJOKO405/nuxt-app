<template>
  <div>
    <form @submit.prevent="addTodo">
        <input type="text" v-model="input">
        <input type="datetime-local" v-model="limit">
        <!-- <button>add</button> -->
        <v-app>
          <v-btn
  color="accent"
  elevation="2"
  rounded
  x-large
  @click.prevent="addTodo"
>ADD TODO</v-btn>
        </v-app>
      </form>
  </div>
</template>

<script>
export default {
  data: function(){
    return {
      input: '',
      limit: '',
      index: '',
      newInput: '',
      newLimit: '',
    }
  },
  methods: {
    addTodo: function(){
      this.$store.dispatch('todolist/add', [this.input, this.limit]);
      this.input = ''
      this.limit = ''
    },
  },
}
</script>