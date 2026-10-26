# Guilherme Martins · Brand kit v1.0

Identidade visual pessoal para o portfolio (gmartins.dev), LinkedIn, GitHub e futuros produtos.
Outubro de 2026.

**Base do sistema:** símbolo da lâmpada (contorno com três raios) com o filamento em forma de **g** em azul.
**Variante:** o filamento com as iniciais **gm**.
**Wordmark:** "Guilherme Martins" em Inter Display Bold, com os pingos dos dois "i" substituídos por blocos quadrados azuis (estáticos).

O guia completo está em `guidelines/brand-guidelines.pdf` (ou `.md`).

Esta pasta é a **fonte** da marca. O site serve cópias em `public/` e os cards sociais são gerados a partir daqui, então altere primeiro o arquivo mestre.

## Estrutura

```
brand/
├── README.md
├── guidelines/     brand-guidelines.md · .pdf
├── logos/
│   ├── svg/        arquivos-mestre vetoriais (use estes na web)
│   ├── png/        exportações transparentes para uploads fora do repositório
│   └── print/      PDFs vetoriais para fornecedores e impressão
├── icons/          favicon, apple touch icon, PWA e site.webmanifest
├── app/            ícone iOS 1024, Google Play 512 (alt-gm/ com a variante gm)
├── social/         Open Graph EN e pt-BR, capa LinkedIn, avatar (+ source/ em HTML/SVG)
├── tokens/         colors.css, tokens.json (cores, fontes)
├── fonts/          Inter Display e Inter (SIL OFL) + licença
└── source/         brand-master.svg (todas as versões num único arquivo editável)
```

## Qual arquivo usar

| Situação | Arquivo |
| --- | --- |
| Header do site (dark, versão atual) | `logos/svg/logo-primary-dark.svg` |
| Header em fundo claro | `logos/svg/logo-primary.svg` |
| Com descritor "Software Engineer" | `logos/svg/logo-primary-tagline(-dark).svg` |
| Variante com gm | `logos/svg/logo-primary-gm(-dark).svg`, `logo-symbol-gm(-dark).svg` |
| Espaço quadrado, capa de apresentação | `logos/svg/logo-stacked(-dark).svg` |
| Só o nome | `logos/svg/logo-wordmark(-dark).svg` |
| Símbolo isolado (40 px ou mais) | `logos/svg/logo-symbol(-dark).svg` |
| Símbolo pequeno (16 a 39 px) | `logos/svg/logo-symbol-small(-dark).svg` |
| Uma cor só | `logo-mono-black.svg`, `logo-mono-white.svg` (e versões de símbolo, wordmark e monograma) |
| Fornecedores e impressão | `logos/print/*.pdf` |

Convenção dos nomes: sem sufixo = para fundos claros; `-dark` = para fundos escuros.

## Sincronização com o site

O site serve estas cópias a partir de `public/` (nada copia sozinho):

| Mestre em `brand/` | Servido em |
| --- | --- |
| `icons/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `pwa-*.png`, `site.webmanifest` | raiz de `public/` |
| `logos/svg/logo-primary.svg`, `logo-primary-dark.svg` | `public/brand/` |

Ao alterar um mestre, copie-o para o caminho correspondente em `public/` no mesmo PR. Depois rode `pnpm build:og-images`, que lê `logos/svg/logo-primary-dark.svg` e `fonts/` para gerar os cards em `public/images/og/`. Esses PNGs são gerados: não os edite à mão.

## Notas

- **Fonte do wordmark:** o wordmark já está em contornos. Não é preciso instalar a fonte para usar o logo. O texto do site usa Geist; a marca usa Inter Display nos títulos e nos cards sociais.
- **Arquivo editável:** não há `.fig` nem `.ai`. Os SVGs são os mestres e `source/brand-master.svg` reúne todas as versões; importe no Figma ou no Illustrator para editar.
- **CMYK** em `tokens/tokens.json` é conversão aproximada; confirme com prova de cor antes de imprimir.
- **Social cards:** os PNGs em `social/` foram gerados a partir de `social/source/`. Para mudar o texto, edite o HTML e exporte de novo em 1200 × 630 (ou 1584 × 396 para o LinkedIn).
