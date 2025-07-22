# Minecraft 整合包性能优化指南与配置参考

::: tip 📋 概述
本指南提供 Minecraft Java版模组整合包的全面性能优化方案，包含配置调优、硬件选型和主流整合包性能需求分析。
:::

### 🎯 适用范围
- **服务端类型**：Forge、Fabric、NeoForge 模组服务器
- **负载场景**：休闲生存、中等强度机械、多人联机
- **性能目标**：稳定20TPS、低延迟、内存优化

::: warning ⚠️ **重要提示**：
本指南基于非极限负载场景，重度红石/工业机械需要额外优化
:::

## ⚙️ 基础优化配置方案

### 🔧 server.properties 核心参数

```properties
# 基础设置
allow-flight=true                    # 允许飞行（模组常需要）
max-tick-time=60000                  # Tick超时检测（60秒，防止复杂机械崩服）
enforce-secure-profile=false        # 关闭强制安全配置（适用于离线服务器）

# 性能调优
view-distance=8                      # 渲染距离（6-10区块，根据性能调整）
simulation-distance=6                # 模拟距离（比渲染距离小2-4）
entity-broadcast-range-percentage=80 # 实体广播范围（降低网络负载）

# 世界设置
spawn-protection=0                   # 关闭出生点保护（避免模组冲突）
max-world-size=10000                 # 限制世界大小（防止无限扩张）
```

### 🔩 Forge 专用优化配置

**文件路径**：`world/serverconfig/forge-server.toml`

```toml
# 实体异常处理
removeErroringEntities = true           # 自动移除崩溃实体
removeErroringBlockEntities = true      # 自动修复异常方块实体

# 性能优化
fixAdvancementLoading = true            # 修复成就加载问题
dimensionUnloadQueueDelay = 0           # 立即卸载无人维度
```

### 📦 必装优化模组推荐

