# Minecraft server.properties 配置文件完全指南

::: tip 📋 概述
`server.properties` 是 Minecraft Java版服务器的核心配置文件，控制着服务器的各项功能和行为。本指南将详细介绍每个配置项的作用和推荐设置。
:::
:::danger ⚠️ 重要提示：
修改配置后需要重启服务器才能生效
:::

## 🌐 网络设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `server-ip` | 空 | 字符串 | 服务器绑定IP（留空表示绑定所有网络接口） |
| `server-port` | `25565` | 整数 | 服务器主端口 |
| `query.port` | `25565` | 整数 | 查询服务端口 |
| `rcon.port` | `25575` | 整数 | RCON远程控制端口 |
| `network-compression-threshold` | `256` | 整数 | 网络压缩阈值（字节），0=始终压缩，-1=禁用 |
| `prevent-proxy-connections` | `false` | 布尔 | 是否阻止通过代理连接 |

### 🔧 网络优化建议
- **压缩阈值**：建议设置为 `256`，平衡性能和带宽
- **端口设置**：确保防火墙开放相应端口


## 🏷️ 基础设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `motd` | `A Minecraft Server` | 字符串 | 服务器描述（在服务器列表中显示） |
| `server-name` | `Unknown Server` | 字符串 | 服务器名称（RCON中显示） |
| `max-players` | `20` | 整数 | 服务器最大玩家容量 |
| `online-mode` | `true` | 布尔 | **重要**：是否启用正版验证 |
| `difficulty` | `easy` | 字符串 | 游戏难度 |
| `gamemode` | `survival` | 字符串 | 默认游戏模式 |
| `force-gamemode` | `false` | 布尔 | 是否强制玩家使用默认游戏模式 |
| `hardcore` | `false` | 布尔 | 是否启用极限模式 |
| `pvp` | `true` | 布尔 | 是否允许玩家对战 |
| `allow-flight` | `false` | 布尔 | 是否允许飞行 |

### 📝 配置说明

#### 游戏难度选项
- `peaceful` - 和平模式（无怪物）
- `easy` - 简单模式
- `normal` - 普通模式（推荐）
- `hard` - 困难模式

#### 游戏模式选项
- `survival` - 生存模式（推荐）
- `creative` - 创造模式
- `adventure` - 冒险模式
- `spectator` - 观察者模式


## 🌍 世界设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `level-name` | `world` | 字符串 | 世界文件夹名称 |
| `level-seed` | 空 | 字符串 | 世界生成种子 |
| `level-type` | `minecraft:normal` | 字符串 | 世界类型 |
| `generator-settings` | `{}` | JSON | 自定义世界生成器设置 |
| `generate-structures` | `true` | 布尔 | 是否生成结构（村庄、要塞等） |
| `allow-nether` | `true` | 布尔 | 是否允许下界 |
| `max-world-size` | `29999984` | 整数 | 世界最大半径（方块） |
| `spawn-protection` | `16` | 整数 | 出生点保护半径 |

### 🗺️ 世界类型说明

| 类型 | 说明 |
|------|------|
| `minecraft:normal` | 标准世界生成 |
| `minecraft:flat` | 超平坦世界 |
| `minecraft:large_biomes` | 大型生物群系 |
| `minecraft:amplified` | 放大化世界（需要强劲硬件） |

## ⚡ 性能设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `view-distance` | `10` | 整数 | **重要**：玩家视距（区块数，2-32） |
| `simulation-distance` | `10` | 整数 | 服务器模拟距离（区块数，3-32） |
| `max-tick-time` | `60000` | 整数 | 单tick最大处理时间（毫秒） |
| `max-chained-neighbor-updates` | `1000000` | 整数 | 连锁更新最大次数 |
| `sync-chunk-writes` | `true` | 布尔 | 同步区块写入 |
| `use-native-transport` | `true` | 布尔 | 使用本地传输优化（Linux） |
| `entity-broadcast-range-percentage` | `100` | 整数 | 实体广播范围百分比 |

### 🎯 性能优化推荐

#### 根据服务器规模调整
| 服务器规模 | view-distance | simulation-distance | max-players |
|-----------|---------------|-------------------|-------------|
| **小型**（1-10人） | `6-8` | `6-8` | `10-20` |
| **中型**（10-30人） | `8-10` | `8-10` | `30-50` |
| **大型**（30+人） | `6-8` | `6-8` | `50+` |

## 👑 权限管理

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `enable-command-block` | `false` | 布尔 | 是否启用命令方块 |
| `function-permission-level` | `2` | 整数 | 函数执行权限等级（1-4） |
| `op-permission-level` | `4` | 整数 | OP权限等级（1-4） |
| `white-list` | `false` | 布尔 | 是否启用白名单 |
| `enforce-whitelist` | `false` | 布尔 | 是否强制执行白名单 |
| `broadcast-console-to-ops` | `true` | 布尔 | 是否向OP广播控制台消息 |

### 🔒 权限等级说明

| 等级 | 权限描述 |
|------|----------|
| `1` | 绕过重生点保护 |
| `2` | 使用命令方块，/clear、/difficulty、/effect、/gamemode、/gamerule、/give、/summon、/setblock 和 /tp |
| `3` | 使用 /ban、/deop、/kick 和 /op |
| `4` | 使用 /stop |


