import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as {
      id: number; // Task ID
      text: string; // Task text
      completed: boolean; // Task completion status
      draggable: boolean; // Task draggable status
      sortingPosition: number // Task sorting position
    }[],
    editingTaskId: null as number | null, // ID of the task being edited
    filter: 'all' as 'all' | 'active' | 'completed', // Current filter
  }),
  actions: {
    addTask(text: string) {
    const maxPosition = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.sortingPosition)) : 0
    this.tasks.push({
      id: Date.now(),
      text,
      completed: false,
      draggable: false,
      sortingPosition: maxPosition + 1
    })
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
    setTaskDraggable(id: number, draggable: boolean) {
      this.tasks.forEach((task) => (task.draggable = false))
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.draggable = draggable
    },
    updateTaskOrder(draggedId: number, droppedId: number) {
      const draggedTask = this.tasks.find((t) => t.id === draggedId)
      const droppedTask = this.tasks.find((t) => t.id === droppedId)

      if (!draggedTask || !droppedTask) return

      const oldPosition = draggedTask.sortingPosition
      const newPosition = droppedTask.sortingPosition
      const movingDown = oldPosition < newPosition 

      // Update sortingPosition for all tasks between the old and new positions
      this.tasks.forEach((task) => {
        if (movingDown) {
          if (task.sortingPosition > oldPosition && task.sortingPosition <= newPosition) {
            task.sortingPosition -= 1
          }
        } else {
          if (task.sortingPosition < oldPosition && task.sortingPosition >= newPosition) {
            task.sortingPosition += 1
          }
        }
      })
      // Update the dragged task's sortingPosition
      draggedTask.sortingPosition = newPosition
      // Sort tasks by sortingPosition
      this.tasks.sort((a, b) => a.sortingPosition - b.sortingPosition)
    }
  },
  getters: {
    isEditingTask: (state) => (id: number) => state.editingTaskId === id,
    filteredTasks: (state) => {
      let tasks = state.tasks
      if (state.filter === 'active') tasks = tasks.filter((task) => !task.completed)
      if (state.filter === 'completed') tasks = tasks.filter((task) => task.completed)

      return tasks.sort((a, b) => a.sortingPosition - b.sortingPosition)
    },
    hasCompletedTasks: (state) => state.tasks.some((task) => task.completed)
  }
})
