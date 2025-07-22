<template>
  <DefaultTheme.Layout>
    <template #doc-top>
      <div class="custom-doc-wrapper">
      </div>
    </template>
    
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
    </template>
    
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>

    <template #layout-bottom>
      <MusicPlayer />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import MusicPlayer from './MusicPlayer.vue'

const route = useRoute()

let observer = null

onMounted(() => {
  addStatsToPage()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

watch(() => route.path, () => {
  cleanupStats()
  nextTick(() => {
    addStatsToPage()
  })
})

const cleanupStats = () => {
  const existing = document.querySelector('.sync-reading-stats')
  if (existing) {
    existing.remove()
  }

  if (observer) {
    observer.disconnect()
    observer = null
  }
}

const addStatsToPage = () => {
  const existingH1 = document.querySelector('.vp-doc h1')
  if (existingH1) {
    insertReadingStats(existingH1)
    return
  }
  
  observer = new MutationObserver((mutations, obs) => {
    const h1 = document.querySelector('.vp-doc h1')
    if (h1) {
      obs.disconnect()
      observer = null
      insertReadingStats(h1)
    }
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  setTimeout(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    
    const h1 = document.querySelector('.vp-doc h1')
    if (h1 && !document.querySelector('.sync-reading-stats')) {
      insertReadingStats(h1)
    }
  }, 1000) 
}

const insertReadingStats = (h1) => {
  const existing = document.querySelector('.sync-reading-stats')
  if (existing) {
    return
  }

  const content = document.querySelector('.vp-doc')
  let wordCount = 0
  if (content) {
    const text = content.innerText || content.textContent || ''
    const cleanText = text.replace(/\s+/g, '')
    wordCount = cleanText.length
  }
  
  const readingTime = Math.ceil(wordCount / 200)
  
  const statsDiv = document.createElement('div')
  statsDiv.className = 'sync-reading-stats'
  statsDiv.innerHTML = `
    <div class="stats-content">
      <span class="stat-text">${wordCount > 0 ? wordCount.toLocaleString() : '计算中...'} 字</span>
      <span class="stat-separator">·</span>
      <span class="stat-text">${readingTime > 0 ? readingTime : '...'} 分钟阅读</span>
    </div>
  `
  
  h1.insertAdjacentElement('afterend', statsDiv)
  
  if (wordCount === 0) {
    setTimeout(() => {
      updateStatsContent()
    }, 200)
  }
}

const updateStatsContent = () => {
  const statsDiv = document.querySelector('.sync-reading-stats')
  if (!statsDiv) return
  
  const content = document.querySelector('.vp-doc')
  let wordCount = 0
  if (content) {
    const text = content.innerText || content.textContent || ''
    const cleanText = text.replace(/\s+/g, '')
    wordCount = cleanText.length
  }
  
  const readingTime = Math.ceil(wordCount / 200)

  const statsContent = statsDiv.querySelector('.stats-content')
  if (statsContent && wordCount > 0) {
    statsContent.innerHTML = `
      <span class="stat-text">${wordCount.toLocaleString()} 字</span>
      <span class="stat-separator">·</span>
      <span class="stat-text">${readingTime} 分钟阅读</span>
    `
  }
}
</script>

<style>
.sync-reading-stats {
  width: 100%;
  margin: 1rem 0 2rem 0;
  display: flex;
  justify-content: flex-start;
}

.stats-content {
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

.sync-reading-stats .stat-text {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.sync-reading-stats .stat-separator {
  color: var(--vp-c-divider);
  font-weight: normal;
  margin: 0 0.25rem;
  opacity: 0.6;
}

.stats-content:hover .stat-text {
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.stats-content:hover .stat-separator {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.dark .sync-reading-stats .stat-text {
  color: var(--vp-c-text-3);
}

.dark .stats-content:hover .stat-text {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .sync-reading-stats {
    margin: 0.75rem 0 1.5rem 0;
  }
  
  .stats-content {
    font-size: 0.8rem;
    gap: 0.4rem;
  }
  
  .sync-reading-stats .stat-separator {
    margin: 0 0.2rem;
  }
}
</style>