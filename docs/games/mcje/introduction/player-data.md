# Minecraft 玩家数据存储机制与迁移指南

::: tip 📋 概述
本指南详细介绍 Minecraft Java版（1.7.6+）服务器中玩家数据的存储机制、UUID体系以及数据迁移的完整流程。
:::

### 🎯 适用范围
- **版本支持**：Minecraft Java版 1.7.6 及以上版本
- **服务端类型**：原版、Paper、Spigot、Fabric、Forge 等
- **验证模式**：离线验证、正版验证、第三方验证


## 🔑 UUID 系统核心机制

### 📊 UUID 生成规则

Minecraft 服务器中的玩家数据完全基于 **UUID（唯一标识符）** 体系：

| 验证模式 | UUID 来源 | 特点 |
|---------|-----------|------|
| **正版验证** | Mojang 官方分配 | 全球唯一，跨服务器通用 |
| **离线验证** | 服务器本地生成 | 基于玩家名生成，不同服务器可能不同 |
| **第三方验证** | AuthMe 等插件 | 独立的 UUID 体系 |
| **基岩版互通** | Geyser 转换 | 根据配置决定是否与 Java 版通用 |

### ⏰ UUID 缓存机制

**正版验证模式下**：
- UUID 由 Mojang 服务器提供，永久有效
- 本地缓存在 `usercache.json` 中，默认保存 30 天
- 缓存过期不影响玩家数据，只需重新查询

**离线验证模式下**：
- UUID 根据玩家名算法生成：`UUID.nameUUIDFromBytes(("OfflinePlayer:" + playerName).getBytes("UTF-8"))`
- 相同玩家名在所有离线服务器上具有相同 UUID


## 📁 数据存储结构

### 🗂️ 关键文件说明

#### usercache.json
**位置**：服务器根目录  
**功能**：存储玩家名与UUID的映射关系和缓存时间

```json
[
  {
    "name": "kawaii_Elaina",
    "uuid": "78a610e7-9107-4653-94b6-0a366ea5b950",
    "expiresOn": "2024-07-27 00:11:19 +0800"
  }
]
```

#### playerdata 文件夹
**位置**：`world/playerdata/`  
**功能**：存储玩家的所有游戏数据

```
world/playerdata/
├── 78a610e7-9107-4653-94b6-0a366ea5b950.dat      # 主数据文件
├── 78a610e7-9107-4653-94b6-0a366ea5b950.dat_old  # 备份文件
└── [其他玩家的UUID].dat
```

**数据内容包括**：
- 玩家位置坐标
- 背包物品
- 生命值、饥饿度
- 经验值、等级
- 药水效果
- 成就进度

### 🏗️ 完整文件结构

```
服务器根目录/
├── usercache.json              # 玩家UUID缓存
├── ops.json                    # 管理员列表（基于UUID）
├── whitelist.json              # 白名单（基于UUID）
├── banned-players.json         # 封禁列表（基于UUID）
└── world/
    ├── playerdata/
    │   ├── [UUID].dat          # 玩家数据
    │   └── [UUID].dat_old      # 备份数据
    ├── stats/
    │   └── [UUID].json         # 统计数据
    └── advancements/
        └── [UUID].json         # 成就进度
```


## 🔄 玩家数据迁移实操

### 💡 迁移原理

玩家数据迁移本质上是 **UUID 关联关系的重新建立**，主要方法：

1. **文件重命名法**：直接修改 `.dat` 文件名
2. **UUID 映射法**：修改 `usercache.json` 映射关系
3. **插件工具法**：使用专业插件自动化处理

### 🛠️ 方法一：直接文件迁移（推荐）

**场景**：将玩家 A 的数据完全转移给玩家 B

#### 前置条件
1. **停止服务器**：确保数据文件不被占用
2. **获取目标UUID**：确定玩家 B 的 UUID
3. **备份数据**：复制整个 `playerdata` 文件夹

#### 操作步骤

1. **查找源UUID**
   ```bash
   # 查看 usercache.json 找到玩家 A 的 UUID
   grep -i "玩家A" usercache.json
   ```

