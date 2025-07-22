# MineKuai 服务端选择指南

::: tip 📋 前言
欢迎使用 MineKuai 平台进行服务器部署！为了帮助您选择最适合的服务端类型，以下为各类服务端的介绍、优缺点以及推荐使用场景。  
我们同时为不同的加载器（Forge/Fabric/NeoForge）推荐了最合适的服务端。
:::


## 📌 一、服务端类型一览表

| 名称 | 加载器支持 | 版本支持 | 插件支持 | 模组支持 | 适用场景 | 推荐程度 |
|------|-------------|-----------|-----------|------------|-------------|-----------|
| **Vanilla 原版** | 无 | 所有原版 | ❌ | ❌ | 原汁原味体验 | ✅ 推荐 |
| **Paper/Purpur** | 无 | 所有主流 | ✅ | ❌ | 原版插件服 | ✅ 推荐 |
| **Forge 官方服务端** | Forge | 所有 Forge | ❌ | ✅ | 标准模组服 | ✅ 推荐 |
| **NeoForge 官方服务端** | NeoForge | 1.20+ | ❌ | ✅ | 新版模组服 | ✅ 推荐 |
| **Fabric 官方服务端** | Fabric | 所有 Fabric | ❌ | ✅ | 轻量模组服 | ✅ 推荐 |
| **Arclight** | Forge / Fabric / NeoForge | 1.12.2 - 1.21.1 | ✅ | ✅ | 插件+模组混合服 | ⚠️ 稳定性有限 |
| **SpongeForge** | Forge | 1.8 / 1.12.2 / 1.16.5 / 1.19.4 / (测试中：1.20.6+, 1.21.1) | ✅ | ✅ | 高性能混合服 | ⚠️ 插件兼容性较低 |
| **Mohist** | Forge | 多数版本 | ✅ | ✅ | 简易混合服（不推荐） | ❌ 安全性差 |
| **CatServer** | Forge | 1.12.2 | ✅ | ✅ | 历史版本混合服 | ❌ 不推荐 |
| **Leaves** | 原版协议 | 1.18+ | ⚠️ 部分支持 | ❌ | 高性能轻量服 | ⚠️ 测试使用 |
| **Banner** | Fabric | 1.19.2 | ✅ | ✅ | 实验性混合服 | ❌ 不推荐 |


## 🧠 二、加载器推荐及说明

### 🔧 Forge
- 最常用模组加载器，拥有大量模组资源。
- 适用服务端：Forge 官方服务端、Arclight、SpongeForge、Mohist、CatServer。

### 🔧 NeoForge
- Forge 的分支版本，提升稳定性与可扩展性。
- 建议与 NeoForge 官方服务端 或 Arclight（NeoForge 分支）搭配使用。

### 🔧 Fabric
- 轻量级模组加载器，适合小型或高性能模组服。
- 适用服务端：Fabric 官方服务端、Banner（实验性）、Arclight（Fabric 分支）。


## ☕ 三、推荐 Java 版本对应表

| Minecraft 版本 | 推荐 Java 版本 |
|----------------|----------------|
| 1.7.10 - 1.16.5 | Java 8         |
| 1.17 - 1.20.4   | Java 17        |
| 1.20.5+         | Java 21        |

::: warning ⚠️ 注意:
使用错误的 Java 版本可能导致服务端无法启动！
:::

## 🚫 四、不推荐服务端说明

### ❌ Mohist
- **问题**：维护混乱、稳定性差、存在安全隐患。
- **不建议在生产环境使用。**

### ❌ CatServer
- **问题**：存在早期抄袭争议，已停止维护。
- **仅适用于特定旧版本服务器需求。**

### ❌ Banner
- **问题**：为实验性服务端，兼容性不佳，且维护不稳定。
- **仅建议开发者测试，不建议公开部署。**


## ✅ 五、推荐组合方案（按玩法）

| 玩法类型 | 推荐加载器 | 推荐服务端 | 特点 |
|----------|--------------|----------------|-------|
| 纯原版插件服 | 无 | Paper / Purpur | 高性能，稳定 |
| 模组生存服 | Forge / NeoForge | 官方 Forge / NeoForge | 兼容模组生态 |
| 模组 + 插件服 | Forge / Fabric | Arclight / SpongeForge | 混合支持 |
| 高性能轻量服 | 无 | Leaves | 支持少量功能拓展 |
| 开发测试服 | Fabric | Fabric / Banner | 快速构建测试环境 |

## 📝 六、常见问题解答 FAQ

### Q: 什么是 Arclight？
A: Arclight 是支持 Forge、NeoForge 和 Fabric 的混合型服务端，允许同时使用插件与模组。

### Q: 为什么不推荐 Mohist？
A: Mohist 存在诸多稳定性问题，且未经官方认证，不适合生产环境。

### Q: SpongeForge 与 Arclight 有什么区别？
A: SpongeForge 是以 Sponge API 运行的混合端，插件需为 Sponge 版本；Arclight 使用 Bukkit API，支持传统插件，兼容性更好。


## 📚 七、术语词典

| 名称 | 说明 |
|------|------|
| **插件（Plugin）** | 基于 Bukkit/Spigot/Paper 编写的拓展功能 |
| **模组（Mod）** | 需要 Forge/Fabric/NeoForge 加载的游戏修改包 |
| **混合端** | 同时支持插件与模组的服务端 |
| **加载器** | Forge/Fabric 等用于加载模组的框架 |
| **服务端（Server Jar）** | Minecraft 的后端核心，运行游戏世界的程序 |


## 反馈与支持

感谢您使用 MineKuai 平台！如有疑问，欢迎加入 [官方Q群](https://qm.qq.com/q/EIxCX5gzLy) 进行交流和反馈。

