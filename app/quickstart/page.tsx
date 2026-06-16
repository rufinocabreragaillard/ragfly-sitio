'use client'

import Image from 'next/image'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/* Quickstart — ragfly.ai/quickstart                                   */
/* Guía de integración para desarrolladores: MCP · REST · CLI         */
/* ------------------------------------------------------------------ */

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-slm-dark text-slm-light/90 font-mono text-sm leading-relaxed p-5 my-4">
      <code>{children}</code>
    </pre>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 mb-8">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slm-brand-dark to-slm-brand flex items-center justify-center text-white text-sm font-semibold">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slm-dark text-base mb-2">{title}</h3>
        {children}
      </div>
    </div>
  )
}

function SectionCard({ id, emoji, title, badge, children }: { id: string; emoji: string; title: string; badge?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{emoji}</span>
        <h2 className="text-2xl font-semibold text-slm-dark">{title}</h2>
        {badge && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-slm-brand-dark to-slm-brand text-white">
            {badge}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

export default function QuickstartPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slm-light-gray">
        <div className="max-w-[900px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/ragfly_isotipo.png" alt="RAGfly" width={24} height={24} />
            <span className="font-manrope font-semibold text-slm-dark text-base">RAGfly</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-slm-gray">
            <a href="#mcp" className="hover:text-slm-dark transition-colors">MCP</a>
            <a href="#rest" className="hover:text-slm-dark transition-colors">REST</a>
            <a href="#cli" className="hover:text-slm-dark transition-colors">CLI</a>
            <a href="https://api.ragfly.ai/docs" target="_blank" rel="noopener noreferrer" className="hover:text-slm-dark transition-colors">Swagger API</a>
            <a href="https://app.ragfly.ai" className="bg-slm-dark text-white px-4 py-1.5 rounded-full text-xs font-medium hover:opacity-80 transition-opacity">
              Ir a la app →
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 py-14">

        {/* Intro */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-slm-brand font-medium mb-3">Quickstart</p>
          <h1 className="text-4xl font-semibold text-slm-dark mb-4 leading-tight">
            De cero a tu primer resultado<br />
            <span className="bg-gradient-to-r from-slm-brand-dark via-slm-brand to-slm-brand-light bg-clip-text text-transparent">en menos de 5 minutos.</span>
          </h1>
          <p className="text-lg text-slm-gray font-helvetica-neue leading-relaxed max-w-[620px]">
            RAGfly expone tres superficies de integración. Elige la que encaje con tu flujo — el resultado es el mismo: tu agente o aplicación respondiendo con citas sobre tus documentos.
          </p>

          {/* Elige tu camino */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { id: 'mcp', icon: '🤖', label: 'MCP', desc: 'Agentes LLM (Claude, Cursor, Cline)', badge: 'Abrimos aquí' },
              { id: 'rest', icon: '🔌', label: 'REST', desc: 'Código propio (Python, Node, curl)' },
              { id: 'cli', icon: '⚡', label: 'CLI', desc: 'Terminal, scripts, CI/CD' },
            ].map(c => (
              <a key={c.id} href={`#${c.id}`} className="border border-slm-light-gray rounded-2xl p-5 hover:border-slm-brand hover:shadow-sm transition-all group">
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="font-semibold text-slm-dark text-sm group-hover:text-slm-brand transition-colors">{c.label}</div>
                <div className="text-xs text-slm-gray mt-1 font-helvetica-neue leading-snug">{c.desc}</div>
                {c.badge && <div className="mt-2 text-xs text-slm-brand font-medium">{c.badge} ↓</div>}
              </a>
            ))}
          </div>
        </div>

        {/* Paso previo: API Key */}
        <div className="bg-slm-light rounded-2xl p-6 mb-14 border border-slm-light-gray">
          <h2 className="font-semibold text-slm-dark mb-1">Antes de empezar — obtén tu API Key</h2>
          <p className="text-sm text-slm-gray font-helvetica-neue mb-4">
            Entra a <a href="https://app.ragfly.ai/api-keys" className="text-slm-brand underline" target="_blank" rel="noopener noreferrer">app.ragfly.ai/api-keys</a> y crea una key con el rol que necesitas. La verás solo una vez — guárdala en tu gestor de secretos.
          </p>
          <div className="flex flex-wrap gap-3">
            {['DOC-ADMIN — lectura y escritura (documentos, espacios, habilidades)', 'DOCS-USUARIO-FINAL — solo lectura'].map(r => (
              <span key={r} className="text-xs bg-white border border-slm-light-gray rounded-lg px-3 py-1.5 text-slm-gray font-mono">{r}</span>
            ))}
          </div>
          <Code>{`# Formato de la key
slm_live_xxxxxxxxxxxxxxxxxxxxxxxx

# Úsala en todos los métodos:
Authorization: Bearer slm_live_xxxxxxxxxxxxxxxxxxxxxxxx`}</Code>
          <p className="text-xs text-slm-gray font-helvetica-neue">Verifica que funciona: <code className="bg-white px-1.5 py-0.5 rounded border border-slm-light-gray text-xs">curl https://api.ragfly.ai/auth/me -H "Authorization: Bearer slm_live_..."</code></p>
        </div>

        {/* MCP */}
        <SectionCard id="mcp" emoji="🤖" title="Integración vía MCP" badge="Abrimos aquí">
          <p className="text-slm-gray font-helvetica-neue mb-6 leading-relaxed">
            El camino más rápido si ya usas un agente LLM compatible con MCP (Claude Code, Cursor, Cline, etc.). El agente descubre los tools automáticamente — sin escribir código de integración.
          </p>

          <Step n={1} title="Agrega RAGfly como servidor MCP">
            <p className="text-sm text-slm-gray mb-2 font-helvetica-neue">En tu archivo <code className="bg-slm-light px-1.5 rounded text-xs">.mcp.json</code> (proyecto) o <code className="bg-slm-light px-1.5 rounded text-xs">~/.mcp.json</code> (global):</p>
            <Code>{`{
  "mcpServers": {
    "ragfly": {
      "url": "https://api.ragfly.ai/mcp/sse",
      "headers": {
        "Authorization": "Bearer slm_live_xxxxxxxxxx"
      }
    }
  }
}`}</Code>
            <p className="text-xs text-slm-gray font-helvetica-neue">Si tu cliente soporta HTTP streamable (más eficiente): usa <code className="bg-slm-light px-1 rounded">https://api.ragfly.ai/mcp-http/</code></p>
          </Step>

          <Step n={2} title="Reinicia tu cliente y verifica la conexión">
            <p className="text-sm text-slm-gray font-helvetica-neue mb-2">Los tools aparecen con prefijo <code className="bg-slm-light px-1 rounded text-xs">mcp__ragfly__</code>. Llama primero:</p>
            <Code>{`estado_sesion()
→ {"usuario": "bot-finanzas", "grupo": "EMPRESA", "rol": "DOC-ADMIN"}`}</Code>
          </Step>

          <Step n={3} title="Tu primer resultado">
            <Code>{`# Pregunta en lenguaje natural con RAG completo
preguntar(texto="¿Cuáles son las cláusulas de penalización en los contratos de 2024?")
→ Respuesta con citas a la fuente

# Búsqueda semántica directa (sin LLM)
buscar_chunks(q="cláusulas de penalización", limite=5)
→ [{chunk, documento, score}, ...]`}</Code>
          </Step>

          <div className="bg-slm-light rounded-xl p-4 text-sm">
            <p className="font-medium text-slm-dark mb-2">Tools disponibles (12 en total)</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-slm-gray font-mono">
              {['estado_sesion', 'listar_documentos', 'ver_documento', 'buscar_chunks', 'preguntar', 'listar_espacios', 'ver_espacio', 'listar_habilidades', 'ver_habilidad', 'ejecutar_habilidad', 'ver_cola', 'ver_ejecuciones'].map(t => (
                <span key={t}>· {t}</span>
              ))}
            </div>
            <a href="/agents.json" className="text-xs text-slm-brand mt-3 block hover:underline">Ver catálogo completo → agents.json</a>
          </div>
        </SectionCard>

        {/* REST */}
        <SectionCard id="rest" emoji="🔌" title="Integración vía REST">
          <p className="text-slm-gray font-helvetica-neue mb-6 leading-relaxed">
            Acceso directo desde cualquier lenguaje o plataforma. Base URL: <code className="bg-slm-light px-1.5 rounded text-sm">https://api.ragfly.ai</code> · Swagger interactivo: <a href="https://api.ragfly.ai/docs" target="_blank" rel="noopener noreferrer" className="text-slm-brand hover:underline">api.ragfly.ai/docs</a>
          </p>

          <Step n={1} title="Verificar conexión">
            <Code>{`curl https://api.ragfly.ai/auth/me \\
  -H "Authorization: Bearer slm_live_xxxxxxxxxx"

# Respuesta esperada:
{
  "codigo_usuario": "bot-finanzas",
  "rol_principal": "DOC-ADMIN",
  "grupo_activo": "EMPRESA"
}`}</Code>
          </Step>

          <Step n={2} title="Listar documentos vectorizados">
            <Code>{`curl "https://api.ragfly.ai/documentos/paginado?estado=VECTORIZADO&limite=10" \\
  -H "Authorization: Bearer slm_live_xxxxxxxxxx"`}</Code>
          </Step>

          <Step n={3} title="Búsqueda semántica">
            <Code>{`curl -X POST https://api.ragfly.ai/documentos/buscar-semantico \\
  -H "Authorization: Bearer slm_live_xxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"q": "cláusulas de penalización", "limit": 5}'`}</Code>
          </Step>

          <Step n={4} title="Pregunta con RAG completo (stream)">
            <Code>{`# 1. Crear conversación
curl -X POST https://api.ragfly.ai/chat/conversaciones \\
  -H "Authorization: Bearer slm_live_xxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"codigo_funcion": "CHAT-USUARIO"}'
# → {"id": 42, ...}

# 2. Enviar mensaje (respuesta en SSE)
curl -X POST https://api.ragfly.ai/chat/conversaciones/42/mensajes/stream \\
  -H "Authorization: Bearer slm_live_xxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"texto": "¿Cuáles son las cláusulas de penalización?"}'`}</Code>
          </Step>

          <div className="border border-slm-light-gray rounded-xl overflow-hidden text-sm">
            <div className="bg-slm-light px-4 py-3 font-medium text-slm-dark text-xs uppercase tracking-wide">Endpoints esenciales</div>
            {[
              ['GET', '/auth/me', 'Contexto del usuario autenticado'],
              ['GET', '/documentos/paginado', 'Listar documentos con filtros'],
              ['POST', '/documentos/buscar-semantico', 'Búsqueda semántica sin LLM'],
              ['GET', '/espacios-trabajo/paginado', 'Listar Espacios de Trabajo'],
              ['GET', '/habilidades', 'Catálogo de habilidades LLM'],
              ['POST', '/habilidades/{codigo}/ejecutar', 'Ejecutar habilidad sobre espacio o doc'],
              ['GET', '/cola-estados-docs/paginado', 'Estado del pipeline de ingesta'],
              ['POST', '/chat/conversaciones/{id}/mensajes/stream', 'RAG con respuesta en stream'],
            ].map(([m, r, d]) => (
              <div key={r} className="flex items-start gap-3 px-4 py-2.5 border-t border-slm-light-gray">
                <span className={`text-xs font-mono font-semibold shrink-0 w-10 ${m === 'POST' ? 'text-green-600' : 'text-slm-brand'}`}>{m}</span>
                <code className="text-xs text-slm-dark shrink-0 w-64">{r}</code>
                <span className="text-xs text-slm-gray font-helvetica-neue">{d}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* CLI */}
        <SectionCard id="cli" emoji="⚡" title="Integración vía CLI">
          <p className="text-slm-gray font-helvetica-neue mb-6 leading-relaxed">
            Ideal para scripts, automatizaciones, pipelines CI/CD y operación desde terminal. Sin escribir HTTP directamente.
          </p>

          <Step n={1} title="Instalar">
            <Code>{`pip install ragfly
ragfly version
# RAGfly Desktop v2.x.x`}</Code>
          </Step>

          <Step n={2} title="Autenticar">
            <Code>{`# Opción A — Login interactivo (JWT, 1 hora)
ragfly login

# Opción B — API Key (automatizaciones, sin caducidad)
export RAGFLY_TOKEN=slm_live_xxxxxxxxxx

# Verificar
ragfly cloud me
# Usuario: bot-finanzas · Rol: DOC-ADMIN · Grupo: EMPRESA`}</Code>
          </Step>

          <Step n={3} title="Primeros comandos">
            <Code>{`# Listar documentos vectorizados
ragfly cloud documento listar --estado VECTORIZADO --limite 20

# Ver un documento en detalle
ragfly cloud documento ver DOC-2024-001

# Listar Espacios de Trabajo
ragfly cloud espacio listar

# Ejecutar una habilidad LLM y esperar resultado
ragfly cloud habilidad ejecutar RESUMIR_DOCUMENTO --espacio 42 --esperar

# Ver estado del pipeline
ragfly cloud cola ver --estado EJECUTANDO`}</Code>
          </Step>

          <div className="bg-slm-light rounded-xl p-4 text-sm">
            <p className="font-medium text-slm-dark mb-3">Estructura del binario</p>
            <Code>{`ragfly
├── login / logout / version / config
├── local       ← operaciones sobre el filesystem local
└── cloud
    ├── me
    ├── documento   listar | ver
    ├── espacio     listar | ver
    ├── habilidad   listar | ver | ejecutar
    ├── cola        ver | ejecuciones
    ├── api-key     crear | listar | revocar
    └── chat        enviar`}</Code>
          </div>
        </SectionCard>

        {/* Siguiente paso */}
        <div className="bg-gradient-to-br from-slm-brand-dark to-slm-brand rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-semibold mb-2">¿Listo para producción?</h2>
          <p className="text-white/80 font-helvetica-neue text-sm mb-6">Empieza gratis — sin tarjeta, sin fricción.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://app.ragfly.ai" className="bg-white text-slm-dark px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">Empieza gratis</a>
            <a href="https://api.ragfly.ai/docs" target="_blank" rel="noopener noreferrer" className="border border-white/40 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors">Swagger API</a>
            <a href="/agents.json" className="border border-white/40 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors">agents.json</a>
          </div>
        </div>

        {/* Footer mínimo */}
        <div className="mt-12 pt-8 border-t border-slm-light-gray flex justify-between items-center text-xs text-slm-gray font-helvetica-neue">
          <Link href="/" className="hover:text-slm-dark transition-colors">← Volver al sitio</Link>
          <span>© 2026 RAGfly</span>
        </div>
      </main>
    </div>
  )
}
