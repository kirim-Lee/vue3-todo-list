<template>
  <todo-list-menu v-on:change-filter="onChangeFilter" class="p-0" />
  <div v-for="(data, key) in grouped_todos" :key="key" class="mb-3">
    <div v-if="use_category">
      <em>{{ key }}</em>
    </div>
    <todo-list :data="data" />
  </div>

  <div class="my-2 mt-5">
    <span style="background-color: red">&nbsp;</span>&nbsp;
    <strong>처리하지 못한 작업들</strong>
  </div>
  <todo-list :data="pending_todos" />
</template>

<script>
import { inject, provide, ref, watch } from 'vue';
import { useFilter } from '../compositions/useFilter';
import TodoList from './TodoList.vue';
import TodoListMenu from './TodoListMenu.vue';

// 날짜별로 카테고리를 나눔
const groupBy = (todos) => {
  return todos.reduce((acc, cur) => {
    acc[cur['date']] = acc[cur['date']] || [];
    acc[cur['date']].push(cur);
    return acc;
  }, {});
};

export default {
  name: 'TodoListMain',
  setup() {
    const filter = ref(0);
    const grouped_todos = ref([]);
    const pending_todos = ref([]); // 진행중인 항목
    const use_category = ref(false); //

    const todos = inject('todos');

    const {
      getPendingTodos,
      getActiveTodayTodos,
      getCompletedTodayTodos,
      getAllTodayTodos,
      getAllTodos,
    } = useFilter();

    const filters = {
      0: {
        str: '해야 할 작업들',
        func: getActiveTodayTodos,
        category: false,
      },
      1: {
        str: '완료한 작업들',
        func: getCompletedTodayTodos,
        category: false,
      },
      2: {
        str: '오늘의 모든 기록',
        func: getAllTodayTodos,
        category: false,
      },
      3: {
        str: '모든 작업',
        func: getAllTodos,
        category: false,
      },
    };

    provide('filters', filters);

    const onChangeFilter = (filter_idx) => {
      filter.value = Number(filter_idx);
    };

    watch(
      [() => filter.value, todos.value],
      ([new_filter]) => {
        pending_todos.value = getPendingTodos(todos);

        if (typeof new_filter !== 'undefined') {
          let temp_todos = filters[new_filter].func(todos);
          grouped_todos.value = groupBy(temp_todos);
          use_category.value = filters[new_filter].category;
        }
      },
      { immediate: true }
    );

    return {
      filter,
      pending_todos,
      grouped_todos,
      use_category,
      onChangeFilter,
    };
  },
  components: {
    TodoList,
    TodoListMenu,
  },
};
</script>