## 🛡️ 安全设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `enforce-secure-profile` | `true` | 布尔 | 强制安全配置文件（1.19+） |
| `log-ips` | `true` | 布尔 | 是否记录玩家IP地址 |
| `text-filtering-config` | 空 | 字符串 | 文本过滤配置文件路径 |
| `hide-online-players` | `false` | 布尔 | 是否隐藏在线玩家列表 |
| `rate-limit` | `0` | 整数 | 连接速率限制（数据包/秒，0=无限制） |


## 📦 资源包设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `resource-pack` | 空 | 字符串 | 资源包下载URL |
| `resource-pack-sha1` | 空 | 字符串 | 资源包SHA1校验值 |
| `require-resource-pack` | `false` | 布尔 | 是否强制要求资源包 |
| `resource-pack-prompt` | 空 | 字符串 | 资源包提示信息（支持JSON格式） |
| `resource-pack-id` | 空 | 字符串 | 资源包唯一标识符（1.20.3+） |

### 💡 资源包配置示例

```properties
resource-pack=https://example.com/resourcepack.zip
resource-pack-sha1=abc123def456...
require-resource-pack=true
resource-pack-prompt={"text":"请安装服务器资源包","color":"gold"}
```


## 🔧 高级设置

| 配置项 | 默认值 | 类型 | 说明 |
|--------|--------|------|------|
| `enable-jmx-monitoring` | `false` | 布尔 | 启用JMX监控 |
| `enable-query` | `false` | 布尔 | 启用查询服务 |
| `enable-rcon` | `false` | 布尔 | 启用RCON远程控制 |
| `rcon.password` | 空 | 字符串 | RCON密码 |
| `enable-status` | `true` | 布尔 | 启用服务器状态查询 |
| `player-idle-timeout` | `0` | 整数 | 玩家空闲超时（分钟，0=禁用） |

### 🖥️ RCON配置示例

```properties
enable-rcon=true
rcon.port=25575
rcon.password=your_secure_password_here
```


## ⚠️ 重要注意事项

### 🚨 关键配置警告

1. **MOTD中文显示**
   - ❌ **错误**：直接输入中文会显示乱码
   - ✅ **正确**：使用 [MOTD生成工具](https://motd.gg) 生成正确格式
   
2. **世界名称限制**
   - ❌ **错误**：`level-name=我的世界`
   - ✅ **正确**：`level-name=myworld`
   - 🔥 **警告**：中文世界名会导致服务器无法启动

3. **正版验证变更**
   - ⚠️ **重要**：服务器运行后不建议修改 `online-mode`
   - 📝 **原因**：会导致玩家UUID变更，造成数据丢失
   - 🔗 **参考**：[UUID详解](https://minecraft.fandom.com/zh/wiki/通用唯一识别码)

### 💡 最佳实践

1. **备份配置**：修改前先备份 `server.properties`
2. **逐步调整**：一次只修改少量配置项
3. **性能监控**：关注TPS和内存使用情况
4. **日志检查**：修改后查看启动日志是否有错误


## 🛠️ 配置模板

### 🏠 小型服务器

```properties
# 基础设置
motd=\\u00A76\\u00A7l我的家庭服务器
max-players=10
difficulty=normal
gamemode=survival

# 性能优化
view-distance=8
simulation-distance=8
max-tick-time=60000

# 安全设置
online-mode=true
white-list=true
spawn-protection=16
```

### 🏢 公共服务器（大型）

```properties
# 基础设置
motd=\\u00A7a\\u00A7l欢迎来到我们的服务器！
max-players=100
difficulty=normal
gamemode=survival

# 性能优化
view-distance=6
simulation-distance=8
entity-broadcast-range-percentage=80

# 安全设置
online-mode=true
enforce-secure-profile=true
rate-limit=300
player-idle-timeout=30
```


## 🔧 故障排除

### 常见问题

**Q: 服务器启动失败？**

A: 检查以下项目：
- `level-name` 是否包含中文或特殊字符
- 端口是否被占用
- `eula.txt` 是否设置为 `eula=true`

**Q: 中文MOTD显示乱码？**

A: 使用Unicode转义序列或MOTD生成工具

**Q: 玩家连接失败？**

A: 检查：
- `online-mode` 设置是否正确
- 网络端口是否开放
- 白名单设置


## 📞 技术支持

如果在配置过程中遇到问题：

- **官方交流群**：[1034218113](https://qm.qq.com/q/AYUOV0zW6s "1034218113")
- **官方工单系统**：[客服中心](https://minekuai.com/tickets "客服中心")（工单会在三个工作日内回复）
- **实时客服**：工作时间 9:00-18:00

## 🔗 相关文档

- [服务端文件结构详解](https://doc.liuliyue.cn/web/#/638364699/269884874)
- [性能优化指南](https://doc.liuliyue.cn/web/#/638364699/269884924)
- [插件安装指南](https://doc.liuliyue.cn/web/#/638364699/269884924)
- [权限管理教程](https://doc.liuliyue.cn/web/#/638364699/269884924)
