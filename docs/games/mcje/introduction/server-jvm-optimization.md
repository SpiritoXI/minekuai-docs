# ☕ Minecraft 服务器 JVM 调优完全指南

:::tip 📋 概述
本指南深入解析 Java 虚拟机（JVM）在 Minecraft 服务器中的应用，提供针对不同服务器类型和负载的专业调优方案。
:::

### 🎯 适用范围
- **服务端类型**：原版、Paper、Spigot、Fabric、Forge、混合端
- **服务器规模**：个人服务器、中小型社区、大型公服
- **JVM版本**：OpenJDK 17+、Oracle JDK 17+、GraalVM

:::warning ⚠️ **重要提示**：
JVM调优是一门精细的艺术，建议在理解原理后再进行实际操作
:::

## 🧠 JVM 基础知识

### 📊 JVM 内存结构

```
┌─────────────────────────────────────────┐
│              JVM 内存布局                │
├─────────────────────────────────────────┤
│ 堆内存 (Heap Memory)                    │
│ ├── 新生代 (Young Generation)            │
│ │   ├── Eden 区                        │
│ │   ├── Survivor 0 (S0)               │
│ │   └── Survivor 1 (S1)               │
│ └── 老年代 (Old Generation)             │
├─────────────────────────────────────────┤
│ 非堆内存 (Non-Heap Memory)              │
│ ├── 方法区 (Metaspace)                  │
│ ├── 程序计数器 (PC Register)             │
│ ├── 本地方法栈 (Native Method Stack)     │
│ └── 虚拟机栈 (JVM Stack)                │
├─────────────────────────────────────────┤
│ 直接内存 (Direct Memory)                │
└─────────────────────────────────────────┘
```

### 🔄 垃圾回收机制

#### 垃圾回收器对比

| 垃圾回收器 | 特点 | 适用场景 | Minecraft服务器适用性 |
|------------|------|----------|----------------------|
| **Serial GC** | 单线程，简单高效 | 小型应用 | ❌ 不推荐 |
| **Parallel GC** | 多线程，吞吐量优先 | 批处理应用 | ⚠️ 小型服务器可用 |
| **G1 GC** | 低延迟，适应性强 | 大内存应用 | ✅ **推荐** |
| **ZGC** | 超低延迟 | 超大内存应用 | ⚠️ 实验性使用 |
| **Shenandoah** | 低延迟，高并发 | 响应时间敏感 | ⚠️ 需要测试验证 |


## ⚙️ 基础 JVM 参数详解

### 💾 内存配置参数

#### 堆内存设置
```bash
# 基础内存配置
-Xms<size>    # 初始堆内存大小
-Xmx<size>    # 最大堆内存大小
-Xmn<size>    # 新生代内存大小

# 示例：8GB 服务器配置
-Xms8G -Xmx8G -Xmn2G
```

#### 内存比例调整
```bash
# 新生代配置
-XX:NewRatio=3              # 老年代:新生代 = 3:1
-XX:SurvivorRatio=8         # Eden:Survivor = 8:1
-XX:MaxTenuringThreshold=15 # 对象晋升老年代的年龄

# 元空间配置（Java 8+）
-XX:MetaspaceSize=256m      # 初始元空间大小
-XX:MaxMetaspaceSize=512m   # 最大元空间大小
```

### 🗑️ 垃圾回收配置

#### G1 垃圾回收器配置
```bash
# 启用 G1 垃圾回收器
-XX:+UseG1GC

# G1 核心参数
-XX:MaxGCPauseMillis=200              # 目标暂停时间（毫秒）
-XX:G1HeapRegionSize=16M              # 堆区域大小
-XX:G1NewSizePercent=20               # 新生代最小比例
-XX:G1MaxNewSizePercent=40            # 新生代最大比例
-XX:G1ReservePercent=10               # 保留内存比例

# G1 高级参数
-XX:InitiatingHeapOccupancyPercent=15 # 并发标记触发阈值
-XX:G1MixedGCCountTarget=4            # 混合GC目标次数
-XX:G1HeapWastePercent=5              # 可接受的堆浪费比例
```

### 🚀 性能优化参数

#### JIT编译器优化
```bash
# 编译器设置
-server                                # 使用服务器模式JIT
-XX:+TieredCompilation                # 启用分层编译
-XX:+UseCodeCacheFlushing             # 启用代码缓存清理

# 编译优化
-XX:ReservedCodeCacheSize=256m        # 代码缓存大小
-XX:InitialCodeCacheSize=64m          # 初始代码缓存
-XX:+OptimizeStringConcat             # 优化字符串连接
```