| 模组名称 | 功能说明 | 下载链接 | 适用端 |
|----------|----------|----------|--------|
| **Spark** | 性能分析和监控工具 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/spark) | Forge/Fabric |
| **AI Improvements** | 优化生物AI，减少CPU占用 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/ai-improvements) | Forge |
| **Chunky** | 地图预生成工具 | [Modrinth](https://modrinth.com/plugin/chunky) | 通用 |
| **FerriteCore** | 内存使用优化 | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/ferritecore) | Forge/Fabric |
| **Lithium** | 服务端性能优化 | [Modrinth](https://modrinth.com/mod/lithium) | Fabric |

#### 🔄 管理模组推荐

| 模组名称 | 功能说明 | 适用场景 |
|----------|----------|----------|
| **FTB Essentials** | 轻量级管理功能（传送、经济） | 替代重型插件 |
| **FTB Backups 2** | 自动备份存档 | 数据安全保障 |
| **Entity Culling** | 自动清除闲置实体 | 高实体密度场景 |
| **Clumps** | 经验球聚合，减少实体数量 | 经验农场服务器 |


## 📊 主流整合包性能需求参考

> 💡 **说明**：数据基于实际测试，仅供参考。具体需求因玩法而异。

### 🎮 轻量级整合包

| 整合包名称 | 1-3人最低 | 5-10人推荐 | 20人以上 | 特殊说明 |
|------------|-----------|------------|----------|----------|
| **[NEW] 新星工程：世界** | 2GB内存 | 4GB内存 | 6GB内存 | 极简模组，性能友好 |
| **香草纪元：食旅纪行** | 4GB内存 | 6GB内存 | 8GB内存 | 轻量级整合，适合休闲 |
| **[AFoP] 宁然一隅** | 4GB内存 | 6GB内存 | 8GB内存 | 适合中小型社区 |

### ⚡ 中等负载整合包

| 整合包名称 | 1-3人最低 | 5-10人推荐 | 20人以上 | 特殊说明 |
|------------|-----------|------------|----------|----------|
| **[NFWC] 脆骨症** | 6GB内存 | 8GB内存 | 12GB内存 | 后期需提升存储性能 |
| **[TLT] 匠造之传** | 6GB内存 | 8GB内存 | 12GB内存 | 机械模组较多 |
| **[SD] 咒次元** | 6GB内存 | 8GB内存 | 10GB内存 | 魔法模组，注意实体生成 |
| **[CD] 机械动力：悠然乐事** | 8GB内存 | 10GB内存 | 16GB内存 | Create机械+农业双重负载 |

### 🔥 高负载整合包

| 整合包名称 | 1-3人最低 | 5-10人推荐 | 20人以上 | 特殊说明 |
|------------|-----------|------------|----------|----------|
| **[CTNH] 机械动力：新视野** | 8GB内存 | 12GB内存 | 20GB内存 | Create系列，需高性能CPU |
| **[ATM 9] All the Mods 9** | 8GB内存 | 12GB内存 | 16GB内存 | 模组数量多，需定期清理 |
| **[MB 3] 锻造大师 3** | 10GB内存 | 16GB内存 | 24GB内存 | 金属冶炼系统内存需求高 |
| **乌托邦** | 12GB内存 | 20GB内存 | 32GB内存+ | ⚠️ 传说级整合包，慎入！ |
| **龙之冒险：新征程** | 12GB内存 | 24GB内存 | 32GB内存+ | ⚠️警告：这不是游戏，是对设备的生存挑战！ |

### ⚠️ 问题整合包

| 整合包名称 | 状态 | 说明 |
|------------|------|------|
| **赏金猎人** | 不推荐 | 优化较差，内存泄漏严重 |
| **愚者：The Fool** | 高风险 | 内存泄漏风险高，需专业维护 |


## 🔧 性能优化进阶技巧

### 💾 内存分配策略

#### 分配公式
```
推荐内存 = 基础需求 + (模组数量 × 0.1GB) + (玩家数 × 0.8GB)
```

#### JVM参数优化
> 详细内容可参考 👉 ***[服务器 JVM 调优完全指南](https://doc.liuliyue.cn/web/#/638364699/269884964 "【】")***
```bash
# 推荐启动参数（12GB内存示例）
java -Xms12G -Xmx12G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -jar server.jar nogui
```

### 🗺️ 区块管理优化

#### 预生成设置
```bash
# 使用 Chunky 预生成区块
/chunky world world        # 选择主世界
/chunky radius 3000        # 设置半径3000块
/chunky start              # 开始预生成
```

#### 区块加载限制
```properties
# server.properties 补充配置
max-chained-neighbor-updates=1000000
player-idle-timeout=30           # 空闲玩家30分钟后踢出
```

### 🐾 实体控制策略

#### 实体密度控制
```yaml
# 使用 Entity Culling 模组配置
entity-culling:
  max-entities-per-chunk: 50
  cull-distance: 128
  aggressive-culling: true
```

#### 刷怪控制
```properties
# server.properties 刷怪设置
spawn-monsters=true
spawn-animals=true
spawn-npcs=true
spawn-protection=0
max-entity-cramming=24      # 实体堆叠限制
```


## 🔍 性能监控与诊断

### 📊 Spark 性能分析

#### 基础监控命令
```bash
# 生成性能报告
/spark profiler start
/spark profiler stop
/spark profiler upload

# 内存分析
/spark heapdump
/spark gc
```

#### 关键指标解读
- **TPS**: 保持在19.5+为理想状态
- **内存使用**: 不超过分配内存的80%
- **GC频率**: 每分钟少于5次
- **实体数量**: 单区块不超过50个

### 🎯 性能瓶颈排查

| 症状 | 可能原因 | 解决方案 |
|------|----------|----------|
| **TPS下降** | 过多实体/复杂机械 | 使用 Entity Culling，简化机械 |
| **内存溢出** | 内存分配不足 | 增加 -Xmx 参数 |
| **频繁GC** | 内存碎片化 | 优化 G1GC 参数 |
| **区块加载慢** | 硬盘IO瓶颈 | 升级到 *麦块会员PRO* |


## ⚠️ 常见问题与解决方案

### 🔧 模组兼容性问题

#### 常见冲突
```yaml
冲突组合:
  - OptiFine + Rubidium: 光影渲染冲突
  - JEI + REI: 物品查询界面冲突
  - Forge + Fabric模组: API不兼容

解决方案:
  - 使用 MixinBootstrap 桥接
  - 选择同类模组中的一个
  - 查看模组兼容性列表
```

#### 版本匹配检查
```bash
# 检查模组版本兼容性
1. 确认 Minecraft 版本一致
2. 确认 Forge/Fabric 版本兼容
3. 检查模组依赖关系
4. 使用 ModList 检查冲突
```

### 🛠️ 性能调优技巧

#### 动态配置调整
```properties
# 高峰期配置
view-distance=6
simulation-distance=4
max-players=15

# 低峰期配置
view-distance=10
simulation-distance=8
max-players=30
```

#### 整合包特殊处理
```yaml
RLCraft:
  - 安装 BetterF3 监控内存
  - 关闭不必要的光影效果
  - 限制同时在线玩家数

Create 系列:
  - 禁用爆炸地形破坏
  - 限制机械复杂度
  - 使用区块加载器合理规划
```


## 📈 性能测试与基准

### 🧪 标准测试流程

1. **基础测试**
   ```bash
   # 空服务器启动测试
   启动时间: < 2分钟
   空载内存: < 2GB
   TPS稳定性: 20.0
   ```

2. **负载测试**
   ```bash
   # 模拟玩家测试
   使用 JMeter 或 MCStresser
   测试并发连接: 目标玩家数 × 1.5
   监控 TPS 变化
   ```

3. **长期稳定性测试**
   ```bash
   # 24小时连续运行
   监控内存泄漏
   记录 GC 频率
   检查日志错误
   ```

### 📋 性能评估清单

- [ ] 启动时间 < 3分钟
- [ ] 空载内存使用 < 分配内存的30%
- [ ] TPS保持在19.8+
- [ ] 区块加载延迟 < 500ms
- [ ] 玩家连接延迟 < 100ms
- [ ] 无内存泄漏警告
- [ ] 无频繁GC暂停
- [ ] 模组兼容性良好


## 💡 最佳实践建议

### 🔄 日常维护

1. **定期清理**
   ```bash
   # 每周执行
   /kill @e[type=item]        # 清理掉落物
   /chunky trim               # 清理未使用区块
   重启服务器                   # 清理内存碎片
   ```

2. **备份策略**
   ```bash
   # 自动备份配置
   每4小时: 增量备份
   每天: 完整备份
   每周: 异地备份
   ```

3. **监控报警**
   ```yaml
   设置监控阈值:
     TPS < 18: 发送警告
     内存使用 > 90%: 发送警告
     磁盘空间 < 10GB: 发送警告
   ```


## 📚 扩展参考

- [Forge官方文档](https://docs.minecraftforge.net/)
- [Fabric官方文档](https://fabricmc.net/wiki/)
- [JVM调优指南](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/)
- [Spark性能分析器](https://spark.lucko.me/)
