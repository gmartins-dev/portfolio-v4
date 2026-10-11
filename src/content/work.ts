import type { CaseStudy, ShortWork } from "./schema";

// Facts below come from the public repositories, their READMEs and docs, npm,
// and the GitHub API, checked on the `reviewed` date of each entry. Images are
// captured by scripts/capture-work-images.mjs. Validated against the
// schemas at build time (src/content/validate.ts).

const saf: CaseStudy = {
	slug: "sdd-agentic-flow",
	title: "sdd-agentic-flow",
	kind: { en: "Open source", "pt-BR": "Open source" },
	summary: {
		en: "An open-source harness that makes coding-agent work spec-first, bounded and verifiable, with people keeping the final say.",
		"pt-BR":
			"Um harness open source que torna o trabalho de agentes de código guiado por especificação, delimitado e verificável, com a decisão final nas mãos de pessoas.",
	},
	role: { en: "Creator and maintainer", "pt-BR": "Criador e mantenedor" },
	period: { start: "2026-08" },
	stack: [
		"TypeScript",
		"Node.js CLI",
		"Agent Skills (Markdown)",
		"YAML contracts",
	],
	facts: {
		en: [
			"Published on npm under the MIT license",
			"95 releases since August 2026",
			"12 skills covering plan, implement, check, review and validate",
			"Zero runtime npm dependencies",
		],
		"pt-BR": [
			"Publicado no npm sob licença MIT",
			"95 releases desde agosto de 2026",
			"12 skills cobrindo planejamento, implementação, checagem, revisão e validação",
			"Nenhuma dependência npm em tempo de execução",
		],
	},
	image: {
		src: "/images/work/sdd-agentic-flow",
		widths: [480, 720, 838],
		width: 838,
		height: 629,
		alt: {
			en: "The sdd-agentic-flow README on GitHub: logo, tagline and project summary.",
			"pt-BR":
				"O README do sdd-agentic-flow no GitHub: logo, slogan e resumo do projeto.",
		},
	},
	links: [
		{
			label: { en: "Source on GitHub", "pt-BR": "Código no GitHub" },
			href: "https://github.com/gmartins-dev/sdd-agentic-flow",
		},
		{
			label: { en: "Package on npm", "pt-BR": "Pacote no npm" },
			href: "https://www.npmjs.com/package/sdd-agentic-flow",
		},
		{
			label: {
				en: "Architecture docs",
				"pt-BR": "Documentação de arquitetura",
			},
			href: "https://github.com/gmartins-dev/sdd-agentic-flow/blob/main/docs/architecture.md",
		},
	],
	sections: [
		{
			heading: { en: "The problem", "pt-BR": "O problema" },
			body: {
				en: [
					"Coding agents can start writing code before the request is understood, drift outside the task, and report work as done without executable proof. Reviewers then have to reconstruct intent from the diff before they can check behavior.",
					"I wanted a way to delegate work to agents that keeps the intent written down, the scope bounded, and the evidence inspectable, without handing over decisions that should stay with a person.",
				],
				"pt-BR": [
					"Agentes de código podem começar a escrever antes de entender o pedido, sair do escopo da tarefa e declarar o trabalho pronto sem prova executável. Quem revisa precisa reconstruir a intenção a partir do diff antes de conseguir verificar o comportamento.",
					"Eu queria uma forma de delegar trabalho a agentes mantendo a intenção registrada, o escopo delimitado e as evidências inspecionáveis, sem abrir mão das decisões que devem ficar com uma pessoa.",
				],
			},
		},
		{
			heading: { en: "Approach", "pt-BR": "Abordagem" },
			body: {
				en: [
					"The specification comes first and lives in the repository. Twelve Markdown skills cover the path from plan to prompt, implementation, task check, pull request, review, fix and validation. Each phase writes artifacts a reviewer can open.",
					"A small CLI acts as the control plane: it installs the skill bundle, initializes a workspace and diagnoses the setup. It never runs skills itself. The coding-agent host (Codex, Cursor, Claude Code or VS Code with Copilot) executes the work.",
				],
				"pt-BR": [
					"A especificação vem primeiro e fica no repositório. Doze skills em Markdown cobrem o caminho do planejamento ao prompt, implementação, checagem da tarefa, pull request, revisão, correção e validação. Cada fase gera artefatos que quem revisa pode abrir.",
					"Uma CLI pequena funciona como plano de controle: instala o pacote de skills, inicializa o workspace e diagnostica a configuração. Ela nunca executa skills. Quem executa o trabalho é o host do agente (Codex, Cursor, Claude Code ou VS Code com Copilot).",
				],
			},
		},
		{
			heading: {
				en: "Key decisions and trade-offs",
				"pt-BR": "Decisões e trade-offs",
			},
			body: {
				en: [
					"Skills are the capability layer and the host owns execution. That keeps the toolkit portable across agents. The cost is that it cannot force runtime behavior, so it relies on contracts, gates and evidence instead.",
					"No runtime npm dependencies, a user-local install by default and configuration only when you create it. The trust surface stays small and setup is reversible with an uninstall plan.",
					"Autonomy has explicit limits. Manual, supervised and autonomous modes decide how much progression the agent owns, but commit, push, merge, publish and deploy always stay with a person.",
					"Claims stay measured. The project does not quote token or speed gains without data, and its contract parser rejects unknown keys and executable YAML features.",
				],
				"pt-BR": [
					"As skills são a camada de capacidade e o host controla a execução. Isso mantém o toolkit portável entre agentes. O custo é não poder impor comportamento em tempo de execução, então ele depende de contratos, gates e evidências.",
					"Nenhuma dependência npm em tempo de execução, instalação local do usuário por padrão e configuração só quando você a cria. A superfície de confiança fica pequena e a instalação é reversível com um plano de desinstalação.",
					"A autonomia tem limites explícitos. Os modos manual, supervisionado e autônomo definem quanto do avanço fica com o agente, mas commit, push, merge, publicação e deploy ficam sempre com uma pessoa.",
					"As afirmações são medidas. O projeto não cita ganhos de tokens ou velocidade sem dados, e o parser de contratos rejeita chaves desconhecidas e recursos executáveis de YAML.",
				],
			},
		},
		{
			heading: { en: "Validation", "pt-BR": "Validação" },
			body: {
				en: [
					"Unit tests cover the CLI modules, and scripted CLI journeys exercise install, init, doctor, upgrade and uninstall end to end. Golden example walkthroughs document the artifact shapes each workflow produces, labeled as illustrations rather than evidence of agent behavior.",
				],
				"pt-BR": [
					"Testes unitários cobrem os módulos da CLI, e jornadas automatizadas exercitam install, init, doctor, upgrade e uninstall de ponta a ponta. Exemplos de referência documentam os artefatos de cada fluxo e são apresentados como ilustração, não como evidência do comportamento dos agentes.",
				],
			},
		},
	],
	disclosure: "public",
	reviewed: "2026-10-11",
};

