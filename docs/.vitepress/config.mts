import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Minekuai Wiki",
  description: "麦块官方文档",
  outDir: "dist",
  lang: "zh-CN",

 head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/logo.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/logo.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/logo.png",
      },
    ],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
  ],
  themeConfig: {

    logo:"/logo.png",
    
    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {
            /* ... */
          },
          searchOptions: {
            /* ... */
          },
        },
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "没有找到结果",
            resetButtonTitle: "清除搜索条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '了解更多',
        items: [
          { text: '团队', link: '/qq.md' },
        ] }
    ],
    
    sidebar: {
  '/': [
    {
      text: '开始使用',
      items: [
        { text: '首页', link: '/home' },
        { text: '如何上传文件', link: '/upload' },
        { text: '遇到问题了该怎么办', link: '/questions' },
        { text: '快速开始', link: '/quick-start' }
      ]
    },
    {
      text: '常见问题',
      collapsed: true,
      items: [
        { text: '如何使用SFTP', link: '/faq/sftp' },
        { text: '控制台提示 "Permission Denied"', link: '/faq/permission-denied' },
        { text: '控制台提示 "退出代码XXX"', link: '/faq/exit-code' }
      ]
    },
    {
      text: '游戏相关',
      collapsed: true,
      items: [
        { text: 'Minecraft Java',
          collapsed: true,
          items: [
            { text: '服务器介绍',
          collapsed: true,
          items: [
            { text: '主流服务端介绍与选择', link: '/games/mcje/introduction/introduction' },
            { text: 'server.properties详解', link: '/games/mcje/introduction/server-properties' },
            { text: '服务端文件结构', link: '/games/mcje/introduction/server-file-structure' },
            { text: '玩家数据存储与迁移指南', link:'/games/mcje/introduction/player-data'},
            { text: '服务器安全核心误区与防护策略', link:'/games/mcje/introduction/server-security'},
            { text: '服务器性能优化与调优指南', link:'/games/mcje/introduction/server-optimization'},
            { text: '整合包服务端安装指南', link:'/games/mcje/introduction/server-package'},
            { text: '服务器 JVM 调优完全指南', link:'/games/mcje/introduction/server-jvm-optimization'}
          ]
        },
            { text: '服务端常见问题',
          collapsed:true,
          items:[
            { text: '关闭正版验证', link: '/games/mcje/questions/disable-auth' },
            { text: '玩家op权限', link: '/games/mcje/questions/player-op' },
            { text: '开启死亡不掉落', link: '/games/mcje/questions/keep-inventory' },
            { text: '启用命令方块', link: '/games/mcje/questions/enable-command-block' },

          ]
        },
            { text: '存档保存及恢复',
          collapsed: true,
          items: [
            { text: '导入存档到服务器', link: '/games/mcje/save/save' },
            { text: '从服务端导出存档', link: '/games/mcje/save/restore' },
          ]
        },
          ]
        },
        { text: 'Minecraft Bedrock',
          collapsed: true,
          items: [
            //{ text: 'a', link: '/a' },
          ]
        },
        { text: 'Terraria',
          collapsed: true,
          items: [
            { text: '服务端介绍', link: '/games/terraria/introduction' },
            { text: '如何安装服务器', link: '/games/terraria/install' }
          ]
        },
        { text: '饥荒：联机版',
          collapsed: true,
          items: [
            //{ text: 'a', link: '/a' },
          ]
        },
        { text: '僵尸毁灭工程',
          collapsed: true,
          items: [
            { text: '开服教程（基础篇）', link: '/games/zombie-destruction/start' },
            { text: '开服教程（进阶篇）', link: '/games/zombie-destruction/advanced' }
          ]
        },
      ]
    },
    {
      text: '其他',
      collapsed: true,
      items: [
        { text: '服务条款与售后政策', link: '/others/eula' },
        { text: '咕咕咕', link: '/others/gugugu' }
      ]
    }

  ]
},

    socialLinks: [
      {
        icon: {
          svg: `
            <svg t="1752544086665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4426" width="200" height="200"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="4427"></path></svg>
          `
        },
        link: 'https://qm.qq.com/q/zti7OT9OJG',
        ariaLabel: 'QQ群'
      },
    {
    icon: {
      svg: `
        <svg t="1752477888651" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1617" width="200" height="200"><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 1 1 60.373333 60.373333l-78.037333 77.952L789.333333 256A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.813334L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="1618"></path></svg>
      `
    },
    link: 'https://space.bilibili.com/2057488615'
  }
],

    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2025154186号</a>`,
      copyright: `© ${new Date().getFullYear()} Minekuai Team. All rights reserved.`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: [2, 3],
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },

  vite: { 
    publicDir: "../public",

    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress',
        '@nolebase/ui',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui',
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: true
    }
  },

  

})