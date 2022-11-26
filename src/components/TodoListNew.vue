<template>
  <section class="mb-5">
    <div class="container border border-primary rounded">
      <div class="justify-content-center">
        <div class="row">
          <div class="col">
            <input
              type="text"
              id="todo_input"
              class="form-control my-2"
              v-model="job"
              placeholder="여기에 할일을 적으세요"
              @keyup.enter="onAddTodo"
            />
          </div>
        </div>
        <div class="row my-2">
          <div class="col-6">
            <input
              type="date"
              class="float-start"
              v-model="date"
              :min="today"
            />
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn btn-primary btn-sm float-end"
              @click="onAddTodo"
            >
              작업추가
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { inject, reactive, toRefs } from 'vue';

export default {
  name: 'TodoListNew',
  setup() {
    const today = inject('today');
    const addTodo = inject('addTodo');
    const val_obj = reactive({
      job: '',
      date: today,
      today: today,
    });

    const onAddTodo = () => {
      console.log('todo click');
      if (val_obj.job.length <= 0) return;

      addTodo(val_obj.job, val_obj.date);
      val_obj.job = '';
      val_obj.date = today;
    };

    return {
      ...toRefs(val_obj),
      onAddTodo,
    };
  },
};
</script>
