<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import TodoListContainer from './components/TodoListContainer.vue';
import { inject, provide } from 'vue';

const today = inject('today');
const filters = {
  0: { str: '해야 할 작업들', func: () => {} },
  1: { str: '완료한 작업들', func: () => {} },
};

provide('filters', filters);
</script>

<template>
  <header>
    <hgroup class="my-5">
      <h1>나의 할일</h1>
      <em>{{ today }}</em>
    </hgroup>
  </header>
  <todo-list-container />
</template>
