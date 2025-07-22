import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { Theme } from 'vitepress'
import CustomSidebar from './CustomSidebar.vue'
import MusicPlayer from './MusicPlayer.vue'
import './styles/custom.css'
import {
  NolebaseEnhancedReadabilitiesPlugin,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import MyLayout from './MyLayout.vue'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      locales: {
        'zh-CN': {
          title: {
            title: '阅读增强',
            titleAriaLabel: '阅读增强'
          },
          layoutSwitch: {
            title: '布局切换',
            titleAriaLabel: '布局切换',
            titleHelpMessage: '可以切换不同的布局模式来优化阅读体验',
            titleScreenNavWarningMessage: '该功能在移动设备上可能无法正常使用',
            optionFullWidth: '宽屏模式',
            optionFullWidthAriaLabel: '宽屏模式',
            optionFullWidthHelpMessage: '展开页面和内容的宽度',
            optionSidebarWidthAdjustableOnly: '侧边栏宽度可调',
            optionSidebarWidthAdjustableOnlyAriaLabel: '侧边栏宽度可调',
            optionSidebarWidthAdjustableOnlyHelpMessage: '只允许调整侧边栏的宽度',
            optionBothWidthAdjustable: '双宽度可调',
            optionBothWidthAdjustableAriaLabel: '双宽度可调',
            optionBothWidthAdjustableHelpMessage: '允许调整侧边栏和内容的宽度',
            optionOriginalWidth: '原始宽度',
            optionOriginalWidthAriaLabel: '原始宽度',
            optionOriginalWidthHelpMessage: '使用原始的页面宽度',
            contentLayoutMaxWidth: {
              title: '内容宽度',
              titleAriaLabel: '内容宽度',
              titleHelpMessage: '调整内容区域的最大宽度',
              titleScreenNavWarningMessage: '该功能在移动设备上可能无法正常使用',
              slider: '内容宽度滑块',
              sliderAriaLabel: '内容宽度滑块',
              sliderHelpMessage: '拖动滑块调整内容区域的宽度'
            },
            pageLayoutMaxWidth: {
              title: '页面宽度',
              titleAriaLabel: '页面宽度',
              titleHelpMessage: '调整整个页面的最大宽度',
              titleScreenNavWarningMessage: '该功能在移动设备上可能无法正常使用',
              slider: '页面宽度滑块',
              sliderAriaLabel: '页面宽度滑块',
              sliderHelpMessage: '拖动滑块调整整个页面的宽度'
            }
          },
          spotlight: {
            title: '聚光灯',
            titleAriaLabel: '聚光灯',
            titleHelpMessage: '高亮当前阅读的段落，降低其他内容的干扰',
            titleScreenNavWarningMessage: '该功能在移动设备上可能无法正常使用',
            optionOn: '开启',
            optionOnAriaLabel: '开启聚光灯',
            optionOnHelpMessage: '开启聚光灯模式',
            optionOff: '关闭',
            optionOffAriaLabel: '关闭聚光灯',
            optionOffHelpMessage: '关闭聚光灯模式',
            styles: {
              title: '聚光灯样式',
              titleAriaLabel: '聚光灯样式',
              titleHelpMessage: '选择聚光灯的显示样式',
              titleScreenNavWarningMessage: '该功能在移动设备上可能无法正常使用',
              optionUnder: '下方高亮',
              optionUnderAriaLabel: '下方高亮',
              optionUnderHelpMessage: '在内容下方显示高亮效果',
              optionAside: '侧边高亮',
              optionAsideAriaLabel: '侧边高亮',
              optionAsideHelpMessage: '在内容侧边显示高亮效果'
            }
          }
        }
      },
      layoutSwitch: {
        disableHelp: false,
        disableAnimation: false,
        defaultMode: 3,
        contentLayoutMaxWidth: {
          disableHelp: false,
          defaultMaxWidth: 100,
          disableAnimation: false,
        },
        pageLayoutMaxWidth: {
          disableHelp: false,
          defaultMaxWidth: 800,
          disableAnimation: false,
        }
      },
      spotlight: {
        disabled: false,
        disableHelp: false,
        hoverBlockColor: 'rgb(240 197 52 / 10%)',
        defaultToggle: false,
        defaultStyle: 2,
      },
    } as Options)

    app.component('MusicPlayer', MusicPlayer)

    app.provide('sidebarConfig', {
      persistState: true,
      animationDuration: 300
    })

    app.provide('musicPlayerConfig', {
      autoPlay: false,
      volume: 0.7,
      loop: false,
      shuffle: false
    })
  }
}