<template>
    <div id="container">
      <h1>MY TODO</h1>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <div v-if="todo.date">
            <p :class="{ done: todo.done }">
            <input type="checkbox" @change="toggled(todo)" :checked="todo.done" id=""> 
            {{ todo.task }} {{ todo.date.toDate() | dateFilter }} {{ todo.limit }}
          </p>
          <button @click.prevent="deleteTodo(todo.id)">del</button>
          </div>
        </li>
      </ul>
        <form @submit.prevent="addTodo">
        <input type="text" v-model="input">
        <input type="date" v-model="limit">
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
import moment from 'moment';
export default {
  data: function(){
    return {
      input: '',
      limit: '',
    }
  },
  methods: {
    addTodo: function(){
      this.$store.dispatch('todolist/add', [this.input, this.limit]);
      this.input = ''
    },
    deleteTodo: function(id){
      this.$store.dispatch('todolist/delete', id)
    },
    toggled: function(todo){
      this.$store.dispatch('todolist/toggled', todo)
    },
    modify: function(id){
      this.$store.dispatch('todolist/modify', [id, this.input, this.limit])
    },
  },
  computed: {
    todos(){
      return this.$store.getters['todolist/orderedDate']
    },
  },
  filters: {
    dateFilter: function(date){
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  created: function(){
    this.$store.dispatch('todolist/init');
  }
}
</script>

<style lang="scss">
.done{
  text-decoration: line-through !important;
}
</style>
