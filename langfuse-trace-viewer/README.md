# Langfuse Trace Viewer

这是一个用 React 复刻的 Langfuse Trace Detail 页面，使用假数据进行演示。

## 功能特性

- ✅ Trace 基本信息展示（ID、时间戳、用户信息等）
- ✅ Trace 性能指标（延迟、Token 使用量、成本）
- ✅ 评分展示（Scores）
- ✅ 观察树形结构展示（Observations Tree）
- ✅ 支持多种观察类型（Span、Generation、Event）
- ✅ 详细信息面板（Input、Output、Metadata、Usage）
- ✅ 响应式设计
- ✅ 美观的 UI 和交互效果

## 项目结构

```
langfuse-trace-viewer/
├── src/
│   ├── components/
│   │   ├── TraceDetailView.jsx      # 主视图组件
│   │   ├── TraceDetailView.css
│   │   ├── TraceHeader.jsx          # Trace 头部信息
│   │   ├── TraceHeader.css
│   │   ├── TraceTree.jsx            # Trace 树形结构
│   │   ├── TraceTree.css
│   │   ├── ObservationNode.jsx      # 单个观察节点
│   │   ├── ObservationNode.css
│   │   ├── DetailPanel.jsx          # 详细信息面板
│   │   └── DetailPanel.css
│   ├── data/
│   │   └── mockTraceData.json       # 假数据
│   ├── App.jsx                       # 应用主组件
│   ├── App.css
│   ├── main.jsx                      # 入口文件
│   └── index.css                     # 全局样式
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## 安装依赖

```bash
cd langfuse-trace-viewer
npm install
```

## 运行项目

```bash
npm run dev
```

项目将在 `http://localhost:3000` 运行。

## 构建项目

```bash
npm run build
```

构建后的文件将在 `dist` 目录下。

## 预览构建结果

```bash
npm run preview
```

## 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Lucide React** - 图标库
- **纯 CSS** - 样式（无需额外的 CSS 框架）

## 假数据说明

假数据位于 `src/data/mockTraceData.json`，模拟了一个完整的 Langfuse trace 结构，包括：

- Trace 基本信息
- 嵌套的观察结构（Observations）
  - Span: 代码执行跨度
  - Generation: LLM 生成
  - Event: 事件记录
- Token 使用量和成本
- 模型参数
- 评分信息

你可以修改这个 JSON 文件来测试不同的 trace 数据。

## 主要组件说明

### TraceDetailView
主视图组件，负责整体布局，分为左右两栏：
- 左侧：Trace 树形结构
- 右侧：详细信息面板

### TraceHeader
显示 Trace 的头部信息，包括：
- Trace 名称和 ID
- 标签
- 元数据（时间戳、用户、延迟、成本等）
- 评分信息

### TraceTree
以树形结构展示所有观察（Observations），支持多层嵌套。

### ObservationNode
单个观察节点，显示：
- 节点类型和图标
- 节点名称
- 执行时间和持续时间
- Token 使用量和成本（如果有）
- 状态标识

### DetailPanel
详细信息面板，通过标签页展示：
- Input: 输入数据
- Output: 输出数据
- Metadata: 元数据
- Usage: 使用量统计（Token、成本、延迟等）

## 自定义样式

所有组件都有对应的 CSS 文件，你可以轻松修改颜色、间距等样式。主要的颜色变量定义在各个组件的 CSS 中。

## 许可证

MIT
