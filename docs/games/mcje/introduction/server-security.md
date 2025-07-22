# Minecraft 服务器安全防护完全指南

::: tip 📋 概述
本指南深度剖析 Minecraft Java版服务器面临的安全威胁，提供针对性的防护策略和最佳实践，帮助服务器管理员建立多层安全防线。
:::

### 🎯 适用范围
- **服务端类型**：原版、Paper、Spigot、Fabric、Forge、混合端
- **部署环境**：公网服务器、内网服务器、云服务器
- **安全级别**：个人服务器、小型社区、大型公服


## ⚠️ 公网服务器核心威胁

### 🔍 威胁识别

即使不主动公开服务器地址，**公网IP的天然可扫描性**仍会带来以下威胁：

| 威胁类型 | 攻击方式 | 危害程度 |
|----------|----------|----------|
| **端口扫描** | 自动化工具24小时扫描常见端口（25565） | ⭐⭐⭐ |
| **DDoS/CC攻击** | 海量无效请求占用带宽和资源 | ⭐⭐⭐⭐⭐ |
| **UUID伪造** | 离线模式下通过自定义UUID绕过白名单 | ⭐⭐⭐⭐ |
| **恶意登录** | 暴力破解、撞库攻击 | ⭐⭐⭐ |
| **资源耗尽** | 大量假玩家连接消耗服务器资源 | ⭐⭐⭐⭐ |

::: warning 🚨 黄金安全法则
> **任何公网服务器必须启用「身份验证 + 权限控制 + 访问限制」三重防护**
:::

## 🔐 登录验证方案对比

### 📊 安全性对比矩阵

| 登录方式 | 安全性 | 门槛 | 维护复杂度 | 主要风险 | 推荐场景 |
|----------|--------|------|------------|----------|----------|
| **离线登录** | ⭐⭐ | 极低 | 极高 | UUID伪造、无身份验证 | 仅限内网测试 |
| **正版登录** | ⭐⭐⭐⭐⭐ | 高 | 低 | 微软服务依赖 | 公网服务器首选 |
| **外置登录** | ⭐⭐⭐⭐ | 中 | 中 | 第三方服务依赖 | 特定社区服务器 |


## 🛠️ 分场景安全解决方案

### 🔴 场景1：离线登录（高风险场景）

::: danger ⚠️ **警告**：
离线登录仅适用于内网环境，公网使用极度危险！
:::

#### 核心漏洞分析
- **UUID可伪造**：攻击者可通过修改启动器伪造任意UUID
- **白名单失效**：仅检查UUID存在性，无法验证身份真实性
- **无加密通信**：数据传输未加密，易被中间人攻击

#### 强制加固方案

