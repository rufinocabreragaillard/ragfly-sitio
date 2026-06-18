---
status: live
last_updated: 2026-06-18
audience: external integrators — scripts and terminal
see_also:
  - INTEGRATION.md
  - REST.md
---

# RAGfly — CLI Interface

The `ragfly` binary lets you operate RAGfly from the terminal or scripts without writing HTTP directly.

---

## Installation

```bash
pip install ragfly
ragfly version
# RAGfly Desktop v2.x.x
```

---

## Authentication

### Interactive login (JWT, 1 hour)

```bash
ragfly login
# Email: user@company.com
# Password: ••••••••
# ✓ Session started — group: COMPANY, entity: COMPANY
```

### API Key (automations, no expiry)

```bash
export RAGFLY_TOKEN=slm_live_xxxxxxxxxx   # the CLI picks it up automatically
```

Or create one from the CLI:

```bash
ragfly cloud api-key crear --nombre "pipeline-ci" --rol DOC-ADMIN
# → api_key: slm_live_...  (save now — not shown again)
```

---

## Binary structure

```
ragfly
├── login / logout / version / config
├── local       ← operations on the local filesystem (scan, sync, daemon)
└── cloud       ← operations against the remote API (api.ragfly.ai)
    ├── me
    ├── documento   listar | ver
    ├── espacio     listar | ver
    ├── habilidad   listar | ver | ejecutar
    ├── cola        ver | ejecuciones
    ├── api-key     crear | listar | revocar
    └── chat        enviar
```

Legacy commands (`ragfly escanear`, `ragfly sync`, etc.) still work as aliases for `ragfly local <cmd>` for compatibility with existing scripts.

---

## Main cloud commands

### Verify context

```bash
ragfly cloud me
# User:           bot-finance
# Primary role:   DOC-ADMIN
# Active group:   COMPANY
# Active entity:  COMPANY
```

### Documents

```bash
# List with filters
ragfly cloud documento listar --estado VECTORIZADO --limite 20

# Document detail
ragfly cloud documento ver DOC-2024-001
# Includes state, location, size, extracted features, etc.
```

### Workspaces

```bash
ragfly cloud espacio listar

ragfly cloud espacio ver 42
# Detail: workspace criteria + first documents + queue state
```

### LLM Skills

```bash
# View catalog
ragfly cloud habilidad listar

# Skill detail
ragfly cloud habilidad ver RESUMIR_DOCUMENTO

# Execute over a workspace (queues and returns execution id)
ragfly cloud habilidad ejecutar RESUMIR_DOCUMENTO --espacio 42

# Execute and wait for result
ragfly cloud habilidad ejecutar RESUMIR_DOCUMENTO --documento DOC-2024-001 --esperar
```

### Pipeline queue

```bash
# View current state
ragfly cloud cola ver --estado EJECUTANDO

# Follow in real time (like tail -f)
ragfly cloud cola ver -f

# Execution history
ragfly cloud cola ejecuciones --limite 10
```

### Chat (conversational interface)

```bash
# New thread
ragfly cloud chat enviar "Summarize the 2024 lease contracts"

# Continue existing thread
ragfly cloud chat enviar --conversacion 512 "Which ones have a price adjustment clause?"
```

---

## Global flags

| Flag | Effect |
|---|---|
| `-o tabla` | Human-readable output (default) |
| `-o json` | Structured JSON — for scripts and pipes |
| `-o csv` | For tabular analysis |
| `-o id` | Only the resource id/code — useful in pipes |
| `-v` | Shows method + URL + status for each request |
| `--limite N` | Number of results |
| `--pagina N` | Pagination |

---

## For scripts and CI/CD

```bash
#!/bin/bash
export RAGFLY_TOKEN=slm_live_xxxxxxxxxx

# List unchunked documents and process them
ragfly cloud documento listar --estado CHUNKEADO -o json \
  | jq -r '.[].codigo_documento' \
  | while read codigo; do
      ragfly cloud habilidad ejecutar RESUMIR_DOCUMENTO --documento "$codigo" --esperar
    done
```

---

## Local operations (`ragfly local`)

To scan the filesystem and sync with the cloud:

```bash
ragfly local escanear /path/to/my/documents
ragfly local sync
ragfly local daemon   # daemon mode — watches for changes and syncs automatically
```

These operations require the client to be configured pointing to your cloud group.
