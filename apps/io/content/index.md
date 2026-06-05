---
title: THALIOX 文档
description: 为 AI、由 AI 打造的操作系统 —— 上手、核心概念、指南与参考。
---

# THALIOX 文档

THALIOX 是从第一性原理为 AI 的工作方式重新设计的操作系统。本站帮你**上手**、理解**核心概念**、查阅**参考**。

## 从这里开始

- [快速上手](/getting-started) — 安装、跑通第一个自主 agent。
- [核心概念](/concepts) — TAM 三原语、五不变量、八 crate。

## 它是什么

- **向量消息** 取代文件 —— agent 间交换"意义"而非字节。
- **注意力预算** 取代 CPU 时间片 —— 每次思考与行动按 token 计量、对账。
- **能力令牌** 取代 uid/gid —— 签名 + 过期 + scope,副作用前先校验。

整个系统由 [TAM 抽象机契约](https://github.com/thaliox/thaliox-os/blob/main/docs/rfcs/0001-abstract-machine.md) 定义,
从软件实现到未来自研硅遵守同一份语义。

> 当前状态:**M1 单机 MVP 已交付(v0.1.0)**。详见 [开发进展](https://thaliox.dev)。
