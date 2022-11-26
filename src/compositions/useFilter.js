import { inject } from 'vue';

const dateSort = (a, b) => {
  const a_date = Date.parse(a.date);
  const b_date = Date.parse(b.date);

  if (a_date > b_date) return 1;
  else if (a_date < b_date) return 0;
  else a_date.id - b_date.id;
};

const getFilter = (filtering) => (todos) =>
  todos.value
    .filter(filtering || (() => true))
    .slice() // 새로운 배열 객체를 만들기 위함
    .sort(dateSort);

export const useFilter = () => {
  const today = inject('today');

  const getPendingTodos = getFilter(
    (todo) => todo.date < today && !todo.completed
  );

  const getActiveTodayTodos = getFilter(
    (todo) => todo.date === today && !todo.completed
  );

  const getCompletedTodayTodos = getFilter(
    (todo) => todo.date === today && todo.completed
  );

  const getAllTodayTodos = (todos) =>
    getActiveTodayTodos(todos)
      .concat(getCompletedTodayTodos(todos))
      .sort(dateSort);

  const getAllTodos = getFilter();

  return {
    getPendingTodos,
    getActiveTodayTodos,
    getCompletedTodayTodos,
    getAllTodayTodos,
    getAllTodos,
  };
};
