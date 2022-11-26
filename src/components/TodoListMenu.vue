<template>
  <div class="row">
    <div class="col">
      <span style="background-color: blue">&nbsp;</span>&nbsp;
      <strong>{{ state }}</strong>
    </div>
    <div class="col">
      <div class="btn-group float-end">
        <button
          class="btn btn-sm dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
        >
          리스트 필터
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="(item, key) in filters" :key="key">
            <a
              :class="'dropdown-item' + (filter === key ? ' bg-light' : '')"
              @click="filter = key"
              >{{ item.str }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoListMenu',
};
</script>

<script setup>
import { computed, inject, watch, ref } from 'vue';

const filters = inject('filters');

const filter = ref(0);

const state = computed(() => {
  return filters[filter.value].str;
});

const emit = defineEmits(['change-filter']);

watch(
  () => filter.value,
  (current) => emit('change-filter', current)
);
</script>
