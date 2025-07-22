<template>
  <DefaultTheme.Layout>
    <template #doc-after>
      <ReadingStats />
    </template>
    
    <template #nav-bar-content-after>
      <NolebaseEnhancedReadabilitiesMenu />
    </template>
    
    <template #nav-screen-content-after>
      <NolebaseEnhancedReadabilitiesScreenMenu />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ReadingStats from './ReadingStats.vue'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
</script>