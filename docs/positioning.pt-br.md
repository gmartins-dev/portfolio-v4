# Posicionamento profissional (mercado brasileiro)

Versão em português de [positioning.md](positioning.md), adaptada ao mercado
brasileiro. A tese, as evidências e os limites são os mesmos. O que muda é
como dizer isso para recrutadores, tech leads e clientes no Brasil: cargos e
termos de busca, senioridade, modalidade de contratação, formação e
vocabulário. Para a copy do site em PT-BR (`"pt-BR"` em `src/content/`), as
regras deste documento valem junto com as da versão em inglês.

## Tese

> Engenheiro de software full-stack com foco em engenharia de produto e
> arquitetura de software. Constrói e evolui produtos da definição do
> problema à produção, usa coding agents ao longo do ciclo de desenvolvimento
> em workflows orientados por especificação, com testes, quality gates e
> revisão humana, e integra funcionalidades de IA em produtos quando faz
> sentido. O julgamento e a responsabilidade continuam humanos.

Ordem de leitura para quem chega ao perfil: **produto, depois arquitetura,
depois IA**. Produto mostra o que ele entrega; arquitetura, por que se
sustenta em produção; IA, como ele trabalha e onde já integrou IA em
software real.

Princípio: **a IA amplia o alcance do engenheiro; julgamento, verificação e
responsabilidade continuam humanos.**

## O que muda no mercado brasileiro

| Tema | No Brasil | Como aplicar |
| --- | --- | --- |
| Cargo e busca | Vagas e filtros usam tanto "Engenheiro(a) de Software" quanto "Desenvolvedor(a) Fullstack", e muitas empresas de tecnologia escrevem o cargo em inglês | No site em PT, o título e a meta usam "Desenvolvedor Fullstack", que é como se busca no Brasil (decisão do dono, 2026-10-25). No texto corrido, "engenheiro de software". Em inglês, "Software Engineer" |
| Senioridade | Os níveis júnior, pleno e sênior aparecem no título da vaga e são filtro comum de recrutadores | "Sênior" aparece no cargo atual (LinkedIn e currículo) e nas candidaturas. No site, continua fora do título e da intro |
| Stack | Vagas brasileiras costumam listar a stack em detalhe, e triagens em plataformas de recrutamento buscam palavras exatas | No LinkedIn e no currículo, citar a stack real: TypeScript, React, Next.js, Node.js, NestJS, PostgreSQL, AWS. No site, a stack fica nos estudos de caso e em "Ferramentas que uso" |
| Modalidade | CLT, PJ e regime (remoto, híbrido, presencial) são decididos cedo na conversa | Nada disso é publicado no site (decisão do dono). CLT, PJ, modalidade e faixa salarial ficam para a conversa |
| Experiência internacional | Trabalho com times do Reino Unido e da Espanha, em inglês, é um diferencial claro | Dizer "trabalhei com times no Brasil, no Reino Unido e na Espanha" e "inglês fluente" |
| Pós-graduação | A especialização lato sensu é uma formação valorizada, e a PUC Minas é uma instituição conhecida, sobretudo em Minas Gerais | Usar o nome oficial e o status: "Especialização em Arquitetura de Software Distribuído, PUC Minas (em andamento, set. 2026 a mar. 2028)". Não chamar de mestrado nem de MBA |
| Dados sensíveis | Em fintech e saúde, recrutadores associam dados sensíveis à LGPD | Descrever os guardrails como estão no estudo de caso. Não afirmar conformidade com a LGPD nem trabalho jurídico sem evidência |

## Limites do posicionamento (orientação para quem escreve)

| Limite | Orientação |
| --- | --- |
| Especialista em IA | Não posicionar como "Engenheiro de IA", "Engenheiro de ML" ou "especialista em IA". O foco é engenharia de software, desenvolvimento com coding agents e integração de IA em produtos |
| Código sem supervisão | O diferencial é especificação, escopo delimitado, testes, quality gates, revisão humana e responsabilidade. Explicar o método de forma positiva, sem atacar "vibe coding" ou o jeito de trabalhar dos outros |
| Gestão de pessoas | O caminho é a carreira técnica (contribuidor individual), com liderança técnica. Só falar dessa preferência quando o assunto for carreira, sem definir a identidade pelo que ele não quer |
| "Arquiteto de Software" como cargo | Arquitetura é foco técnico, não o cargo atual. Mostrar arquitetura com decisões e sistemas em produção |
| "Agêntico" em produtos | Usar "sistema agêntico" só para trabalho com comportamento de agente demonstrado (orquestração em várias etapas, uso de ferramentas) e só na parte que foi dele. Integração com LLM, interface conversacional ou guardrails, sozinhos, são "funcionalidades de IA" ou "integração de IA" |

