<template>
    <div id="container">
      <list-component />
      <form-component />
    </div>
</template>

<script>
import ListComponent from '@/components/ListComponent.vue';
import FormComponent from '@/components/FormComponent.vue';
export default {
  components: {
    ListComponent,
    FormComponent,
  },
  methods: {
  },
    created: function(){
    this.$store.dispatch('todolist/init');
  }
}
</script>

<style lang="scss">
.done {
  text-decoration: line-through !important;
}
</style>
