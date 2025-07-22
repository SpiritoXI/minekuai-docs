# 麦块联机存档导出教程

::: warning ⚠️ **重要安全提示** :  **务必在服务器完全关闭状态下操作！**  
> 导出过程中若服务器运行，将导致存档永久损坏！
:::

## 🔧 导出操作步骤

### 1. 进入实例文件管理
- 打开需要导出的服务器实例
- 点击顶部菜单栏的 **"文件管理"** 按钮
  ![文件管理入口](https://doc.liuliyue.cn/server/index.php?s=/api/attachment/visitFile&sign=33adfa3dfb389daaca63e55df322a6a8)

### 2. 定位主世界存档
- 在文件列表中找到存档文件夹（默认名称均为 `world`）
- **模组服务端** → 只需压缩 `world` 文件夹
- **插件服务端** → 需同时压缩三个核心文件夹（见下方注意事项）

### 3. 执行压缩操作
- 右键点击 `world` 文件夹
- 选择 **"压缩"** 功能  
  ![压缩操作示意图](https://doc.iyue.cn/server/index.php?s=/api/attachment/visitFile&sign=7bb06a661c325a72407b9fa3fd6345f2)

### 4. 获取压缩文件
- 压缩完成后生成 `archive-XXXX-XX-XXXXXXXXX+XXXX.tar.gz` 格式文件
- 文件将出现在当前目录文件列表中

---

## 📤 存档导出方式
✅ 使用 **SFTP 工具** 下载压缩包：  
👉 [SFTP 详细操作指南]( ../../../faq/sftp)


## ⚠ 关键注意事项
### 插件服务端特殊处理
若服务器使用 **插件核心** (如 Bukkit/Spigot/Paper)，必须同时导出三个维度：
```
├── world/ # 主世界存档
├── world_nether/ # 下界（地狱）存档
└── world_the_end/ # 末地存档
```

### 文件命名规范
- 默认存档名称统一为 **`world`**
- 若使用自定义存档名（如 `myserver`），则对应压缩：
```
myserver
myserver_nether
myserver_the_end
```