// Priorize.me: the owner's product. Facts from the public landing page and
// the private repository's README, PRODUCT_STORY.md and ADRs, checked
// 2026-10-11. PRODUCT_STORY.md sets the claim limits followed here: no
// permanent-free promise, no public-code or built-in AI claims.
const priorize: CaseStudy = {
	slug: "priorize-me",
	title: "Priorize.me",
	kind: { en: "Independent product", "pt-BR": "Produto independente" },
	summary: {
		en: "A collaborative prioritization app built on the Eisenhower matrix, with shared boards that update in real time. In public beta.",
		"pt-BR":
			"Um app de priorização colaborativa baseado na Matriz de Eisenhower, com boards compartilhados que atualizam em tempo real. Em beta pública.",
	},
	role: { en: "Creator and developer", "pt-BR": "Criador e desenvolvedor" },
	period: { start: "2026-09" },
	stack: [
		"React 19",
		"TypeScript",
		"TanStack Router",
		"TanStack Query",
		"Supabase (Postgres, Auth, Realtime)",
		"Playwright",
	],
	facts: {
		en: [
			"Public beta: free, sign-up required",
			"Interface in Portuguese and English",
			"Authorization enforced in the database",
			"36 architecture decision records",
		],
		"pt-BR": [
			"Beta pública: gratuita, com cadastro",
			"Interface em português e inglês",
			"Autorização garantida no banco de dados",
			"36 registros de decisão de arquitetura",
		],
	},
	image: {
		src: "/images/work/priorize-me",
		widths: [480, 720, 1280],
		width: 1280,
		height: 800,
		alt: {
			en: "The Priorize.me landing page, in Portuguese: the headline “Stop treating everything as urgent” beside an example board with the four quadrants.",
			"pt-BR":
				"A landing page do Priorize.me: o título “Pare de tratar tudo como urgente” ao lado de um board de exemplo com os quatro quadrantes.",
		},
	},
	links: [
		{
			label: { en: "Open the app", "pt-BR": "Abrir o app" },
			href: "https://priorizeme.vercel.app/",
		},
	],
	sections: [
		{
			heading: { en: "The problem", "pt-BR": "O problema" },
			body: {
				en: [
					"Teams treat too many requests as urgent, and the real priorities live in people's heads or in scattered lists. Priorize.me makes the decision explicit: you capture a request in a Backlog, judge its urgency and importance, and choose Do, Schedule, Delegate or Eliminate, on a board everyone involved can see.",
				],
				"pt-BR": [
					"Times tratam demandas demais como urgentes, e as prioridades de verdade ficam na cabeça das pessoas ou em listas espalhadas. O Priorize.me torna a decisão explícita: você captura uma demanda no Backlog, avalia urgência e importância e escolhe Fazer, Agendar, Delegar ou Eliminar, num board que todos os envolvidos enxergam.",
				],
			},
		},
		{
			heading: { en: "Approach", "pt-BR": "Abordagem" },
			body: {
				en: [
					"Boards are private and shared by invitation or join link, with owner, editor and reader roles. Changes reach everyone on the board in real time, and sign-in uses a link sent by email instead of a password.",
					"An MCP server lets compatible AI clients list, create and move tasks with the account's own permissions. The interface ships in Portuguese and English.",
				],
				"pt-BR": [
					"Os boards são privados e compartilhados por convite ou link de entrada, com papéis de dono, editor e leitor. As mudanças chegam a todos no board em tempo real, e o login usa um link enviado por e-mail em vez de senha.",
					"Um servidor MCP permite que clientes de IA compatíveis listem, criem e movam tarefas com as permissões da própria conta. A interface sai em português e inglês.",
				],
			},
		},
		{
			heading: {
				en: "Key decisions and trade-offs",
				"pt-BR": "Decisões e trade-offs",
			},
			body: {
				en: [
					"The board is the unit of tenancy and the database is the authority. Row-level security guards the public tables, writes to tasks and members go through database functions that check the caller's role, and hiding a button in the interface never counts as authorization.",
					"Realtime carries changes but is not state. The database stays the source of truth, each task has a version, and the client applies one rule wherever state converges: the higher version wins. The server computes positions under a per-board lock, so concurrent moves cannot interleave.",
					"The product stays on Supabase without an abstraction layer, but the dependency is confined to boundaries that CI checks, with an inventory of what replacing each service would cost (low for the database, high for row-level security and auth).",
					"The MCP server follows the app's domain: a change to data or a function a tool uses must update that tool and its integration test in the same pull request.",
				],
				"pt-BR": [
					"O board é a unidade de tenancy e o banco é a autoridade. Row-level security protege as tabelas públicas, escritas em tarefas e membros passam por funções do banco que conferem o papel de quem chama, e esconder um botão na interface nunca conta como autorização.",
					"O tempo real transporta mudanças, mas não é estado. O banco continua sendo a fonte de verdade, cada tarefa tem uma versão, e o cliente aplica uma única regra onde o estado converge: a versão maior vence. O servidor calcula as posições sob um lock por board, então movimentos concorrentes não se misturam.",
					"O produto continua no Supabase sem camada de abstração, mas a dependência fica confinada a fronteiras que o CI verifica, com um inventário do custo de substituir cada serviço (baixo para o banco, alto para row-level security e auth).",
					"O servidor MCP acompanha o domínio do app: uma mudança em dados ou numa função que uma tool usa precisa atualizar a tool e o teste de integração no mesmo pull request.",
				],
			},
		},
		{
			heading: { en: "Validation", "pt-BR": "Validação" },
			body: {
				en: [
					"Each test declares its layer in the file name: unit and component tests in Vitest, database tests in pgTAP with race-condition sensors, integration tests for the MCP server, and Playwright end-to-end suites ranked by severity. The critical journey (sign in, create a board, move a task) gates product pull requests, and the public pages run axe checks.",
				],
				"pt-BR": [
					"Cada teste declara sua camada no nome do arquivo: testes unitários e de componente no Vitest, testes de banco em pgTAP com sensores de concorrência, testes de integração do servidor MCP e suítes end-to-end no Playwright, ordenadas por severidade. A jornada crítica (entrar, criar um board, mover uma tarefa) é gate dos pull requests de produto, e as páginas públicas passam por checagens do axe.",
				],
			},
		},
		{
			heading: { en: "Status", "pt-BR": "Situação atual" },
			body: {
				en: [
					"Priorize.me is in public beta: free, with sign-up required and no card. The code repository is private.",
				],
				"pt-BR": [
					"O Priorize.me está em beta pública: gratuito, com cadastro e sem cartão. O repositório do código é privado.",
				],
			},
		},
	],
	disclosure: "public",
	reviewed: "2026-10-11",
};

