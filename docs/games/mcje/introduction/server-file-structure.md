# Minecraft Java版服务端文件结构详解

::: tip 📋 概述
本文档详细介绍了不同类型 Minecraft Java版服务端的文件结构，帮助服务器管理员理解各文件的作用和管理方法。
:::

### 🎯 适用范围
- **原版服务端**（Vanilla）
- **模组服务端**（Fabric、Forge、NeoForge）
- **插件服务端**（Spigot、Paper）
- **混合服务端**（Arclight、CatServer）

## 🌟 Vanilla（原版）服务端

### 📸 文件结构预览

![Vanilla服务端文件结构](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=31fdb61c459e2eafd3009d9ae4a058d0)

::: info 提示
*图示为 Vanilla 1.20.1 服务端文件（根目录展示）*
:::
### 📂 文件说明

| 文件/文件夹 | 功能说明 | 重要程度 |
|------------|----------|----------|
| **libraries/** | Java库依赖，服务端运行必需组件 | ⭐⭐⭐⭐⭐ |
| **logs/** | 运行日志，按启动时间命名保存 | ⭐⭐⭐⭐ |
| **versions/** | 游戏版本文件及依赖项 | ⭐⭐⭐⭐⭐ |
| **world/** | 世界数据，可通过配置文件修改名称 | ⭐⭐⭐⭐⭐ |
| **banned-ips.json** | 封禁IP列表 | ⭐⭐⭐ |
| **banned-players.json** | 封禁玩家UUID列表 | ⭐⭐⭐ |
| **eula.txt** | 许可协议，需设置为 `eula=true` | ⭐⭐⭐⭐⭐ |
| **ops.json** | 管理员权限列表 | ⭐⭐⭐⭐ |
| **server-1.20.2.jar** | 服务端主程序 | ⭐⭐⭐⭐⭐ |
| **server.properties** | 核心配置文件 | ⭐⭐⭐⭐⭐ |
| **usercache.json** | 玩家UUID-用户名缓存 | ⭐⭐ |
| **whitelist.json** | 白名单玩家列表 | ⭐⭐⭐ |

### 🗂️ 目录结构树

```
Vanilla1.20.1/
├── libraries/               # Java库依赖（勿随意修改）
├── logs/                    # 运行日志
├── versions/                # 版本文件存储
├── world/                   # 游戏世界数据
├── banned-ips.json          # 封禁IP列表
├── banned-players.json      # 封禁玩家UUID列表
├── eula.txt                 # 许可协议文件
├── ops.json                 # 操作员权限列表
├── server-1.20.2.jar        # 服务端主程序
├── server.properties        # 核心配置文件
├── usercache.json           # 玩家缓存
└── whitelist.json           # 白名单列表
```


## 🧩 模组服务端

### Fabric 服务端

![Fabric服务端文件结构](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=4734f11833b239859dade87462414798)

::: info 提示
*图示为 Fabric 1.20.1-0.16.10 服务端文件*
:::

#### 🔍 核心差异

| 文件/文件夹 | 功能说明 | 注意事项 |
|------------|----------|----------|
| **.fabric/** | Fabric配置信息 | 包含模组加载顺序 |
| **mods/** | 模组文件存放目录 | 核心文件夹，必需 |
| **fabric-server-launch.jar** | Fabric启动程序 | 必须通过此文件启动 |
| **fabric-server-launcher.properties** | 启动配置 | 指定原版核心文件名 |
| **server.jar** | 原版核心文件 | 不可直接启动 |

#### 🚀 启动方式

```bash
java -Xms2G -Xmx4G -jar fabric-server-launch.jar nogui
```

::: warning ⚠️ 重要：
必须使用 `fabric-server-launch.jar` 启动，否则模组无法加载
:::

### Forge 服务端

#### Forge 1.17.1+ 版本

![Forge新版服务端](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=4e35e1db0c94e8617552c392cb047e63)

*图示为 Forge 1.20.1-47.3.29 服务端文件*

**核心特性：**
- 无独立启动文件，通过依赖库管理
- 支持高级配置和性能优化

**启动命令：**
```bash
# Linux/macOS
java -server -Xms2G -Xmx4G @libraries/net/minecraftforge/forge/1.20.1-47.3.29/unix_args.txt nogui

# Windows
java -server -Xms2G -Xmx4G @libraries/net/minecraftforge/forge/1.20.1-47.3.29/win_args.txt nogui
```

#### Forge 1.16.5- 版本

![Forge旧版服务端](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=d53f0df201ca766a4609c4b028aa032f)

*图示为 Forge 1.16.5-36.2.42 服务端文件*

**核心特性：**
- 需要独立的 `forge-*.jar` 文件启动
- 包含原版核心文件但不可直接使用

**启动命令：**
```bash
java -server -Xms2G -Xmx4G -jar forge-1.16.5-36.2.39.jar nogui
```


### NeoForge 服务端

NeoForge 的文件结构与 Forge 1.17.1+ 基本一致，主要差异在启动路径：

**启动命令差异：**
```bash
# 1.20.1版本（兼容Forge）
java -server -Xms2G -Xmx4G @libraries/net/neoforged/forge/1.20.1-47.1.106/unix_args.txt nogui

# 1.20.2+版本（NeoForge独立）
java -server -Xms2G -Xmx4G @libraries/net/neoforged/neoforge/20.6.115/unix_args.txt nogui
```

## 🔌 插件服务端（Bukkit系）

### Spigot 服务端

**核心特点：**
- 基于Bukkit的优化版本
- 良好的插件兼容性
- 适合中小型服务器

**文件结构：**
```
Spigot1.20.1/
├── plugins/          # 插件存放目录（核心）
├── spigot.jar        # 服务端主程序
├── server.properties # 基础配置文件
├── spigot.yml        # Spigot专属配置
├── ops.json          # 操作员列表
├── whitelist.json    # 白名单文件
├── logs/             # 运行日志
└── world/            # 世界文件夹
```

### Paper 服务端

**核心特点：**
- 基于Spigot的高性能版本
- 深度优化TPS和内存管理
- 适合大型服务器

**额外配置文件：**
- `paper.yml` - Paper核心配置
- `flags.txt` - JVM参数模板

**推荐启动命令：**
```bash
java @flags.txt -jar paper.jar nogui
```


## 🔀 混合服务端

### Arclight 服务端

![Arclight服务端](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=8f5a25321ed775ae96a402aa53fba238)

**核心特性：**
- Forge模组 + Spigot插件共存
- 基于现代Forge构建
- 支持1.17.1+版本

**文件结构特点：**
```
Arclight1.20.1/
├── .arclight/                   # Arclight配置
├── config/                      # Forge模组配置
├── mods/                        # Forge模组目录
├── plugins/                     # Spigot插件目录
├── arclight-forge-1.20.1.jar   # 启动核心
├── arclight.conf                # 主配置文件
├── bukkit.yml                   # Spigot配置
└── spigot.yml                   # 性能配置
```

### CatServer 服务端

![CatServer服务端](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=e85f27f6ce8303f64a7e1be37faeae25)

**核心特性：**
- 适用于1.12.2-1.16.5版本
- Forge模组 + Bukkit插件支持
- 包含特殊的foxlaunch组件

**注意事项：**
- 主要支持旧版本
- 新项目建议使用Arclight
- 需要严格测试兼容性

## 🛠️ 管理建议

### 📋 文件管理最佳实践

1. **定期备份**
   - 重点备份：`world/`、配置文件
   - 备份频率：每日或每周

2. **日志监控**
   - 定期检查 `logs/latest.log`
   - 关注错误和警告信息

3. **配置版本控制**
   - 使用Git管理配置文件
   - 记录重要修改

### ⚡ 性能优化

1. **内存分配**
   ```bash
   # 小型服务器（1-10人）
   java -Xms1G -Xmx2G -jar server.jar
   
   # 中型服务器（10-50人）
   java -Xms2G -Xmx4G -jar server.jar
   
   # 大型服务器（50+人）
   java -Xms4G -Xmx8G -jar server.jar
   ```

2. **JVM参数优化**
   ```bash
   java -XX:+UseG1GC -XX:G1HeapRegionSize=4M -Xms4G -Xmx4G -jar server.jar
   ```

### 🔧 故障排除

1. **启动失败**
   - 检查eula.txt是否同意协议
   - 验证Java版本兼容性
   - 查看logs目录错误信息

2. **模组/插件冲突**
   - 逐个禁用测试
   - 检查版本兼容性
   - 查阅官方文档
