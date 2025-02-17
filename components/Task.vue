<template>
  <li class="flex items-center justify-between gap-4 w-task pr-5 h-5">
    <div class="flex items-center">
      <div class="w-6 h-full">
        <!-- drag-n-drop icon on hover (desktops) or on long tap (mobiles/tablets) -->
      </div>
      <input
        type="checkbox"
        v-model="task.completed"
        @click="toggleTask"
        class="w-4 h-4 cursor-pointer"
        :class="isEditing ? 'mr-2' : 'mr-3'"
      />
      <div class="max-w-7/10">
        <input
          v-if="isEditing"
          type="text"
          v-model="newTaskText"
          @blur="saveTask"
          @keyup.enter="saveTask"
          class="w-full px-1 py-[2px] rounded-md text-t10 h-5"
        />
        <h3 v-else :class="{ 'text-grey-20/50': task.completed }">
          {{ task.text }}
        </h3>
      </div>
    </div>
    <div class="w-14 flex justify-between items-center">
      <button @click="editTask" class="lg:hover:opacity-70 w-5 h-5 flex justify-center items-center">
        <img src="~assets/images/pencil.svg" alt="Edit task" class="w-4 h-4" />
      </button>
      <button @click="deleteTask" class="lg:hover:opacity-70 w-5 h-5 flex justify-center items-center">
        <img src="~assets/images/bin.svg" alt="Delete task" class="w-4 h-4" />
      </button>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const { task } = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const taskStore = useTaskStore()

// Local state for editing
const isEditing = ref(false)
const newTaskText = ref(task.text)

const toggleTask = () => {
  taskStore.toggleTask(task.id) // Toggle task completion state in Pinia
}

const editTask = () => {
  isEditing.value = true // Enter edit mode
}

const saveTask = () => {
  if (newTaskText.value.trim() && newTaskText.value.trim() !== task.text) {
    taskStore.updateTask(task.id, newTaskText.value.trim()) // Save updated task to Pinia
    task.text = newTaskText.value.trim() // Update local task text
  } else {
    newTaskText.value = task.text // Reset input if empty or unchanged
  }
  isEditing.value = false // Exit edit mode
}

const deleteTask = () => {
  taskStore.removeTask(task.id) // Delete task from Pinia
}
</script>
