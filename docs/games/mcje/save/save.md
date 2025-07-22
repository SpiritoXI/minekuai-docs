# Minecraft 服务器存档导入教程

::: tip 📋 概述
本教程将指导您如何将现有的 Minecraft 存档导入到服务器中，支持各种类型的服务端。
:::

### 🎯 适用范围
- **服务端类型**：原版、Paper、Spigot、Fabric、Forge 等
- **存档格式**：文件夹格式或压缩包格式
- **平台支持**：Windows、Linux、macOS

::: warning ⚠️ **重要提醒**：存档文件大于 100 MB 请使用 SFTP 工具导入！
> 📖 **参考教程**：[SFTP使用教程](../../../faq/sftp) | [如何上传文件](../../../upload)
:::

## 🛠️ 准备工作

### 📦 存档格式检查

1. **获取目标存档文件**
   - **文件夹格式**：包含 `region/`、`data/`、`level.dat` 等文件
   - **压缩包格式**：`.tar`、`.tar.gz` 格式

2. **验证存档完整性**
   
   ✅ **正确的存档结构**：
   ```
   world/
   ├── region/           # 区域文件（必需）
   ├── data/             # 数据文件
   ├── level.dat         # 世界信息（必需）
   ├── level.dat_old     # 备份文件
   ├── playerdata/       # 玩家数据
   ├── stats/            # 统计数据
   └── advancements/     # 进度数据
   ```

### 💾 备份当前存档

> 🚨 **重要**：操作前务必备份现有存档！

1. 停止服务器
2. 下载或复制当前的 `world` 文件夹
3. 建议命名为 `world_backup_日期`


## 🚀 导入操作步骤

### 📂 方法一：直接替换主世界（推荐）

#### 1️⃣ 准备阶段
1. **停止服务器**
2. **定位服务器目录**

**插件服务端结构**：
```
服务器根目录/
├── server.jar
├── eula.txt
├── server.properties
├── world/              # ← 主世界存档
├── world_nether/       # 下界存档
├── world_the_end/      # 末地存档
├── plugins/            # 插件文件夹
└── logs/               # 日志文件夹
```

**模组服务端结构**：
```
服务器根目录/
├── server.jar
├── eula.txt
├── server.properties
├── world/              # ← 主世界存档
├── mods/               # 模组文件夹
├── config/             # 配置文件夹
└── logs/               # 日志文件夹
```

#### 2️⃣ 执行替换
1. **删除原有世界文件夹**
   ```bash
   # Linux/macOS
   rm -rf world/
   
   # Windows（命令提示符）
   rmdir /s world
   ```

2. **上传新存档**
   - 将新存档文件夹重命名为 `world`
   - 上传到服务器根目录

3. **设置权限**（Linux/macOS）
   ```bash
   chmod -R 755 world/
   chown -R minecraft:minecraft world/
   ```

4. **启动服务器**

### 🔧 方法二：自定义存档名称

#### 1️⃣ 上传存档
将存档文件夹上传到服务器，可使用任意名称（如 `my_world`）

#### 2️⃣ 修改配置文件
编辑 `server.properties` 文件：
```properties
level-name=my_world  # 修改为你的存档文件夹名
```

#### 3️⃣ 重启服务器
保存配置文件后重启服务器即可生效

## 📦 压缩包处理

### 🗜️ 解压操作

1. **下载并解压**
   - 在本地解压压缩包
   - 检查解压后的文件夹结构

2. **结构验证**
   
   ✅ **正确结构**：
   ```
   my_world/
   ├── region/
   ├── data/
   └── level.dat
   ```
   
   ❌ **错误结构**（需要调整）：
   ```
   archive/
   └── my_world/     # ← 需要将内部文件夹内容提取出来
       ├── region/
       ├── data/
       └── level.dat
   ```

3. **上传处理后的文件夹**


## ⚙️ 特殊服务端处理

### 🔌 插件服务端（Paper/Spigot）

#### 配置文件检查
1. **检查 `bukkit.yml`**：
   ```yaml
   worlds:
     world:              # 确保世界名称与文件夹一致
       generator: ''
   ```

2. **多世界插件处理**
   如果使用 Multiverse-Core 等插件：
   ```
   /mv import my_world normal    # 导入世界
   /mv load my_world             # 加载世界
   /mv set spawn my_world        # 设置为主世界（可选）
   ```

### 🧩 模组服务端（Fabric/Forge）

#### 版本兼容性检查
1. **确认模组版本**：存档中的模组数据与服务器模组版本一致
2. **检查世界生成器**：确保相关的世界生成模组已安装

#### 配置文件调整
某些模组可能需要额外配置：
```json
// config/worldgen.json 示例
{
  "dimension_overrides": {
    "minecraft:overworld": "my_world"
  }
}
```

---

## 🔍 故障排除

### 🚨 常见问题及解决方案

| 问题现象 | 可能原因 | 解决方案 |
|---------|---------|---------|
| **服务器生成新的空白世界** | 文件夹名与配置不一致 | 检查 `level-name` 设置 |
| **卡在"下载地形"界面** | 玩家数据冲突 | 删除 `world/playerdata/` 下的玩家文件 |
| **区块错误或丢失** | 版本不兼容 | 确认存档版本与服务器版本兼容 |
| **权限被拒绝** | 文件权限问题 | 执行 `chmod -R 755 world/` |
| **启动时崩溃** | 存档文件损坏 | 恢复备份或修复 `level.dat` |

### 🛠️ 详细排查步骤

#### 问题1：服务器生成空白世界
1. 检查 `server.properties` 中的 `level-name` 设置
2. 确认存档文件夹名称完全一致（区分大小写）
3. 验证存档文件夹中是否包含 `level.dat`

#### 问题2：玩家进入时卡住
1. 删除玩家数据文件：
   ```bash
   rm -rf world/playerdata/玩家UUID.dat
   ```
2. 清除统计数据：
   ```bash
   rm -rf world/stats/
   rm -rf world/advancements/
   ```

#### 问题3：模组存档问题
1. 检查模组列表是否完整
2. 验证模组版本是否匹配
3. 查看服务器启动日志中的错误信息


## 💡 最佳实践

### 🔒 安全建议
1. **多重备份**：操作前进行多个备份
2. **测试环境**：先在测试服务器上验证
3. **分步操作**：不要一次性操作多个世界

### ⚡ 性能优化
1. **大文件传输**：使用 SFTP 工具上传大于 100MB 的文件
2. **压缩传输**：上传前可以压缩存档减少传输时间
3. **增量同步**：使用 rsync 等工具进行增量更新

### 📊 文件大小参考
| 存档类型 | 建议传输方式 |
|---------|-------------|
| **< 50MB** | 直接通过面板上传 |
| **50MB - 500MB** | 使用 SFTP 工具 |
| **> 500MB** | 分卷压缩或使用专业同步工具 |