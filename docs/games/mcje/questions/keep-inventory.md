# Minecraft 服务器死亡不掉落教程

::: tip 什么是“死亡不掉落”？
死亡不掉落指的是玩家死亡后，物品不会掉落在地上，依然保留在背包中。
:::

## 适用版本
::: warning 提示
本教程适用于 Minecraft Java 版（JE）1.4.2 及以上版本。部分基岩版（BE）服务器也支持该指令，但具体请以服务器实际支持为准。
:::

## 如何开启死亡不掉落？
在游戏中输入以下指令：

```
/gamerule keepInventory true
```

或者在服务器控制台输入：

```
gamerule keepInventory true
```
:::tip 注意：
控制台输入时不要加“/”，否则会失败。
:::
## 如何关闭死亡不掉落？
在游戏中输入以下指令：

```
/gamerule keepInventory false
```

或者在服务器控制台输入：

```
gamerule keepInventory false
```
:::tip 注意：
控制台输入时不要加“/”，否则会失败。
:::
## 开启死亡不掉落有什么作用？
开启后，玩家死亡时，所有物品都不会掉落，依然保留在背包中，避免物品丢失。

## 常见问题解答（FAQ）

### Q1：为什么输入指令后没有生效？
1. 请确认输入的指令拼写无误。
2. 检查是否拥有足够的操作权限（如管理员或OP权限）。
3. 确认服务器或单人世界版本支持该指令。
4. 某些插件或数据包可能会影响指令效果。

### Q2：只对某些玩家生效吗？
`keepInventory` 是全局规则，设置后对所有玩家生效，无法单独指定某个玩家。

### Q3：如何只在特定世界开启？
在多世界服务器中，请切换到目标世界后再输入指令，规则只会影响当前世界。

### Q4：死亡后经验会掉落吗？
开启 `keepInventory` 后，物品不会掉落，但经验仍会掉落。如需保留经验，可配合相关插件或数据包实现。

## 注意事项
- 该指令需有管理员/OP权限才能使用。
- 某些服务器插件可能会覆盖或屏蔽该规则。
- 若服务器安装了特殊数据包或脚本，建议先备份数据。

## 相关链接
- [Minecraft Wiki - gamerule](https://minecraft.fandom.com/zh/wiki/命令/gamerule)
- [Minecraft 官方命令文档](https://minecraft-zh.gamepedia.com/命令)