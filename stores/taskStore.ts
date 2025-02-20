import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as {
      id: number
      text: string
      completed: boolean
      draggable: boolean
      sortingPosition: number
    }[],
    loading: true, // Whether tasks are being fetched
    editingTaskId: null as number | null, // ID of the task being edited
    filter: 'all' as 'all' | 'active' | 'completed', // Current filter
  }),

  actions: {
    async fetchTasks() {
      try {
        const response = await fetch('https://storage.xochu-shashlik.ru/k/')
        if (!response.ok) throw new Error('Failed to fetch tasks')
        this.tasks = await response.json()

        // Loading time for the spinner to be visible
        setTimeout(() => {
          this.loading = false
        }
        , 500)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },

    async syncTasks() {
      console.log('syncTasks', this.tasks)
      try {
        await fetch('https://storage.xochu-shashlik.ru/k/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.tasks)
        })
      } catch (error) {
        console.error('Error syncing tasks:', error)
      }
    },

    addTask(text: string) {
      const maxPosition = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.sortingPosition)) : 0
      this.tasks.push({
        id: Date.now(),
        text,
        completed: false,
        draggable: false,
        sortingPosition: maxPosition + 1
      })
      this.syncTasks()
    },

    toggleTask(id: number) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.completed = !task.completed
        this.syncTasks()
      }
    },

    removeTask(id: number) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.syncTasks()
    },

    updateTask(id: number, text: string) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) {
        task.text = text
        this.syncTasks()
      }
    },

    setEditingTaskId(id: number | null) {
      this.editingTaskId = id
    },

    markAllAsCompleted() {
      this.tasks.forEach((task) => (task.completed = true))
      this.syncTasks()
    },

    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.completed)
      this.syncTasks()
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

      draggedTask.sortingPosition = newPosition
      this.tasks.sort((a, b) => a.sortingPosition - b.sortingPosition)

      this.syncTasks()
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

    hasCompletedTasks: (state) => state.tasks.some((task) => task.completed),

    getTaskDraggable: (state) => (id: number) => {
      const task = state.tasks.find((t) => t.id === id)
      return task ? task.draggable : false
    }
  }
})