2. **执行文件迁移**
   ```bash
   # 进入 playerdata 目录
   cd world/playerdata/
   
   # 备份原数据
   cp A的UUID.dat A的UUID.dat.backup
   cp A的UUID.dat_old A的UUID.dat_old.backup
   
   # 删除玩家B的旧数据（如果存在）
   rm -f B的UUID.dat B的UUID.dat_old
   
   # 重命名文件
   mv A的UUID.dat B的UUID.dat
   mv A的UUID.dat_old B的UUID.dat_old
   ```

3. **更新缓存文件**
   编辑 `usercache.json`，更新或添加玩家 B 的记录：
   ```json
   {
     "name": "玩家B",
     "uuid": "B的UUID",
     "expiresOn": "2024-12-31 23:59:59 +0800"
   }
   ```

### 🔧 方法二：批量迁移脚本

对于多玩家数据迁移，可使用自动化脚本：

```python
#!/usr/bin/env python3
import json
import shutil
import os
from pathlib import Path

def migrate_player_data(old_uuid, new_uuid, world_path):
    """迁移玩家数据"""
    playerdata_path = Path(world_path) / "playerdata"
    
    # 文件路径
    old_dat = playerdata_path / f"{old_uuid}.dat"
    old_dat_old = playerdata_path / f"{old_uuid}.dat_old"
    new_dat = playerdata_path / f"{new_uuid}.dat"
    new_dat_old = playerdata_path / f"{new_uuid}.dat_old"
    
    # 执行迁移
    if old_dat.exists():
        shutil.copy2(old_dat, new_dat)
        print(f"已迁移: {old_dat} -> {new_dat}")
    
    if old_dat_old.exists():
        shutil.copy2(old_dat_old, new_dat_old)
        print(f"已迁移: {old_dat_old} -> {new_dat_old}")

# 使用示例
migrate_player_data(
    "旧UUID", 
    "新UUID", 
    "/path/to/world"
)
```

### 🔄 方法三：验证模式切换

**场景**：从离线验证切换到正版验证

#### 准备工作
1. **获取正版UUID**：使用在线工具查询玩家的正版UUID
2. **映射关系表**：建立离线UUID到正版UUID的对应关系

#### 批量转换流程

```bash
#!/bin/bash
# 离线验证转正版验证脚本

WORLD_PATH="./world"
PLAYERDATA_PATH="$WORLD_PATH/playerdata"

# UUID映射关系（离线UUID:正版UUID）
declare -A UUID_MAPPING
UUID_MAPPING["离线UUID1"]="正版UUID1"
UUID_MAPPING["离线UUID2"]="正版UUID2"

# 执行迁移
for offline_uuid in "${!UUID_MAPPING[@]}"; do
    online_uuid="${UUID_MAPPING[$offline_uuid]}"
    
    if [[ -f "$PLAYERDATA_PATH/$offline_uuid.dat" ]]; then
        cp "$PLAYERDATA_PATH/$offline_uuid.dat" "$PLAYERDATA_PATH/$online_uuid.dat"
        cp "$PLAYERDATA_PATH/$offline_uuid.dat_old" "$PLAYERDATA_PATH/$online_uuid.dat_old"
        echo "已迁移: $offline_uuid -> $online_uuid"
    fi
done
```


## 🔍 特殊情况处理

### 🧩 插件服务器迁移

某些插件会独立存储玩家数据，需要额外处理：

#### 经济插件（Vault/EssentialsX）
```yaml
# EssentialsX 配置示例
# userdata/玩家UUID.yml
money: 1000.0
homes:
  home1:
    world: world
    x: 100.0
    y: 64.0
    z: 200.0
```

#### 权限插件（LuckPerms）
```sql
-- LuckPerms 数据库迁移示例
UPDATE luckperms_players 
SET uuid = '新UUID' 
WHERE uuid = '旧UUID';
```

### 🌐 跨服务器迁移

**使用专业工具**：
- **WorldEdit**：可导出玩家背包和位置
- **ChestCommands**：保存自定义GUI数据
- **PlayerDataBackup**：专业的玩家数据备份插件

```yaml
# PlayerDataBackup 配置示例
backup:
  playerdata: true
  stats: true
  advancements: true
  plugin-data: true
```


