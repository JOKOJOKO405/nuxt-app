<template>
    <div id="container">
      <h1>MY TODO</h1>
      <ul>
        <li v-for="todo in todos">
          <input type="checkbox" @change="toggled" :checked="todo.done" id="">  <span :class="{ done: todo.done }">{{ todo.task }} {{ todo.date }} </span><button @click="deleteTodo">del</button>
        </li>
      </ul>
        <form>
        <input type="text" v-model="input">
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
      todos: []
    }
  },
  methods: {
    addTodo: function(){
      if(this.input.trim().length){
        const todo = {
        task: this.input,
        date: new Date(),
        done: false,
        modify: false,
        limit: '2020/12/1'
      }
      this.todos.push(todo)
      this.input = ''
      }
    },
    deleteTodo: function(index){
      this.todos.splice(index, 1)
    },
    toggled: function(){
      this.done = !this.done
    }
  }
}
</script>

<style>
.done{
  text-decoration: line-through !important;
}
</style>