#### 系统性能优化
```bash
# 预分配和优化
-XX:+AlwaysPreTouch                   # 预先分配物理内存
-XX:+UseTransparentHugePages          # 使用透明大页（Linux）
-XX:LargePageSizeInBytes=2m           # 大页大小设置

# 并行优化
-XX:+ParallelRefProcEnabled           # 并行处理引用
-XX:+UseStringDeduplication           # 字符串去重（G1）
```


## 🏗️ 分场景 JVM 配置方案

### 🏠 小型服务器（1-10人）

#### 硬件配置
- **内存**: 4-8GB
- **CPU**: 4核心
- **玩家数**: 1-10人

#### 推荐配置
```bash
#!/bin/bash
# 小型服务器 JVM 配置

MEMORY="4G"

JAVA_ARGS="-server \
  -Xms${MEMORY} -Xmx${MEMORY} \
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
  -XX:MaxTenuringThreshold=1"

java ${JAVA_ARGS} -jar server.jar nogui
```

### 🏢 中型服务器（10-50人）

#### 硬件配置
- **内存**: 8-16GB
- **CPU**: 6-8核心
- **玩家数**: 10-50人

#### 推荐配置
```bash
#!/bin/bash
# 中型服务器 JVM 配置

MEMORY="12G"

JAVA_ARGS="-server \
  -Xms${MEMORY} -Xmx${MEMORY} \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=130 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=28 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=16M \
  -XX:G1ReservePercent=15 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=3 \
  -XX:InitiatingHeapOccupancyPercent=10 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -XX:+UseStringDeduplication"

java ${JAVA_ARGS} -jar server.jar nogui
```

### 🏭 大型服务器（50+人）

#### 硬件配置
- **内存**: 16-32GB+
- **CPU**: 8核心+
- **玩家数**: 50+人

#### 推荐配置
```bash
#!/bin/bash
# 大型服务器 JVM 配置

MEMORY="24G"

JAVA_ARGS="-server \
  -Xms${MEMORY} -Xmx${MEMORY} \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=100 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=25 \
  -XX:G1MaxNewSizePercent=35 \
  -XX:G1HeapRegionSize=32M \
  -XX:G1ReservePercent=10 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=2 \
  -XX:InitiatingHeapOccupancyPercent=8 \
  -XX:G1MixedGCLiveThresholdPercent=85 \
  -XX:G1RSetUpdatingPauseTimePercent=5 \
  -XX:SurvivorRatio=32 \
  -XX:+PerfDisableSharedMem \
  -XX:MaxTenuringThreshold=1 \
  -XX:+UseStringDeduplication \
  -XX:+UseLargePages"

java ${JAVA_ARGS} -jar server.jar nogui
```


## 🎮 模组服务器专用配置

### 🔧 Forge 服务器优化

```bash
#!/bin/bash
# Forge 服务器专用 JVM 配置

MEMORY="16G"

JAVA_ARGS="-server \
  -Xms${MEMORY} -Xmx${MEMORY} \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=20 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=16M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:G1MixedGCCountTarget=4 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:G1MixedGCLiveThresholdPercent=90 \
  -XX:SurvivorRatio=32 \
  -XX:MaxTenuringThreshold=1 \
  -XX:+UseStringDeduplication \
  -XX:+UseBiasedLocking \
  -XX:+UseCompressedOops \
  -XX:+UseCompressedClassPointers \
  -Dfml.readTimeout=180 \
  -Dfml.debugRegistryEntries=true \
  -Dfile.encoding=UTF-8"

# Forge 特殊参数
FORGE_ARGS="-Dforge.logging.markers=REGISTRIES \
  -Dforge.logging.console.level=info"

java ${JAVA_ARGS} ${FORGE_ARGS} -jar forge-server.jar nogui
```

### 🧵 Fabric 服务器优化

```bash
#!/bin/bash
# Fabric 服务器专用 JVM 配置

MEMORY="12G"

JAVA_ARGS="-server \
  -Xms${MEMORY} -Xmx${MEMORY} \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=130 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -XX:+AlwaysPreTouch \
  -XX:G1NewSizePercent=30 \
  -XX:G1MaxNewSizePercent=40 \
  -XX:G1HeapRegionSize=8M \
  -XX:G1ReservePercent=20 \
  -XX:G1HeapWastePercent=5 \
  -XX:InitiatingHeapOccupancyPercent=15 \
  -XX:SurvivorRatio=32 \
  -XX:MaxTenuringThreshold=1 \
  -XX:+UseStringDeduplication \
  -Dfabric.development=false \
  -Dfile.encoding=UTF-8"

java ${JAVA_ARGS} -jar fabric-server-launch.jar nogui
```