## ⚠️ 风险控制与最佳实践

### 🛡️ 安全预防措施

1. **全量备份**
   ```bash
   # 备份整个服务器目录
   tar -czf server_backup_$(date +%Y%m%d_%H%M%S).tar.gz ./server/
   
   # 仅备份玩家数据
   tar -czf playerdata_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
       ./world/playerdata/ ./usercache.json ./ops.json ./whitelist.json
   ```

2. **测试环境验证**
   - 在测试服务器上先行验证迁移流程
   - 确认所有功能正常后再在生产环境执行

3. **分步骤执行**
   - 不要一次性迁移大量玩家
   - 每次迁移后检查服务器稳定性

### 📊 数据完整性检查

#### 验证脚本
```python
import os
import json
from pathlib import Path

def verify_player_data(world_path):
    """验证玩家数据完整性"""
    playerdata_path = Path(world_path) / "playerdata"
    usercache_path = Path("usercache.json")
    
    # 读取缓存文件
    with open(usercache_path, 'r', encoding='utf-8') as f:
        cache_data = json.load(f)
    
    # 检查数据文件
    for entry in cache_data:
        uuid = entry['uuid']
        name = entry['name']
        
        dat_file = playerdata_path / f"{uuid}.dat"
        if not dat_file.exists():
            print(f"警告: 玩家 {name} ({uuid}) 缺少数据文件")
        else:
            file_size = dat_file.stat().st_size
            if file_size < 100:  # 文件过小可能损坏
                print(f"警告: 玩家 {name} 数据文件异常（大小: {file_size} 字节）")

# 使用示例
verify_player_data("./world")
```

### 🔧 故障恢复

#### 常见问题及解决方案

| 问题现象 | 可能原因 | 解决方案 |
|---------|---------|----------|
| **玩家数据丢失** | UUID不匹配 | 检查usercache.json和文件名是否一致 |
| **背包物品消失** | .dat文件损坏 | 从.dat_old备份文件恢复 |
| **位置异常** | 坐标数据错误 | 手动编辑NBT数据或重置位置 |
| **权限失效** | 插件UUID映射错误 | 更新插件数据库中的UUID记录 |

#### 紧急恢复流程
```bash
# 1. 停止服务器
systemctl stop minecraft

# 2. 恢复备份
cp playerdata_backup/* ./world/playerdata/
cp usercache_backup.json ./usercache.json

# 3. 检查文件权限
chmod -R 755 ./world/playerdata/
chown -R minecraft:minecraft ./world/

# 4. 启动服务器
systemctl start minecraft
```


## 🧰 实用工具推荐

### 📋 在线工具

- **UUID查询**：[UUID Lookup](https://mcuuid.net/) - 查询正版玩家UUID
- **NBT编辑器**：[NBTExplorer](https://github.com/jaquadro/NBTExplorer) - 编辑玩家数据文件
- **JSON验证**：[JSONLint](https://jsonlint.com/) - 验证usercache.json格式

### 🔌 推荐插件

| 插件名称 | 功能 | 适用场景 |
|---------|------|----------|
| **PlayerDataBackup** | 自动备份玩家数据 | 定期备份 |
| **UUIDMigrator** | 批量UUID迁移 | 验证模式切换 |
| **PlayerTransfer** | 跨服数据传输 | 服务器迁移 |
| **DataSync** | 多服同步 | 子服网络 |

### 💻 命令行工具

```bash
# 查找特定玩家的数据文件
find ./world -name "*.dat" -exec grep -l "玩家名" {} \;

# 批量重命名文件
for file in *.dat; do
    new_name=$(echo $file | sed 's/旧UUID/新UUID/')
    mv "$file" "$new_name"
done

# 检查文件大小异常
find ./world/playerdata -name "*.dat" -size -100c
```

## 📚 扩展参考

- [Minecraft Wiki - 玩家数据格式](https://zh.minecraft.wiki/w/玩家数据格式)
- [UUID规范文档](https://tools.ietf.org/html/rfc4122)
- [NBT格式说明](https://zh.minecraft.wiki/w/NBT格式)