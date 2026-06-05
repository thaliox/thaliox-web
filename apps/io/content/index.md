---
title: THALIOX Docs
description: An operating system for AI, by AI — getting started, core concepts, guides, and reference.
---

# THALIOX Docs

THALIOX is an operating system redesigned from first principles around how AI actually works.
These docs help you **get started**, understand the **core concepts**, and look things up in the **reference**.

## Start here

- [Getting started](/getting-started) — install and run your first autonomous agent.
- [Core concepts](/concepts) — TAM's three primitives, five invariants, eight crates.

## What it is

- **Vector messages** replace files — agents exchange meaning, not bytes.
- **Attention budgets** replace CPU time slices — every thought and action is metered and reconciled in tokens.
- **Capability tokens** replace uid/gid — signature + expiry + scope, verified before any side effect.

The whole system is defined by the [TAM Abstract Machine contract](https://github.com/thaliox/thaliox-os/blob/main/docs/rfcs/0001-abstract-machine.md),
so the software implementation and future custom silicon obey one shared semantics.

> Current status: **M1 single-node MVP shipped (v0.1.0)**. See [development progress](https://thaliox.dev).
