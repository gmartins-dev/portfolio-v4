# Guilherme Martins · Brand guidelines v1.0

## 1. Conceito

- **Lâmpada:** herdada da marca anterior; é a ideia, a definição do problema. Contorno com três raios.
- **Filamento em g (ou gm):** as iniciais acesas em azul dentro da ideia. É a assinatura da marca.
- **Ponto no fim do filamento:** um nó de circuito, onde a ideia se conecta à execução.
- **Pingos quadrados:** no wordmark, os pingos dos dois "i" são blocos quadrados no azul da marca, como um cursor. Sempre estáticos.
- **Princípio:** uma forma simples, um único detalhe em azul. Sem gradientes, sombras ou efeitos.

## 2. Versões

| Versão | Uso | Arquivos |
| --- | --- | --- |
| Horizontal (principal) | Header do site, documentos, assinaturas | `logo-primary`, `logo-primary-dark` |
| Horizontal gm | Alternativa com as iniciais completas | `logo-primary-gm`, `logo-primary-gm-dark` |
| Horizontal com descritor | Apresentações, capas | `logo-primary-tagline(-dark)` |
| Empilhado | Espaços quadrados | `logo-stacked(-dark)`, `logo-stacked-gm(-dark)` |
| Wordmark | Quando o símbolo já aparece perto | `logo-wordmark(-dark)`, `logo-wordmark-tagline(-dark)` |
| Símbolo | Avatares, ícones, marca d'água | `logo-symbol(-dark)`, `logo-symbol-gm(-dark)` |
| Símbolo simplificado | 16 a 39 px | `logo-symbol-small(-dark)` |
| Monograma gm | Assinatura curta, contextos de código | `logo-monogram-gm(-dark)` |
| Monocromático | Gravação, carimbo, uma cor | `*-mono-black`, `*-mono-white` |

Sem sufixo = fundos claros. `-dark` = fundos escuros.

## 3. Área de proteção e tamanho mínimo

- **X = altura do "G" maiúsculo do wordmark.** Deixe pelo menos X livre em volta do logo horizontal e do empilhado.
- Símbolo isolado: área livre de 1/4 da altura do símbolo.

| Versão | Mínimo em tela | Mínimo impresso |
| --- | --- | --- |
| Horizontal | 140 px de largura | 35 mm |
| Empilhado | 96 px de largura | 24 mm |
| Wordmark | 96 px de largura | 25 mm |
| Símbolo detalhado | 40 px de altura | 10 mm |
| Símbolo simplificado | 16 px | 5 mm |

## 4. Cores

| Token | HEX | RGB | Uso |
| --- | --- | --- | --- |
| navy-950 | #08121C | 8 18 28 | Fundo principal (dark), theme color, fundo dos ícones |
| navy-900 | #0D1A28 | 13 26 40 | Superfícies e cards no dark |
| navy-800 | #1E2E40 | 30 46 64 | Bordas e divisores no dark |
| ink | #0B1726 | 11 23 38 | Logo e texto em fundos claros |
| mist | #E8EEF5 | 232 238 245 | Logo e texto em fundos escuros |
| paper | #F3F5F8 | 243 245 248 | Fundo claro |
| slate-400 | #8A9BB0 | 138 155 176 | Texto secundário no dark |
| slate-600 | #4A5B70 | 74 91 112 | Texto secundário no claro |
| blue-400 | #5B9BFF | 91 155 255 | Azul da marca no dark |
| blue-600 | #1F5FD1 | 31 95 209 | Azul da marca no claro |

O azul aparece só no filamento, nos pingos e em links. CMYK aproximado está em `tokens/tokens.json`.

## 5. Tipografia

| Família | Pesos | Uso |
| --- | --- | --- |
| Inter Display | 600, 700 | Wordmark, títulos, social cards (tracking −2%) |
| Inter | 400, 500, 600 | Texto corrido, interface, descritores |
| JetBrains Mono | 400, 600 | Código, terminal, labels técnicos |

Todas sob SIL Open Font License. O wordmark já está em contornos.

## 6. Uso incorreto

- Não distorça, estique ou rotacione.
- Não troque as cores nem use o azul como fundo grande.
- Não aplique sombra, brilho, contorno ou gradiente.
- Não use sobre fundos com pouco contraste.
- Não recrie o wordmark com outra fonte nem troque os pingos quadrados por redondos.
- Não use o símbolo detalhado abaixo de 40 px: use o simplificado.
- Não anime os pingos do wordmark.

## 7. Aplicações

- **Favicon:** `icons/favicon.svg` + `favicon.ico` (16, 32, 48) com o símbolo simplificado.
- **Apple touch icon:** 180 × 180, fundo navy-950 sem transparência.
- **Open Graph:** 1200 × 630, versões EN e pt-BR.
- **LinkedIn:** capa 1584 × 396 com o conteúdo à direita (a foto de perfil cobre o canto inferior esquerdo); avatar 1024 com anel azul.
- **Apps:** iOS 1024 e Google Play 512 (variante gm em `app/alt-gm/`).