| 服务端类型 | 推荐插件/模组 | 配置要点 |
|------------|---------------|----------|
| **Paper/Spigot** | [AuthMe Reloaded](https://github.com/AuthMe/AuthMeReloaded) | 强制注册登录系统 |
| **Fabric** | [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite) | 代理模式身份验证 |
| **Forge** | [Simple Login](https://www.curseforge.com/minecraft/mc-mods/simple-login) | 密码验证系统 |

#### AuthMe 安全配置示例

```yaml
# config.yml 关键配置
DataSource:
  backend: 'SQLITE'
  caching: 'ENABLED'

security:
  passwordHash: 'BCRYPT'
  minPasswordLength: 8
  maxPasswordLength: 30
  
settings:
  sessions:
    enabled: false  # 禁用会话缓存
    timeout: 0
  
restrictions:
  allowCommands: ['/help', '/register', '/login']
  maxLoginTries: 3
  tempbanLength: 10
```

### 🟢 场景2：正版登录（推荐方案）

#### 优势与特点
- ✅ **微软官方验证**：最高级别的身份认证
- ✅ **全球通用**：UUID全网唯一，跨服务器通用
- ✅ **维护简单**：无需额外插件和配置

#### 常见问题处理

| 问题现象 | 原因分析 | 解决方案 |
|----------|----------|----------|
| "未建立档案" | 账号未完成初始化 | 登录[Minecraft官网](https://minecraft.net)完成设置 |
| 验证服务器超时 | 网络连接问题 | 使用加速器或更换DNS |
| 频繁重新登录 | 客户端缓存问题 | 清除.minecraft/assets缓存 |

#### 正版验证优化配置

::: code-group
```properties[server.properties]
online-mode=true
enforce-secure-profile=true
prevent-proxy-connections=true
```
:::

### 🟡 场景3：外置登录（社区方案）

#### 皮肤站选择标准
1. **服务稳定性**：99%+在线率，有状态页面
2. **地理位置**：服务器位于国内，延迟<100ms
3. **安全特性**：支持2FA、API限流
4. **合规性**：有ICP备案，遵守相关法规

#### 推荐皮肤站
- [LittleSkin](https://littleskin.cn/) - 稳定性好，功能完善
- [Blessing Skin](https://blessing.netlify.app/) - 开源方案，可自建

#### 配置示例（authlib-injector）

```bash
# 启动参数
-javaagent:authlib-injector.jar=https://littleskin.cn/api/yggdrasil
-Dauthlibinjector.side=client
```


## 🏰 多层防护策略

### 🚪 第一层：网络级防护

#### 端口安全配置
```bash
# 修改默认端口（server.properties）
server-port=31415

# 防火墙规则（Linux）
ufw allow from 允许的IP to any port 31415
ufw deny 31415
```

#### DDoS防护
- **云服务器**：启用云厂商DDoS防护
- **自建服务器**：配置Fail2ban自动封禁
- **CDN代理**：使用支持TCP代理的CDN服务

### 🛡️ 第二层：应用级防护

#### 反代理保护
```nginx
# Nginx TCP代理配置
stream {
    upstream minecraft {
        server 127.0.0.1:25565;
    }
    
    server {
        listen 31415;
        proxy_pass minecraft;
        proxy_timeout 1s;
        proxy_responses 1;
    }
}
```

#### 连接限制插件
- **Paper**: [LimboAuth](https://github.com/Elytrium/LimboAuth) - 预登录验证
- **通用**: [ProtocolLib](https://github.com/dmulloy2/ProtocolLib) - 数据包级防护

### 🎯 第三层：权限级防护

#### 细粒度权限控制
::: code-group
```yaml[LuckPerms.yaml]
# LuckPerms 权限组配置示例
groups:
  visitor:
    permissions:
      - minecraft.command.help
      - authme.login
      - authme.register
  player:
    inheritance:
      - visitor
    permissions:
      - minecraft.command.gamemode.spectator
      - essentials.spawn
```
:::

#### 白名单最佳实践
::: code-group
```json[whitelist.json]
[
  {
    "uuid": "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    "name": "Notch"
  }
]
```
:::

## 🔍 安全监控与应急响应

### 📊 实时监控指标

#### 关键监控项目
- **登录异常**：同IP短时间多次失败登录
- **资源异常**：CPU/内存突然飙升
- **连接异常**：大量来自同一IP段的连接
- **行为异常**：新玩家立即执行敏感操作

#### 监控工具推荐
```yaml
# Plan插件配置 - 玩家行为分析
Plan:
  WebServer:
    enabled: true
    port: 8080
  
  Analysis:
    AutoRefresh: 60
    LogUnknownCommands: true
```

### 🚨 应急响应流程

#### 攻击检测响应
1. **立即处置**：封禁攻击IP，限制新连接
2. **影响评估**：检查服务器状态和数据完整性
3. **日志分析**：追踪攻击来源和方式
4. **加固措施**：修复漏洞，提升防护级别

#### 自动化响应脚本
```bash
#!/bin/bash
# 紧急封禁脚本
IP=$1
if [[ $IP =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    iptables -A INPUT -s $IP -j DROP
    echo "已封禁IP: $IP"
    logger "Emergency ban IP: $IP"
fi
```


## ⚙️ 高级安全配置

### 🔧 JVM安全参数

```bash
# 安全启动参数
java -server \
  -XX:+UseG1GC \
  -XX:+DisableExplicitGC \
  -Djava.security.manager \
  -Djava.security.policy=server.policy \
  -Dcom.sun.management.jmxremote=false \
  -jar server.jar nogui
```

### 🛠️ 系统级加固

#### Linux系统优化
```bash
# 内核参数调优
echo 'net.core.somaxconn = 65535' >> /etc/sysctl.conf
echo 'net.ipv4.tcp_max_syn_backlog = 65535' >> /etc/sysctl.conf
sysctl -p

# 进程限制
echo 'minecraft soft nofile 65535' >> /etc/security/limits.conf
echo 'minecraft hard nofile 65535' >> /etc/security/limits.conf
```

### 🔐 数据加密保护

#### 数据库加密
```yaml
# MySQL加密连接配置
DataSource:
  connection: 'jdbc:mysql://localhost:3306/authme?useSSL=true&requireSSL=true'
  username: 'authme_user'
  password: 'strong_password'
```


## 🚨 常见安全误区

### ❌ 危险认知误区

1. **"内网服务器不需要安全措施"**
   - 内网同样可能有恶意用户
   - 建议启用基础的身份验证

2. **"白名单就是万能防护"**
   - 白名单只能防止未授权用户，无法防止已授权用户的恶意行为
   - 需要配合权限系统和行为监控

3. **"正版验证绝对安全"**
   - 正版账号可能被盗取或共享
   - 仍需配合其他安全措施

### ⚠️ 配置风险警告

1. **禁止的危险配置**
   ```properties
   # 危险配置示例
   online-mode=false           # 公网服务器禁用
   white-list=false           # 开放服务器风险极高
   enable-command-block=true  # 非必要不开启
   ```

2. **插件安全风险**
   - 避免使用来源不明的插件
   - 定期更新插件到最新版本
   - 审查插件权限和功能


## 📊 安全评估清单

### ✅ 基础安全检查

- [ ] 启用正版验证或可信的身份验证系统
- [ ] 配置白名单或访问控制
- [ ] 修改默认端口
- [ ] 设置防火墙规则
- [ ] 禁用不必要的功能
- [ ] 配置日志记录
- [ ] 设置备份计划

### ✅ 高级安全检查

- [ ] 部署反向代理
- [ ] 配置DDoS防护
- [ ] 实施权限最小化原则
- [ ] 建立监控和告警系统
- [ ] 制定应急响应计划
- [ ] 定期安全审计
- [ ] 建立安全意识培训


## 🔧 应急处置工具

### 🛠️ 常用安全命令

```bash
# 快速封禁玩家
/ban 玩家名 恶意行为

# 查看在线玩家
/list

# 检查服务器状态
/tps

# 备份世界
/save-all
/save-off
tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz world/
/save-on
```

### 📱 远程管理工具

- **RCON**: 远程控制台管理
- **Web面板**: Pterodactyl、MineOS等
- **监控应用**: Grafana + Prometheus
- **移动应用**: ServerCtrl、Remote Desktop


## 📚 扩展参考

- [OWASP安全指南](https://owasp.org/www-project-top-ten/)
- [Minecraft服务器安全最佳实践](https://minecraft.fandom.com/wiki/Tutorials/Server_security)
- [网络安全法律法规](http://www.cac.gov.cn/2016-11/07/c_1119867116.htm)