## 🔍 监控与诊断

### 📊 JVM 监控参数

#### 垃圾回收日志
```bash
# GC 日志配置（Java 11+）
-Xlog:gc*:gc.log:time,tags
-Xlog:gc-heap-exit:gc-heap.log:time,tags

# GC 日志配置（Java 8）
-XX:+PrintGC
-XX:+PrintGCDetails
-XX:+PrintGCTimeStamps
-XX:+PrintGCApplicationStoppedTime
-Xloggc:gc.log
```

#### JVM 监控启用
```bash
# JMX 监控
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.port=9999
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false

# JFR 性能监控（Java 11+）
-XX:+FlightRecorder
-XX:StartFlightRecording=duration=60s,filename=server.jfr
```

### 📈 性能指标解读

#### 关键性能指标

| 指标 | 正常范围 | 监控方法 |
|------|----------|----------|
| **GC暂停时间** | < 100ms | GC日志分析 |
| **GC频率** | < 1次/分钟 | 实时监控 |
| **堆内存使用率** | < 80% | JVisualVM/JConsole |
| **老年代增长速度** | 缓慢稳定 | 趋势分析 |
| **元空间使用** | < 80% | 内存监控 |

#### 性能分析工具

```bash
# 使用 jstat 监控 GC
jstat -gc -t <pid> 1s

# 使用 jmap 分析内存
jmap -dump:format=b,file=heapdump.hprof <pid>

# 使用 jstack 分析线程
jstack <pid> > threads.txt

# 使用 jhsdb 分析（Java 11+）
jhsdb jmap --heap --pid <pid>
```


## ⚠️ 常见问题与解决方案

### 🚨 内存相关问题

#### OutOfMemoryError: Java heap space
```bash
# 问题：堆内存不足
# 解决方案：增加堆内存或优化代码

# 临时解决
-Xmx16G  # 增加最大堆内存

# 长期解决
# 1. 分析内存泄漏
jmap -dump:format=b,file=dump.hprof <pid>
# 2. 使用 MAT 工具分析
# 3. 优化模组配置
```

#### OutOfMemoryError: Metaspace
```bash
# 问题：元空间不足（通常是模组过多）
# 解决方案：增加元空间大小

-XX:MetaspaceSize=512m
-XX:MaxMetaspaceSize=1G
```

### 🐌 性能问题

#### 频繁 GC 导致卡顿
```bash
# 问题分析
# 1. 检查 GC 日志
grep "GC" gc.log | tail -20

# 2. 调整 GC 参数
-XX:MaxGCPauseMillis=50        # 降低目标暂停时间
-XX:G1NewSizePercent=35        # 增加新生代比例
-XX:InitiatingHeapOccupancyPercent=10  # 更早触发并发回收
```

#### 内存泄漏检测
```bash
# 1. 生成内存快照
jmap -dump:live,format=b,file=heap-$(date +%s).hprof <pid>

# 2. 定时监控内存使用
#!/bin/bash
while true; do
    echo "$(date): $(jstat -gc <pid> | tail -1)" >> gc-monitor.log
    sleep 60
done
```


## 🧪 实验性优化选项

### 🚀 新一代垃圾回收器

#### ZGC 配置（实验性）
```bash
# ZGC 适用于超大内存（32GB+）服务器
JAVA_ARGS="-server \
  -Xms32G -Xmx32G \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+UseZGC \
  -XX:+UseLargePages \
  -XX:+UncommitUnusedMemory"

# 注意：ZGC 目前仍在实验阶段，生产环境需谨慎使用
```

#### Shenandoah GC 配置
```bash
# Shenandoah 低延迟垃圾回收器
JAVA_ARGS="-server \
  -Xms16G -Xmx16G \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+UseShenandoahGC \
  -XX:ShenandoahGCHeuristics=compact"

# 适用于对延迟敏感的大型服务器
```

### ⚡ GraalVM 优化