const payments: CaseStudy = {
	slug: "payments-api-node",
	title: "Idempotent payments API",
	kind: { en: "Technical challenge", "pt-BR": "Desafio técnico" },
	summary: {
		en: "A payment API where retries and concurrent requests with the same Idempotency-Key always return the same stored result, without duplicate processing.",
		"pt-BR":
			"Uma API de pagamentos em que retentativas e requisições concorrentes com a mesma Idempotency-Key sempre devolvem o mesmo resultado salvo, sem processamento duplicado.",
	},
	role: { en: "Sole developer", "pt-BR": "Desenvolvedor único" },
	period: { start: "2026-03", end: "2026-03" },
	stack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "React", "Vite"],
	facts: {
		en: [
			"PostgreSQL is the only source of truth",
			"Integration tests run against a real database",
			"Frontend on Vercel, API and database on Render",
		],
		"pt-BR": [
			"PostgreSQL é a única fonte de verdade",
			"Testes de integração rodam contra um banco real",
			"Frontend na Vercel, API e banco no Render",
		],
	},
	image: {
		src: "/images/work/payments-api-node",
		widths: [480, 720, 1280],
		width: 1280,
		height: 800,
		alt: {
			en: "The live demo, in Portuguese: one key, one stored result, no duplicate processing.",
			"pt-BR":
				"A demo publicada: uma chave, um resultado persistido, sem processamento duplicado.",
		},
	},
	links: [
		{
			label: { en: "Source on GitHub", "pt-BR": "Código no GitHub" },
			href: "https://github.com/gmartins-dev/payments-api-node",
		},
		{
			label: { en: "Live demo", "pt-BR": "Demo publicada" },
			href: "https://payments-api-node-frontend.vercel.app",
		},
	],
	sections: [
		{
			heading: { en: "The problem", "pt-BR": "O problema" },
			body: {
				en: [
					"Payment clients retry when a request times out, and two identical requests can arrive at the same moment. Neither case may charge twice, and every retry must get exactly the same HTTP status and body as the first attempt.",
				],
				"pt-BR": [
					"Clientes de pagamento repetem a requisição quando ela expira, e duas requisições idênticas podem chegar no mesmo instante. Nenhum dos casos pode cobrar duas vezes, e toda retentativa precisa receber exatamente o mesmo status HTTP e corpo da primeira tentativa.",
				],
			},
		},
		{
			heading: { en: "Approach", "pt-BR": "Abordagem" },
			body: {
				en: [
					"The database decides who processes a payment. The idempotency key is unique, and the first request to insert a PENDING row owns the work. Every other request with that key reads the stored row instead.",
					"The API stores the final HTTP status code and response body with the payment, so a retry replays exactly the original answer: 200 for a stored success, 503 for a stored failure, and 202 while the first request is still pending after a short poll (every 100 ms, up to 3 s).",
				],
				"pt-BR": [
					"Quem decide qual requisição processa o pagamento é o banco. A chave de idempotência é única, e a primeira requisição que insere a linha PENDING fica com o trabalho. As demais com a mesma chave leem a linha salva.",
					"A API guarda o status HTTP final e o corpo da resposta junto com o pagamento, então uma retentativa repete exatamente a resposta original: 200 para sucesso salvo, 503 para falha salva e 202 enquanto a primeira requisição ainda está pendente após um polling curto (a cada 100 ms, por até 3 s).",
				],
			},
			code: {
				language: "ts",
				caption: {
					en: "payments.repository.ts: only one request can create the PENDING row.",
					"pt-BR":
						"payments.repository.ts: só uma requisição consegue criar a linha PENDING.",
				},
				source: `const query = \`
  insert into payments (idempotency_key, amount, customer_id, status)
  values ($1, $2, $3, 'PENDING')
  on conflict (idempotency_key) do nothing
  returning *
\`
const result = await db.query<PaymentRecordRow>(query, [
  input.idempotencyKey,
  input.amount,
  input.customerId,
])
// No row back means another request already owns this key.
return result.rows[0] ? mapPaymentRow(result.rows[0]) : null`,
			},
		},
		{
			heading: { en: "Trade-offs", "pt-BR": "Trade-offs" },
			body: {
				en: [
					"No Redis, no distributed lock and no queue. A unique constraint with INSERT … ON CONFLICT DO NOTHING gives the same guarantee with one fewer system to run.",
					"Short polling instead of a notification mechanism, accepted for the scale of the exercise. A stored failure returns 503 so the replay matches the original response exactly.",
				],
				"pt-BR": [
					"Sem Redis, sem lock distribuído e sem fila. Uma constraint única com INSERT … ON CONFLICT DO NOTHING dá a mesma garantia com um sistema a menos para operar.",
					"Polling curto em vez de um mecanismo de notificação, aceito para a escala do exercício. Uma falha salva retorna 503 para que a repetição seja idêntica à resposta original.",
				],
			},
		},
		{
			heading: { en: "Validation", "pt-BR": "Validação" },
			body: {
				en: [
					"Integration tests run against a real PostgreSQL instance and check the persisted state. They prove that only one concurrent request wins and cover retries after success, after failure and while a payment is still pending. Swagger and a Postman collection document the API contract.",
				],
				"pt-BR": [
					"Os testes de integração rodam contra um PostgreSQL real e verificam o estado persistido. Eles provam que só uma requisição concorrente vence e cobrem retentativas após sucesso, após falha e com o pagamento ainda pendente. Swagger e uma collection do Postman documentam o contrato da API.",
				],
			},
		},
		{
			heading: { en: "What I would add next", "pt-BR": "Próximos passos" },
			body: {
				en: [
					"A retention window for idempotency keys, explicit rejection when the same key arrives with a different payload, CI for build and tests, and stronger production observability.",
				],
				"pt-BR": [
					"Janela de retenção para as chaves de idempotência, rejeição explícita quando a mesma chave chega com outro payload, CI para build e testes, e mais observabilidade em produção.",
				],
			},
		},
	],
	disclosure: "public",
	reviewed: "2026-10-11",
};

