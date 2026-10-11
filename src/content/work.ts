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

export const caseStudies: CaseStudy[] = [saf, payments];

export const otherWork: ShortWork[] = [
	{
		title: "links",
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
