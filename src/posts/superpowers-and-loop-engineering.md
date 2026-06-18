---
title: "从 Superpowers 到 Loop Engineering：我对 Agent 工程的理解"
date: "2026-06-18"
tags: ["Tech"]
description: "从 Superpowers、Loop Engineering、Orchestration 到多 Agent 并行，聊聊我对 agent 工程里流程纪律、成本与止损的理解。"
image: "https://github.com/CLCK0622/images/blob/main/superpowers-loop-engineering-cover.jpg?raw=true"
---

## **一、Superpowers**

由 obra 创建的 methodology-as-a-plugin，把开发者的最佳实践编码成可自动触发的 skills，让 agent 不用每次从零推导该怎么做。

由当前 14 个技能形成一个七大阶段的开发流程：brainstorm（需求澄清）→ spec（规格文档）→ plan（任务拆解）→ TDD（测试驱动）→ implement（实现）→ review（审查）→ finish（收尾）。

loop engineering 和 orchestration 的一个具体落地实例。

![Superpowers 技能触发流程图：Claude Code 会话启动后由 SessionStart hook 注入 using-superpowers 元技能，判断是否有 skill 适用，再加载技能并按指令执行](https://github.com/CLCK0622/images/blob/main/superpowers-loop-engineering-superpowers.png?raw=true)

也有诸多不足之处，在我个人体验过程中发现诸如 token 用量过大、大炮打蚊子等问题，都是 superpowers 为了不遗漏而做出的取舍。

它给我的启发不是「这个工具一定最强」，而是它把很多本来靠人临场提醒的东西，变成了一套 agent 自己会触发的流程纪律。

也就是把 prompt 从一句话，变成了一个小型操作系统。

## **二、Loop Engineering**

核心思想：不再亲自 prompt agent，而是设计一个系统来代替你 prompt。

这个说法更多是社区/行业里的概括，不是 Anthropic 的正式产品名，但它很准确地描述了现在这一类 agent 工程实践。

五大核心构件：自动化/心跳、worktrees、skills、插件/MCP、subagent（、状态/记忆）。

风险：

1. 仍然需要人工参与验证流程

2. 无人值守的循环只会无人值守地犯错（前两天的体验 fable 的一个灾难性例子，全自动试错 20+ 轮，token 消耗到 300M 这个量级；这个数字只能作为个人体验/估算讲，不是官方数字）

3. loop 效果、结果不可复现，千人千面

我现在会把这种失控拆成几类：

1. 失控试错：agent 一直修、一直跑、一直解释，但是没有收敛

2. token 爆炸：多 agent、长上下文、日志、测试输出、MCP 工具定义，都会快速把成本推上去

3. 目标漂移：跑久了之后，最先丢掉的往往不是任务本身，而是边界条件和「不要做什么」

4. 自证偏差：让同一个 agent 评价自己的方案，很容易倾向于相信自己已经做对了

5. 大炮打蚊子：本来一个普通会话能解决的问题，硬上 workflow、reviewer、worktree，最后成本比收益高

所以 loop 一定要有止损点。

我觉得比较关键的 checkpoint 有几个：

1. 需求澄清后：确认目标、边界、预算

2. plan 之后：确认路线没有跑偏

3. 第一轮实现后：用最小验证先确认方向

4. 高风险操作前：比如删文件、数据库迁移、大规模重构、部署、发 PR

5. 每轮循环后：看它是不是还在产生新证据，还是只是在原地转圈

及时止损也不是很复杂：

1. 先写最多跑几轮

2. 先写最多烧多少 token

3. 没有新发现就停

4. 同一个错误修三次还没好就停

5. 测试过了就停，不要让它继续「优化」

Loop Engineering 的目标不是无人值守，而是可控地减少人类重复介入。

真正的自动化一定要有预算、验证点和停止条件。

## **三、Orchestration**

解决了不同 agent 之间协作的问题，目前有三种 cc 原生的方式：

1. Subagents
   1. 会话中启动完整、上下文干净的子 agent，黑箱系统，接收主 agent 的输入，返回结果
   2. 有 Explore、Plan、general-purpose 等内置 agent
   3. 核心应用场景：隔离高开销操作、独立调研、串行依赖执行（类似 plan）、做代码审查等
   4. 主要是为了剥离关联性较低的大节点，避免快速消耗上下文窗口导致主 agent 注意力消散
2. Agent Teams
   1. 2026.2 新的实验性功能
   2. 每个 agent 都是独立的 cc 实例，独立上下文窗口
   3. 所有 agent 共享同一个任务列表，自动 claim 下一个节点的任务
   4. 用文件锁防止竞态
3. Dynamic Workflows
   1. 与 Opus 4.8 一起发布
   2. claude 只写 js 编排脚本，上下文窗口只保存答案
   3. 解决三大问题：laziness、self-preferential bias、goal drift
   4. 最多 16 个并发、最多 1000 个总数，agent 支持断点恢复
   5. Best Practice：Bun 的移植 - 由许多个一个 agent 带两个 reviewer 的组合并发工作，11 天合并 75 万行代码

什么时候用哪个，我现在的判断比较简单：

1. Subagents：主会话被搜索、日志、文档污染的时候用；成本中等，最大价值是保护主上下文

2. Agent Teams：任务已经能拆成几个相对独立节点，需要多个 cc 实例一起推进的时候用；成本会明显上去，也要注意端口、依赖、环境互相影响

3. Dynamic Workflows：任务很大、结构化、需要并行、验证、汇总甚至循环的时候用；能力最强，但也最容易烧 token，小任务不要为了看起来高级硬上

Anthropic 提出的六大可组合 workflow

1. classify-and-act：用轻量 agent 路由需求到特定功能 agent。比如 issue triage，先判断是 bug、需求、文档、性能问题，再分给不同 agent

2. fan-out-and-synthesize：把大问题分成各个小问题然后用 subagent 驱动开发。比如事实核查，一个 agent 抽事实断言，多个 agent 分别查版本、功能、数字、案例，最后汇总

3. adversarial verification：独立对抗审查。比如一个 agent 写代码，另一个 agent 按 rubric 找漏洞、边界条件和测试缺口

4. generate-and-filter：生成多候选然后取最优解。比如先生成 30 个 action items，再筛出明天真正能用的 3 个

5. tournament：也是多候选，但是两两 PK 淘汰。比如让几个 agent 分别给重构方案，再由 judge agent 两两比较选最稳的

6. loop-until-done：/goal 的工作流版本。比如 flaky test 调查，不断提出假设、复现、排除，直到找到原因或者达到预算上限

这些 workflow 不是互斥菜单，更像积木。

真实任务里经常是 fan-out-and-synthesize + adversarial verification + loop-until-done 混在一起。

## **四、多 Agent 并行**

早期手工多 agent 协调通常必须在 agent 之外建立。现在 cc 已经有原生 subagents、Agent Teams、Dynamic Workflows，外部编排更适合跨工具、跨仓库、自定义运行时，或者需要更强隔离的场景。

### **Git worktree**

实用范式：

1. 独立并行：每个 agent 在各自 worktree 工作，最终产出 PR 给主 agent，最简单
2. 分裂合并：用多个 subagent 区分文件范围同步加速做一个任务
3. 五大关键要素：worktree、数据库、隔离的环境/端口、独立 [CLAUDE.md](http://CLAUDE.md)、合并策略

局限性：

1. 隔离代码不等于隔离运行时
2. 上下文丢失：极度考验主 agent 的派发水平
3. 上游漂移
4. 瓶颈可能在人：人类审查验证的带宽极低

### **文件锁**

1. Agent Teams 原生任务列表锁
2. git worktree lock：主要是保护 worktree 不被 prune/cleanup，不等于业务级写锁
3. 目录所有权：指定某个 agent 为该目录唯一写入者
4. 第三方执行层锁：比如 railguard 等
5. 序列化实现：特定任务回归串行

### **成本 / token**

这几个模式本质上都是用 token 换质量、验证和并行度。

subagent 会开独立上下文，Agent Teams 是多个 cc 实例，Dynamic Workflows 又会生成更多 agents，所以它们都不是省钱模式。

也正是因为这些东西太容易烧 token，才会有一类省 token / 管控用量的需求。

比如 RTK（[https://www.rtk-ai.app/](https://www.rtk-ai.app/)）这类压缩命令输出、减少 CLI 噪声的产品，还有 ccusage 这种看 agent CLI token 和成本的工具。

我的理解是，省 token 的核心不是抠 prompt，而是减少无效上下文、减少无效循环，让贵模型只处理真正值得它处理的部分。

## **五、实现路线**

当前主要有三大梯队

1. 原生能力，由 cc 内置
2. 外部编排器，如 ccswarm 等
3. cloud agents

这三层不是简单的替代关系。

越往下越轻，越靠近本地开发者；越往上越重，越适合团队治理、长任务、审计和权限隔离。

## **六、总结**

![Agent 工程分层示意图：Loop engineering 层触发 Orchestration 编排层，再分发到 Git worktree 隔离层，底部由文件锁与协调层管理共享 .git 仓库](https://github.com/CLCK0622/images/blob/main/superpowers-loop-engineering-summary-1.png?raw=true)

Superpowers 不一定是效果最好的，但是是理解这些模式的最佳入口，也是极其轻量的、开箱即用的最佳实践之一。约束 agent 的最有效方式不是限制它的能力，而是给它一套它无法合理化绕过的流程纪律。

![厚 harness 到薄 harness 的光谱图：从 LangGraph、Superpowers 到 Claude Code、模型内化一切的理想目标，配上模型变强后对应 harness 组件应被删除的观点](https://github.com/CLCK0622/images/blob/main/superpowers-loop-engineering-summary-2.png?raw=true)

借助后训练，每一代基模的进化，都纳入了社区优秀 harness 的特性，薄 harness 不断从厚 harness 学习，社区再不断补充厚 harness，二者共生进化，这也是 anthropic 保留并且将 superpowers 社区作为其半官方用法之一的原因。
