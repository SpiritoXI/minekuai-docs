# 泰拉瑞亚服务端完全指南

:::tip 📋 服务端概览

泰拉瑞亚多人服务器有两种主要的服务端选择，每种都有其独特的优势和适用场景：

| 服务端 | 主要功能 | 适用场景 |
|--------|----------|----------|
| **TShock** | 插件系统 + 管理功能 | 服务器管理、权限控制 |
| **tModLoader** | 模组支持 + 内容扩展 | 游戏内容拓展、新玩法 |

:::

## 🔧 TShock 服务端

<h3><img src="https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=fdb02eb9bb3ecec924903bc2fd8fc3b0" alt="TShock" width="32"> 管理型服务端</h3>

![TShock 示例图](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=602810b9bd0d8001b03d192983b8db60)

### ✨ 核心特性
- **🔌 插件系统**：支持丰富的服务器插件
- **👑 权限管理**：精细化玩家权限控制
- **🛡️ 反作弊**：内置多种反作弊机制
- **📊 数据库**：支持 MySQL/SQLite 数据存储
- **🎮 命令系统**：完整的管理员命令集

### 🎯 适用场景
- ✅ 公共服务器运营
- ✅ 需要玩家权限管理
- ✅ 要求反作弊保护
- ✅ 服务器自动化管理
- ✅ 经济系统搭建

### 📦 推荐插件
- **SEconomy**：经济系统
- **Regions**：区域保护
- **AutoBroadcast**：自动广播
- **RestInventory**：背包保护

### 🔗 官方资源
- [GitHub 仓库](https://github.com/Pryaxis/TShock/releases)
- [插件市场](https://tshock.co/xf/index.php?forums/plugins.7/)


## 🎮 tModLoader 服务端

<h3><img src="https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=1bc9a96bc8536f1f3f03fa5f9e5d5830" alt="TModLoader" width="32"> 模组型服务端</h3>

![TModLoader 示例图](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=bfcd9c636ad30c8f2678d30838017b74)

### ✨ 核心特性
- **🔄 模组支持**：完整的游戏模组加载
- **🎨 内容扩展**：新武器、敌人、生物群系
- **🔗 创意工坊**：Steam 创意工坊集成
- **🤝 模组同步**：服务器自动同步模组
- **⚡ 性能优化**：针对模组环境优化

### 🎯 适用场景
- ✅ 大型内容模组包
- ✅ 全新游戏体验
- ✅ 朋友间小规模联机
- ✅ 模组开发测试
- ✅ 特殊玩法探索

### 🌟 热门模组
- **Calamity Mod**：大型内容扩展
- **Thorium Mod**：新职业和内容
- **Spirit Mod**：均衡的内容添加
- **Magic Storage**：存储系统优化

### 🔗 官方资源
- [官方网站](https://tmodloader.net/)
- [Steam 页面](https://store.steampowered.com/app/1281930/tModLoader/)


## 🤔 如何选择服务端？

### 📊 决策矩阵

| 考虑因素 | TShock | tModLoader |
|----------|--------|------------|
| **服务器管理** | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **内容丰富度** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **学习成本** | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **稳定性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **扩展性** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### 🎯 场景推荐

#### 选择 TShock 如果您需要：
- 🏢 运营公共服务器
- 👥 管理大量玩家
- 🛡️ 防止作弊行为
- 💰 搭建经济系统
- 🏗️ 保护建筑区域

#### 选择 tModLoader 如果您需要：
- 🎮 体验全新游戏内容
- 🔄 使用大型模组包
- 👫 朋友间私人联机
- 🎨 探索创意玩法
- 📦 测试模组兼容性


## ⚙️ 安装配置指南

### TShock 快速部署
1. 下载 TShock 服务端
2. 配置 `tshock/config.json`
3. 设置管理员权限
4. 安装必要插件

### tModLoader 快速部署
1. 安装 tModLoader
2. 订阅所需模组
3. 配置服务器设置
4. 启动并测试连接

## 🔧 常见问题

### TShock 相关
**Q: 如何设置管理员？**
A: 使用命令 `/user add 用户名 密码 superadmin`

**Q: 插件不生效怎么办？**
A: 检查插件版本兼容性和配置文件

### tModLoader 相关
**Q: 模组同步失败？**
A: 确保客户端和服务端模组版本一致

**Q: 服务器启动缓慢？**
A: 减少模组数量或升级服务器硬件


## 🚀 性能优化建议

### 硬件要求
- **CPU**: 2核心以上
- **内存**: 最低 2GB，推荐 4GB+
- **存储**: SSD 推荐
- **网络**: 稳定的上行带宽

### 软件优化
- 定期重启服务器
- 监控内存使用情况
- 及时更新服务端版本
- 清理过期数据