```bash
# GraalVM 企业版优化选项
GRAAL_ARGS="-XX:+UnlockExperimentalVMOptions \
  -XX:+EnableJVMCI \
  -XX:+UseJVMCICompiler \
  -XX:+UseTransparentHugePages"

# 注意：需要 GraalVM 环境
```


## 📋 JVM 调优检查清单

### ✅ 基础配置检查

- [ ] Java 版本 ≥ 17（推荐 Java 21）
- [ ] 堆内存大小适当（物理内存的 50-80%）
- [ ] 使用 G1 垃圾回收器
- [ ] 启用并行引用处理
- [ ] 禁用显式 GC
- [ ] 设置合理的 GC 暂停目标

### ✅ 性能优化检查

- [ ] 启用预分配内存
- [ ] 配置字符串去重
- [ ] 优化新生代大小
- [ ] 设置合理的 GC 触发阈值
- [ ] 启用大页内存（Linux）
- [ ] 配置 JIT 编译器优化

### ✅ 监控配置检查

- [ ] 启用 GC 日志记录
- [ ] 配置 JMX 监控
- [ ] 设置性能分析工具
- [ ] 建立监控告警
- [ ] 定期性能分析

---

## 🛠️ 自动化脚本

### 📊 JVM 性能监控脚本

```bash
#!/bin/bash
# JVM 性能监控脚本

PID=$(pgrep -f "minecraft\|server\.jar")
if [ -z "$PID" ]; then
    echo "Minecraft server not found!"
    exit 1
fi

echo "=== JVM Performance Monitor ==="
echo "PID: $PID"
echo "Timestamp: $(date)"
echo

# 内存使用情况
echo "=== Memory Usage ==="
jstat -gc $PID

echo
echo "=== Heap Summary ==="
jmap -heap $PID | grep -E "(Heap|used|free|total)"

echo
echo "=== GC Performance ==="
jstat -gcutil $PID

# 线程信息
echo
echo "=== Thread Count ==="
jstack $PID | grep "^\"" | wc -l

# CPU 使用率
echo
echo "=== CPU Usage ==="
ps -p $PID -o %cpu,%mem,cmd
```

### 🔧 自动调优脚本

```bash
#!/bin/bash
# JVM 自动调优建议脚本

# 获取系统信息
TOTAL_MEM=$(free -g | grep "^Mem:" | awk '{print $2}')
CPU_CORES=$(nproc)

echo "=== System Information ==="
echo "Total Memory: ${TOTAL_MEM}GB"
echo "CPU Cores: $CPU_CORES"
echo

# 内存建议
RECOMMENDED_HEAP=$((TOTAL_MEM * 70 / 100))
if [ $RECOMMENDED_HEAP -gt 32 ]; then
    RECOMMENDED_HEAP=32
fi

echo "=== JVM Configuration Recommendations ==="
echo "Recommended Heap Size: ${RECOMMENDED_HEAP}G"

# 生成配置
cat > jvm-recommended.sh << EOF
#!/bin/bash
# Auto-generated JVM configuration

MEMORY="${RECOMMENDED_HEAP}G"

JAVA_ARGS="-server \\
  -Xms\${MEMORY} -Xmx\${MEMORY} \\
  -XX:+UseG1GC \\
  -XX:+ParallelRefProcEnabled \\
  -XX:MaxGCPauseMillis=130 \\
  -XX:+UnlockExperimentalVMOptions \\
  -XX:+DisableExplicitGC \\
  -XX:+AlwaysPreTouch \\
  -XX:G1NewSizePercent=28 \\
  -XX:G1MaxNewSizePercent=40 \\
  -XX:G1HeapRegionSize=16M \\
  -XX:G1ReservePercent=15 \\
  -XX:InitiatingHeapOccupancyPercent=15 \\
  -XX:SurvivorRatio=32 \\
  -XX:MaxTenuringThreshold=1 \\
  -XX:+UseStringDeduplication"

java \${JAVA_ARGS} -jar server.jar nogui
EOF

chmod +x jvm-recommended.sh
echo "Generated: jvm-recommended.sh"
```

## 📚 扩展参考

- [Oracle JVM 调优指南](https://docs.oracle.com/en/java/javase/17/gctuning/)
- [G1 垃圾回收器详解](https://docs.oracle.com/en/java/javase/17/gctuning/garbage-first-garbage-collector.html)
- [JVM 性能分析工具](https://docs.oracle.com/en/java/javase/17/troubleshoot/)
- [OpenJDK 性能指南](https://wiki.openjdk.java.net/display/HotSpot/Performance)