## Evidências

As evidências são as de [positioning.md](positioning.md#evidence). Em
português:

| Pilar | Evidência | O que dá para dizer |
| --- | --- | --- |
| Engenharia de produto de ponta a ponta | Priorize.me (criador; beta pública; boards colaborativos em tempo real); trabalho independente para clientes de saúde e alimentação (2025 a 2026, encerrado; mostrar só os anos); projetos freelance de 2021 a 2022 | "Levo problemas de produto até a produção e continuo evoluindo o software depois do lançamento." |
| Arquitetura de software e confiabilidade | Plataforma de crédito AI-first (anonimizada): o core, um monólito modular com arquitetura hexagonal e ingestão de eventos reprocessável, e a integração com as camadas de IA; payments-api-node (idempotência com requisições concorrentes; desafio de processo seletivo, listado em Mais projetos); arquitetura de frontend e design system da Nisien.ai; ADRs e quality gates deste repositório | "Tomo e documento decisões de arquitetura sobre fronteiras, consistência, integrações e operação em produção." |
| Agentic engineering | sdd-agentic-flow (criador, open source): harness para trabalho de coding agents spec-first, delimitado e verificável, com revisão humana; documentado para Codex, Cursor, Claude Code e GitHub Copilot | "Uso coding agents em todo o ciclo de desenvolvimento, dentro de um processo spec-driven que publiquei como open source." |
| Funcionalidades de IA em produtos | Plataforma de crédito: integração do core com as camadas de IA conversacional, com guardrails para dados sensíveis e para etapas do fluxo; Nisien.ai: aplicação principal de um produto de cibersegurança com IA, desde a primeira versão; Backbase: prova de conceito de assistente com IA que venceu o hackathon interno; Priorize.me: servidor MCP construído por ele, que permite a clientes de IA listar, criar e mover tarefas com as permissões da conta (tool use exposto a agentes, inteiramente dele) | "Integrei funcionalidades de IA em produtos, com controles e supervisão humana." Nunca sugerir que ele construiu os modelos ou as camadas de IA feitas por colegas |
| Formação em arquitetura | PUC Minas, Especialização em Arquitetura de Software Distribuído, set. 2026 a mar. 2028, em andamento | "Estou aprofundando a formação em arquitetura de software distribuído." Indica estudo em curso, não domínio de toda a ementa |
| Contexto internacional | Times no Reino Unido (Nisien.ai, Backbase, Vochlea, Loop) e na Espanha (ChatWith.io); inglês fluente, português nativo | "Trabalhei com times no Brasil, no Reino Unido e na Espanha." |

### Limites honestos

- **Plataforma AI-first:** as camadas de IA são construídas por colegas; a
  contribuição dele é o core e a integração. O verbo é "integrei", nunca
  "construí a IA".
- **Formação:** a especialização está em andamento. As disciplinas podem
  aparecer como áreas de estudo, nunca como experiência profissional.
- **Velocidade e qualidade:** não afirmar que a IA deixa a entrega mais
  rápida ou melhora a qualidade sem medição. Mostrar o processo.
- **Este repositório como prova:** ele mostra instruções para agentes
  (`AGENTS.md`), ADRs, testes, gates de CI e commits feitos com coding agents.
  Descrever o que ele mostra, sem afirmar que toda mudança seguiu o processo
  completo.
- **Trabalho confidencial:** nada de nomes de empregadores, clientes ou
  projetos confidenciais, e nenhum detalhe técnico distintivo fora do escopo
  aprovado do estudo de caso anonimizado. Verificar contra
  [maintenance.md](maintenance.md) e `scripts/denylist.json`.
- **Arquitetura:** descrever decisões e trade-offs concretos. Um curso, um
  projeto ou contato com uma tecnologia não sustentam "especialista em
  microsserviços" ou "arquiteto cloud".

## Frases-base

A mesma mensagem em todos os canais; muda só o tamanho.

- **Longa:** Engenheiro de software com foco em engenharia de produto
  full-stack e arquitetura de software. Construo e evoluo produtos da
  definição do problema à produção e uso coding agents ao longo do ciclo de
  desenvolvimento, em workflows orientados por especificação, com testes,
  quality gates e revisão humana. Também integro funcionalidades de IA em
  produtos.
- **Curta** (bios, meta descriptions): Engenheiro de software com foco em
  engenharia de produto e arquitetura de software, trabalhando com coding
  agents num processo spec-driven e revisado.
- **Para recrutadores** (LinkedIn, mensagem inicial): Engenheiro de software
  full-stack (TypeScript, React, Node.js), com foco em engenharia de produto e
  arquitetura de software. Experiência com times no Brasil, no Reino Unido e
  na Espanha, em fintech, cibersegurança com IA e saúde.

## Vocabulário

| Preferir | Evitar ou qualificar | Por quê |
| --- | --- | --- |
| Desenvolvedor Fullstack (título e meta em PT), engenheiro de software (texto corrido), Software Engineer (EN) | "Engenheiro de IA", "especialista em IA", "Engenheiro de ML" | Indicam outra especialização |
| Sênior no cargo atual e nas candidaturas | "Sênior" em todo título, bio ou descrição do site | Senioridade é o nível; a profissão é a identidade |
| arquitetura de software, trade-offs, sistemas distribuídos, eventos, APIs, observabilidade, ADRs | "especialista em microsserviços", "arquiteto cloud" sem evidência | Descrever o que foi aplicado |
| agentic engineering, spec-driven development, coding agents, tarefas delimitadas, testes, quality gates, revisão humana | "a IA escreve meu código", "programo com IA" sem explicar o processo | Explicar o método com responsabilidade e verificação |
| funcionalidades de IA, integração com LLM, guardrails, supervisão humana | "sistema agêntico" para qualquer integração com LLM; "construí a IA da empresa" | Precisão sobre o que foi dele |
| engenharia de produto, ownership, entrega de ponta a ponta | "dev 10x", "ninja", "apaixonado por tecnologia" | Clichês que não dizem nada verificável |
| entrega com IA especificada, testada e revisada | "100% feito por IA", ganhos de velocidade sem número | Afirmação sem prova, ou que sugere ausência de julgamento |

Os termos técnicos ficam em inglês quando o mercado os usa assim (agentic
engineering, spec-driven development, coding agents, quality gates, code
review). A frase em volta é escrita em português natural, sem traduzir termo
por termo.

## Regras para textos públicos em português

- Toda afirmação aponta para uma evidência acima.
- Nada de nomes confidenciais. O estudo de caso AI-first é anonimizado e foi
  autorizado em 2026-10-25; cada detalhe fica dentro dessa aprovação.
- No site em PT, "Desenvolvedor Fullstack" no título e na meta, e
  "engenheiro de software" no texto corrido; em inglês, "Software Engineer". "Sênior" só onde o nível é a informação. Cargos anteriores
  ficam como foram exercidos.
- Staff é direção futura, nunca cargo procurado.
- A especialização aparece sempre como em andamento.
- Sem promessa de velocidade ou qualidade sem medição.
- Agentic engineering (como ele desenvolve) fica separado de funcionalidades
  de IA em produtos (o que ele constrói).
- Disponibilidade, modalidade (remoto ou híbrido), CLT ou PJ e faixa salarial
  não são publicados no site.
- No site: português e inglês sempre juntos, sem travessões (verificado por
  `src/content/content.test.ts`).

## Onde isso aparece no site (PT-BR)

| Elemento | Onde | Orientação |
| --- | --- | --- |
| Título, meta, intro | `copy.meta` e `copy.home` em `src/content/copy.ts` | Título em PT: "Guilherme Martins \| Desenvolvedor Fullstack"; a meta começa do mesmo jeito. O cartão social em PT usa o mesmo termo (`copy.meta.role`) |
| Capacidades e estudos de caso | `copy.capabilities`, `caseStudies` | Mesma ordem da versão em inglês: a plataforma AI-first, Priorize.me e sdd-agentic-flow. A API de pagamentos fica em Mais projetos |
| Formação | `education` em `src/content/profile.ts` | "Especialização em Arquitetura de Software Distribuído", PUC Minas, em andamento |
| Contato | `copy.contact` | "Para engenharia de produto, arquitetura ou colaboração em open source…". Sem linguagem de busca de emprego ou disponibilidade no site |

## Fontes

As fontes de terminologia e enquadramento são as de
[positioning.md](positioning.md#sources). As observações sobre o mercado
brasileiro (cargos, níveis, stack nas vagas, modalidades) são orientação
editorial, não dados medidos; confirme com vagas reais antes de usá-las como
argumento.