export const caseStudies: CaseStudy[] = [saf, priorize, payments];

export const otherWork: ShortWork[] = [
	// deborablaso.com.br and psicologiadamoda.club: built by the owner for the
	// same client (the club's pages name Débora Blaso as supervisor). Facts
	// from the live sites and their repositories, checked 2026-10-11.
	{
		title: "Débora Blaso",
		kind: { en: "Client website", "pt-BR": "Site para cliente" },
		summary: {
			en: "Professional website for a clinical psychologist and image consultant in Belo Horizonte, built with React, Vite and Tailwind CSS, with PostHog and Vercel analytics.",
			"pt-BR":
				"Site profissional de uma psicóloga clínica e consultora de imagem em Belo Horizonte, feito com React, Vite e Tailwind CSS, com analytics do PostHog e da Vercel.",
		},
		href: "https://www.deborablaso.com.br/",
		image: {
			src: "/images/work/debora-blaso",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: "The home page of deborablaso.com.br, in Portuguese, with the psychologist's portrait and a call to meet her.",
				"pt-BR":
					"A página inicial de deborablaso.com.br, com o retrato da psicóloga e um convite para conhecê-la.",
			},
		},
	},
	{
		title: "Psicologia da Moda Clube",
		kind: {
			en: "Client product site",
			"pt-BR": "Site de produto para cliente",
		},
		summary: {
			en: "Landing pages for the same client's study group for psychologists, built with Next.js and focused on technical SEO, answer-engine readiness and mobile conversion.",
			"pt-BR":
				"Landing pages do grupo de estudos para psicólogas da mesma cliente, feitas com Next.js e focadas em SEO técnico, mecanismos de resposta e conversão no mobile.",
		},
		href: "https://www.psicologiadamoda.club/",
		image: {
			src: "/images/work/psicologia-da-moda-clube",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: "The study group landing page, in Portuguese, with its title and a call to join the group.",
				"pt-BR":
					"A landing page do grupo de estudos, com o título e um convite para participar do grupo.",
			},
		},
	},
	{
		title: "links",
		kind: { en: "Community project", "pt-BR": "Projeto da comunidade" },
		summary: {
			en: "A community-maintained list of free tools and resources for developers, started in 2022. 406 stars and 15 contributors on GitHub.",
			"pt-BR":
				"Uma lista mantida pela comunidade com ferramentas e recursos gratuitos para devs, criada em 2022. 406 estrelas e 15 contribuidores no GitHub.",
		},
		href: "https://github.com/gmartins-dev/links",
		image: {
			src: "/images/work/links",
			widths: [480, 720, 1280],
			width: 1280,
			height: 800,
			alt: {
				en: "The links project page, a collaborative list in Portuguese with contributor avatars.",
				"pt-BR":
					"A página do projeto links, uma lista colaborativa com os avatares dos contribuidores.",
			},
		},
	},
];
