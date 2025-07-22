# Project Zomboid 服务器配置完全指南

::: warning 前置要求
阅读本教程前，请确保您已成功安装服务端并且能够通过游戏客户端正常连接服务器。
:::

## 📋 目录导航

- [前置知识](#前置知识)
- [配置文件概览](#配置文件概览)
- [配置修改流程](#配置修改流程)
- [核心配置详解](#核心配置详解)
- [高级配置技巧](#高级配置技巧)
- [故障排除](#故障排除)


## 前置知识

### 🗂️ 配置文件位置

#### 服务器端配置文件
```
文件管理 -> .cache/Server/
```

#### 客户端配置文件
```
C:\Users\[用户名]\Zomboid\Server\
```

::: tip 配置文件命名规则
- 文件名格式：`[服务器名称].ini`
- 例如：服务器名为"麦块联机免费服务器"，则配置文件为`麦块联机免费服务器.ini`
- 服务器名称可在**实例设置 → 服务器名称**处修改
:::

::: danger 重要提醒
修改服务器名称后，配置文件不会自动重命名！需要手动重命名配置文件，否则重启后会生成默认配置文件。
:::

## 配置文件概览

### 📁 主要配置文件说明

| 文件名 | 功能描述 | 重要程度 |
|--------|----------|----------|
| `servertest.ini` | 服务器基础配置 | ⭐⭐⭐⭐⭐ |
| `servertest_SandboxVars.lua` | 沙盒参数配置 | ⭐⭐⭐⭐⭐ |
| `servertest_spawnpoints.lua` | 自定义出生点 | ⭐⭐⭐ |
| `servertest_spawnregions.lua` | 出生区域定义 | ⭐⭐⭐ |

#### 1. `servertest.ini` - 服务器核心配置

**功能特点：**
- 🎮 控制PVP（玩家对战）模式
- 💬 设置聊天选项和欢迎信息
- 👥 管理最大玩家数量
- 🛡️ 配置安全系统和出生点
- ⏸️ 控制服务器在无玩家时的行为

#### 2. `servertest_SandboxVars.lua` - 沙盒参数配置

**功能特点：**
- 🧟 调整僵尸数量和强度
- 📦 设置资源丰富程度
- 🌤️ 控制天气变化速度
- ⚙️ 影响游戏体验的挑战性和真实性

#### 3. 出生点配置文件

**`spawnpoints.lua`：**
- 📍 自定义玩家出生点坐标
- 🎯 精确控制出生位置

**`spawnregions.lua`：**
- 🗺️ 定义可用作出生点的区域
- 🏘️ 包含 Muldraugh、Rosewood 等地区


## 配置修改流程

::: tip 推荐方法
建议先在游戏内修改配置文件，然后复制到服务器，这样可以避免语法错误。
:::

### 🎮 游戏内编辑流程

#### 步骤 1：建立服务器

![建立服务器](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=c5df7c7a79f760368813f4fe813c81f5)

1. 启动 Project Zomboid
2. 选择 **主持** 选项
3. 点击 **创建服务器**

#### 步骤 2：服务器设置

![服务器设置](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=4c93beeb1857bdc74dff36e6ccdbd18d)

1. 填写服务器基本信息
2. 设置服务器名称和描述
3. 配置玩家数量限制

#### 步骤 3：编辑配置文件

![编辑配置文件](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=9bb614a2896332eb9196b3fc8ebce177)

1. 点击 **服务器设置**
2. 进入 **沙盒设置**
3. 根据需要调整各项参数


## 核心配置详解

### 🔧 `.ini` 文件配置详解

#### 一、服务器基础信息

| 配置项 | 说明 | 默认值 | 建议值 |
|--------|------|--------|--------|
| `DefaultPort` | 玩家连接端口 | 16261 | 根据网络配置 |
| `PublicName` | 服务器显示名称 | - | 有意义的名称 |
| `PublicDescription` | 服务器描述 | - | 详细描述规则 |
| `Public` | 是否公开服务器 | false | 根据需要 |
| `Password` | 服务器密码 | - | 建议设置 |
| `PauseEmpty` | 无人时暂停 | true | 建议开启 |

::: details 配置示例
```ini
DefaultPort=16261
PublicName=我的PZ服务器
PublicDescription=欢迎来到我的僵尸世界！
Public=false
Password=mypassword123
PauseEmpty=true
```
:::

#### 二、Steam 集成设置

| 配置项 | 说明 | 推荐设置 |
|--------|------|----------|
| `UDPPort` | Steam通信端口 | DefaultPort + 1 |
| `MaxAccountsPerUser` | 每用户账号数 | 1 |
| `SteamScoreboard` | Steam用户名显示 | true |

#### 三、备份设置

| 配置项 | 说明 | 建议值 |
|--------|------|--------|
| `BackupsCount` | 最大备份数 | 10 |
| `BackupsOnStart` | 启动时备份 | true |
| `BackupsOnVersionChange` | 版本更新时备份 | true |
| `BackupsPeriod` | 自动备份间隔(小时) | 2 |

### 🏗️ 详细配置分类

#### 🎯 玩家管理设置
- **MaxPlayers**: 最大玩家数量
- **AllowCoop**: 是否允许合作模式
- **Open**: 服务器是否开放

#### 🔥 火焰与环境设置
- **FireSpread**: 火焰传播速度
- **FireExtinguish**: 火焰熄灭设置
- **PreventConstruction**: 阻止建筑

#### ⚔️ PVP战斗设置
- **PVP**: 是否启用PVP
- **PVPMode**: PVP模式类型
- **KillOnDamage**: 伤害击杀设置

#### 🏠 安全屋设置
- **SafehouseAllowTrepass**: 允许进入他人安全屋
- **SafehouseRemovalTime**: 安全屋移除时间
- **SafehouseDaysToClaim**: 声明安全屋所需天数

#### 💬 聊天与通信设置
- **ChatStreams**: 聊天频道设置
- **ChatMuted**: 聊天禁言设置
- **ChatMinLevel**: 聊天最低等级


### 🎮 `SandboxVars.lua` 文件配置

#### 一、游戏难度预设

| 预设名称 | 适用人群 | 特点 |
|----------|----------|------|
| `Beginner` | 新手玩家 | 资源丰富，僵尸较少 |
| `Normal` | 普通玩家 | 平衡的游戏体验 |
| `Hard` | 经验玩家 | 资源稀缺，僵尸众多 |
| `Survival` | 硬核玩家 | 极限生存挑战 |

#### 二、僵尸配置详解

**僵尸数量设置：**
- `ZombieCount`: 僵尸总数倍数 (0.1-4.0)
- `ZombieDistribution`: 僵尸分布类型
  - `1`: 城市重点
  - `2`: 平均分布
  - `3`: 随机分布

**僵尸行为设置：**
- `ZombieSpeed`: 僵尸移动速度
  - `1`: 缓慢行走
  - `2`: 快速行走
  - `3`: 疯狂冲刺
- `ZombieStrength`: 僵尸力量
- `ZombieToughness`: 僵尸韧性

#### 三、资源与物资设置

**食物资源：**
- `FoodLoot`: 食物丰富度 (极稀有-极丰富)
- `FoodRotSpeed`: 食物腐烂速度
- `FoodSpoilage`: 食物变质设置

**其他资源：**
- `OtherLoot`: 其他物品丰富度
- `MedicalLoot`: 医疗用品丰富度
- `WeaponLoot`: 武器丰富度

#### 四、环境与天气设置

**时间设置：**
- `StartYear`: 开始年份
- `StartMonth`: 开始月份
- `StartDay`: 开始日期
- `StartTime`: 开始时间

**天气设置：**
- `Rain`: 降雨频率
- `Temperature`: 温度设置
- `Fog`: 雾天频率


## 高级配置技巧

### 🚀 性能优化建议

#### 服务器性能配置
```ini
# 减少服务器负载
ZombieCount=1.0
ZombieDistribution=2
# 优化网络设置
MaxPlayers=20
PauseEmpty=true
```

#### 内存管理
```ini
# 备份设置优化
BackupsCount=5
BackupsPeriod=4
# 自动清理设置
HoursForCorpseRemoval=24
```

### 🎨 个性化设置

#### 创建主题服务器
```ini
# 快节奏PVP服务器
PVP=true
ZombieSpeed=3
ZombieCount=2.0
WeaponLoot=4
```

```ini
# 建筑重建服务器
AllowDestruction=false
PreventConstruction=false
SafehouseAllowTrepass=false
```

### 🔧 Mod 集成配置

#### 创意工坊设置
```ini
# 启用创意工坊
WorkshopItems=123456789;987654321
# Mod加载顺序
Mods=ModName1;ModName2;ModName3
```

## 故障排除

### ❌ 常见问题解决

#### 问题1：服务器无法启动
**可能原因：**
- 端口被占用
- 配置文件语法错误
- 权限不足

**解决方案：**
1. 检查端口占用情况
2. 验证配置文件语法
3. 确保运行权限

#### 问题2：玩家无法连接
**可能原因：**
- 防火墙阻止
- 端口未开放
- 密码错误

**解决方案：**
1. 配置防火墙规则
2. 开放相应端口
3. 确认密码设置

#### 问题3：配置不生效
**可能原因：**
- 配置文件未保存
- 服务器未重启
- 文件路径错误

**解决方案：**
1. 确保保存配置文件
2. 重启服务器
3. 检查文件路径

### 🔍 调试技巧

#### 日志查看
```
日志文件位置：.cache/Server/Logs/
重要日志：server.log, error.log
```

#### 配置验证
```bash
# 检查配置文件语法
cat servertest.ini | grep -E "^[^#;]"
```


## 📚 进阶学习资源

### 官方文档链接
- [Project Zomboid 官方服务器指南](https://projectzomboid.com/blog/news/2021/10/server-settings-guide/)
- [Steam 社区指南](https://steamcommunity.com/sharedfiles/filedetails/?id=2625070904)

### 社区资源
- **Reddit**: r/projectzomboid
- **Discord**: Project Zomboid 官方服务器
- **论坛**: The Indie Stone 官方论坛

### 推荐工具
- **PZ Server Manager**: 图形化服务器管理工具
- **RCON Tool**: 远程控制工具
- **Backup Scripts**: 自动备份脚本


::: tip 最佳实践建议
1. **定期备份**：设置自动备份，避免数据丢失
2. **渐进式修改**：每次只修改少量配置，便于问题定位
3. **测试环境**：在正式服务器上线前先在测试环境验证
4. **文档记录**：记录每次配置变更，便于回滚
5. **监控服务器**：定期检查服务器状态和性能
:::

::: warning 注意事项
- 所有配置修改后必须重启服务器才能生效
- 修改配置前请务必备份原文件
- 重要配置建议在测试环境先验证
- 定期检查官方更新，配置选项可能会发生变化
:::


**需要更多帮助？**
如需进一步了解特定配置选项，请参考官方文档或联系技术支持获取详细说明。