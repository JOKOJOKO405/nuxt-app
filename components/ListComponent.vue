<template>
  <div>
    <h1>MY TODO</h1>
    <select v-model.number="sort">
            <option value="1" selected>作成日順</option>
            <option value="2">期限日順</option>
          </select>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <template v-if="todo.date">
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
                  <span :class="{ done: todo.done }">
                  {{ todo.task }}
                  </span>
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
        </template>
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
      sort: 1,
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
      this.newInput = todo.task;
      this.newLimit = todo.limit;
      this.$store.dispatch("todolist/show", todo);
      this.newInput = "";
      this.newLimit = "";
    },
  },
  computed: {
    todos() {
      switch (this.sort) {
        case 1:
          return this.$store.getters["todolist/orderedDate"];
          break;
        case 2:
          return this.$store.getters["todolist/orderedLimit"];
          break;
        default:
          break;
      }
    },
  },
  filters: {
    dateFilter: function (date) {
      return moment(date).format("YYYY.MM.DD HH:mm:ss");
    },
  },
};
</script>