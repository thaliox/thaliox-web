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

> Current status: **M4 cluster + multi-platform shipped (v0.4.0)** — THALIOX is now an operating system for a distributed society of agents: agents run inside real Firecracker microVMs (M2), survive node loss via CRDT merge + a self-healing supervisor (M3), and collaborate over a fabric across hosts — cross-host live migration validated on two KVM machines, teams in four paradigms, and one capability-gated cluster front door (M4). See [development progress](https://thaliox.dev).
