<script>
import { provide, ref, readonly } from 'vue';
import { useStorage } from '../compositions/storage';
import TodoListMain from './TodoListMain.vue';
import TodoListNew from './TodoListNew.vue';

const { storage_id, loadTodos, saveTodos } = useStorage();

export default {
  components: { TodoListMain, TodoListNew },
  name: 'TodoListContainer',
  setup() {
    const todos = ref([]);

    const initTodos = (init_todos) => {
      todos.value = init_todos;
    };

    const addTodo = (job, date) => {
      todos.value.push({ id: storage_id.value++, job, date, completed: false });
      saveTodos(todos);
    };

    const removeTodo = (id) => {
      todos.value.splice(id, 1);
      todos.value.forEach((todo, idx) => {
        todo.id = idx;
      });

      saveTodos(todos);
    };

    const completeTodo = (id) => {
      todos.value[id].completed = true;
      saveTodos(todos);
    };

    provide('todos', readonly(todos));
    provide('addTodo', addTodo);
    provide('removeTodo', removeTodo);
    provide('completeTodo', completeTodo);

    loadTodos(initTodos);
  },
};
</script>

<template>
  <todo-list-new />
  <section class="container">
    <div class="row justify-content-center m2">
      <todo-list-main />
    </div>
  </section>
</template>
