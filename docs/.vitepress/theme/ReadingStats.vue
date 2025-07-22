<template>
  <div class="reading-stats-container">
    <div class="reading-stats-card">
      <span class="stat-text" v-if="wordCount > 0">{{ wordCount.toLocaleString() }} 字</span>
      <span class="stat-text placeholder" v-else>计算中...</span>
      <span class="stat-separator" v-if="wordCount > 0 && readingTime > 0">·</span>
      <span class="stat-text" v-if="readingTime > 0">{{ readingTime }} 分钟阅读</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page } = useData()
const route = useRoute()

const wordCount = ref(0)
const readingTime = computed(() => {
  if (wordCount.value === 0) return 0
  return Math.ceil(wordCount.value / 200)
})

const calculateWordCount = async () => {
  await nextTick()
  
  setTimeout(() => {
    const content = document.querySelector('.vp-doc')
    if (content) {
      const text = content.innerText || content.textContent || ''
      const cleanText = text.replace(/\s+/g, '')
      wordCount.value = cleanText.length
    }
  }, 50)
}

watch(
  () => route.path,
  () => {
    wordCount.value = 0 
    calculateWordCount()
  },
  { immediate: true }
)

watch(
  () => page.value.filePath,
  () => {
    wordCount.value = 0
    calculateWordCount()
  },
  { immediate: true }
)

onMounted(() => {
  calculateWordCount()
})
</script>

<style scoped>
.reading-stats-container {
  width: 100%;
  margin: 1rem 0 2rem 0;
  display: flex;
  justify-content: flex-start;
  min-height: 1.2em;

  position: relative;
  z-index: 10;
}

.reading-stats-card {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  background: transparent;
  border: none;
  font-family: var(--vp-font-family-base);
  letter-spacing: 0.01em;
}

.stat-text {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.stat-text.placeholder {
  opacity: 0.5;
  font-style: italic;
}

.stat-separator {
  color: var(--vp-c-divider);
  font-weight: normal;
  margin: 0 0.25rem;
  opacity: 0.6;
}

.reading-stats-card:hover .stat-text:not(.placeholder) {
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.reading-stats-card:hover .stat-separator {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.dark .stat-text {
  color: var(--vp-c-text-3);
}

.dark .reading-stats-card:hover .stat-text:not(.placeholder) {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .reading-stats-container {
    margin: 0.75rem 0 1.5rem 0;
    min-height: 1.1em;
  }
  
  .reading-stats-card {
    font-size: 0.8rem;
    gap: 0.4rem;
  }
  
  .stat-separator {
    margin: 0 0.2rem;
  }
}
</style>

<style>
.vp-doc {
  position: relative;
}

.vp-doc .reading-stats-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(calc(var(--vp-layout-top, 0px) + 4rem));
  margin: 1rem 0 0 0;
}

.vp-doc > :not(.reading-stats-container):nth-child(n+2) {
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .vp-doc .reading-stats-container {
    transform: translateY(calc(var(--vp-layout-top, 0px) + 3rem));
  }
  
  .vp-doc > :not(.reading-stats-container):nth-child(n+2) {
    margin-top: 2.5rem;
  }
}
</style>