<template>
    <div id="container">
      <h1>MY TODO</h1>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <p :class="{ done: todo.done }">
            <input type="checkbox" v-model="todo.done" :checked="todo.done" id=""> 
            {{ todo.task }} {{ todo.date.toDate() | dateFilter }} 
          </p>
          <button @click.prevent="deleteTodo">del</button>
        </li>
      </ul>
        <form @submit.prevent="addTodo">
        <input type="text" v-model="input">
        <!-- <button>add</button> -->
        <v-app>
          <v-btn
  color="accent"
  elevation="2"
  rounded
  x-large
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
    }
  },
  methods: {
    addTodo: function(){
      this.$store.dispatch('todolist/add', this.input)
      this.input = ''
    },
    deleteTodo: function(id){
      this.$store.dispatch('todolist/delete', id)
    },
    toggled: function(todo){
      this.$store.dispatch('todolist/toggle', todo)
    }
  },
  computed: {
    todos(){
      return this.$store.getters['todolist/orderedDate']
    },
  },
  filters: {
    dateFilter: function(date){
      return moment(date).format('YYYY-MM-DD')
    }
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
