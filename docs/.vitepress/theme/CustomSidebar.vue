<template>
  <div class="custom-sidebar">
    <div 
      v-for="group in sidebarData" 
      :key="group.text"
      class="sidebar-group"
    >
      <div 
        class="sidebar-group-title"
        @click="toggleGroup(group.text)"
        :class="{ active: expandedGroups.has(group.text) }"
      >
        <span>{{ group.text }}</span>
        <div 
          class="arrow" 
          :class="{ expanded: expandedGroups.has(group.text) }"
        />
      </div>
      <div 
        class="sidebar-group-items"
        :class="{ 
          expanded: expandedGroups.has(group.text),
          collapsed: !expandedGroups.has(group.text)
        }"
      >
        <a 
          v-for="item in group.items"
          :key="item.link"
          :href="item.link"
          class="sidebar-item"
          :class="{ active: isCurrentPage(item.link) }"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

const expandedGroups = ref(new Set())

const sidebarData = computed(() => {
  const path = route.path
  for (const key in theme.value.sidebar) {
    if (path.startsWith(key)) {
      return theme.value.sidebar[key]
    }
  }
  return []
})

const toggleGroup = (groupText) => {
  if (expandedGroups.value.has(groupText)) {
    expandedGroups.value.delete(groupText)
  } else {
    expandedGroups.value.add(groupText)
  }
  
  localStorage.setItem('sidebar-states', 
    JSON.stringify(Array.from(expandedGroups.value))
  )
}

const isCurrentPage = (link) => {
  return route.path === link
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('sidebar-states')
    if (saved) {
      expandedGroups.value = new Set(JSON.parse(saved))
    }
  } catch (e) {
    console.warn('Failed to load sidebar states:', e)
  }
  
  sidebarData.value.forEach(group => {
    if (group.items.some(item => item.link === route.path)) {
      expandedGroups.value.add(group.text)
    }
  })
})
</script>