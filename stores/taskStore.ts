import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [] as { id: number; text: string; completed: boolean }[],
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
    updateTask({ id, text }: { id: number; text: string }) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.text = text
    }
  }
})
