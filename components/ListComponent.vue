<template>
  <div>
    <h1>MY TODO</h1>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <div v-if="todo.date">
          <div :class="{ done: todo.done }">
            <div class="list__container">
              <div class="list__checkBox">
                <v-checkbox
                  :checked="todo.done"
                  @change="toggled(todo)"
                  hide-details
                ></v-checkbox>
              </div>
              <!-- /.list__checkBox -->
              <div class="list__tasks">
                <p @click="modifyShow(todo)">
                  {{ todo.task }}
                </p>
              </div>
              <!-- /.list__tasks -->
              <div class="list__date">
                {{ todo.date.toDate() | dateFilter }}
              </div>
              <!-- /.list__date -->
              <div class="list__limit">
                <span>LIMIT</span> {{ todo.limit | dateFilter }}
              </div>
              <!-- /.list__limit -->
              <button class="list__btn" @click.prevent="deleteTodo(todo.id)">
                del
              </button>
            </div>
            <!-- /.list__container -->
            <div class="list__modifyContainer" v-if="todo.modify">
              <input type="text" v-model="newInput" />
              <input type="datetime-local" v-model="newLimit" />
              <button class="list__btn" @click.prevent="modify(todo.id)">
                modify
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data: function () {
    return {
      input: "",
      limit: "",
      index: "",
      newInput: "",
      newLimit: "",
    };
  },
  methods: {
    deleteTodo: function (id) {
      this.$store.dispatch("todolist/delete", id);
    },
    toggled: function (todo) {
      this.$store.dispatch("todolist/toggled", todo);
    },
    modify: function (id) {
      this.$store.dispatch("todolist/modify", [
        id,
        this.newInput,
        this.newLimit,
      ]);
      this.newInput = "";
    },
    modifyShow: function (todo) {
      this.$store.dispatch("todolist/show", todo);
    },
  },
  computed: {
    todos() {
      return this.$store.getters["todolist/orderedDate"];
    },
  },
  filters: {
    dateFilter: function (date) {
      return moment(date).format("YYYY.MM.DD HH:mm:ss");
    },
  },
};
</script>