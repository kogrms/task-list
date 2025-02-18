import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as { id: number; text: string; completed: boolean }[],
    editingTaskId: null as number | null, // ID редактируемой задачи
    filter: 'all' as 'all' | 'active' | 'completed', // Фильтр задач
  }),
  actions: {
    addTask(text: string) {
      this.tasks.push({ id: Date.now(), text, completed: false })
    },
    toggleTask(id: number) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.completed = !task.completed
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },
    updateTask(id: number, text: string) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.text = text
    },
    setEditingTaskId(id: number | null) {
      this.editingTaskId = id
    },
    markAllAsCompleted() {
      this.tasks.forEach((task) => (task.completed = true))
    },
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.completed)
    },
    setFilter(filter: 'all' | 'active' | 'completed') {
      this.filter = filter
    },
    updateTaskOrder(newOrder: { id: number; text: string; completed: boolean }[]) {
      this.tasks = newOrder
    }
  },
  getters: {
    isEditingTask: (state) => (id: number) => state.editingTaskId === id,
    filteredTasks: (state) => {
      if (state.filter === 'active') return state.tasks.filter((task) => !task.completed)
      if (state.filter === 'completed') return state.tasks.filter((task) => task.completed)
      return state.tasks
    },
    hasCompletedTasks: (state) => state.tasks.some((task) => task.completed),
  }
})
