<template>
  <div>
    <form v-if="newAdd" @submit.prevent="addTodo" class="form">
      <div class="form__container">
        <input type="text" v-model="input" class="form__task" />
        <input type="datetime-local" v-model="limit" class="form__limit" />
      </div>
      <!-- <button>add</button> -->
      <div class="form__btn">
        <button>add Todo</button>
        <!-- <v-app>
        <v-btn
          color="#23c441"
          elevation="2"
          rounded
          x-large
          @click.prevent="addTodo"
          >ADD TODO</v-btn
        >
      </v-app> -->
      </div>
    </form>
    <button class="edit__btn" @click.prevent="newTodo">ADD</button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      input: "",
      limit: "",
      index: "",
      newInput: "",
      newLimit: "",
      newAdd: false,
    };
  },
  methods: {
    addTodo: function () {
      this.$store.dispatch("todolist/add", [this.input, this.limit]);
      this.input = "";
      this.limit = "";
    },
    newTodo: function () {
      this.newAdd = !this.newAdd;
    },
  },
};
</script>