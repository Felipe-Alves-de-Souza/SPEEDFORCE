# SPEEDFORCE

Um relógio inteligente fictício inspirado na Speed Force, que ajuda as pessoas a acompanhar seu tempo, seus reflexos e sua produtividade.

## Integrantes

- Felipe Alves de Souza
- Lucas Guilherme Frossi Teodoro

## Sobre o produto

SPEEDFORCE é um protótipo de landing page para um smartwatch de alta performance focado em foco, reflexos e produtividade. A página apresenta a proposta do produto, seus principais recursos (cronômetro de hiperfoco, sensor de reflexos e bateria cinética), uma seção em estilo HQ que conta a "origem" do produto, avaliações fictícias, uma oferta promocional e FAQ.

O fluxo de conversão disponível na demo é uma "lista de espera" implementada no front-end (mock); não há integração de pagamento ou backend nesta versão.

## Jornada de construção

### Ideia inicial

- O produto é um smartwatch inspirado no Flash.
- A partir dessa ideia, o conceito virou um relógio "de velocista": o slogan da página é *"Don't just chase time. Own it."* e a promessa gira em torno de três poderes — **foco** (Cronômetro de Hiperfoco), **reflexos** (Sensor de Reflexos) e **energia** (Bateria de Energia Cinética, que carrega com o movimento de quem usa).
- A identidade visual segue as cores do herói: vermelho (`#e50914`) e dourado (`#ffc107`) sobre fundo escuro.

### Pesquisa e referências

- **Universo do Flash e da Speed Force:** serviu de base para o nome do produto, para a paleta vermelho/dourado e para os textos da página (ex.: "Ativar minha Speed Force", "Edição Limitada Flash").
- **Linguagem de HQ/gibi:** a seção "A Origem" é montada como uma página de quadrinhos, com painéis, legendas, balões de fala e onomatopeias (`ZOOM!`, `BZZZT!`, `KRA-KOOOM!`). O tema também usa retícula (*halftone*), selos em explosão ("NOVO!") e a fonte **Bangers** nos títulos.
- **Tipografia:** Bangers (títulos em estilo gibi), Orbitron (visual tecnológico) e Inter (texto corrido), carregadas pelo Google Fonts.
- **Animações:** documentação do GSAP, com `@gsap/react` (`useGSAP`) e `ScrollTrigger` para o preloader, a entrada do Hero e a aparição dos painéis da HQ ao rolar a página.
- **Landing pages de produtos de tecnologia:** estrutura de seções típica de smartwatches (hero → recursos → como funciona → avaliações → oferta → FAQ).

## Técnica

- React 19
- Vite
- GSAP (animações), com `@gsap/react` e `ScrollTrigger`
- CSS Modules para estilos por componente
- Google Fonts (Bangers, Orbitron e Inter)
- Ferramentas de lint: oxlint

### Organização do código

O projeto separa dados, lógica de estado e interface (padrão MVVM, como indicado nos comentários do código):

- `src/data/content.js` — **Model:** todo o conteúdo mockado da página (menu, painéis da HQ, recursos, passos, avaliações, oferta e FAQ).
- `src/hooks/` — **ViewModel:** `useModal` (abertura/fechamento do modal), `useWaitlistForm` (validação do e-mail) e `useAccordion` (FAQ).
- `src/components/` — **View:** um componente por seção (`Hero`, `ComicStrip`, `Features`, `HowItWorks`, `Testimonials`, `Pricing`, `Faq`, `Footer`), além de `Header`, `Preloader`, `WaitlistModal` e componentes reutilizáveis (`Button`, `Section`, `Icons`, `ComicFx`).
- `src/assets/` — imagens do relógio e dos painéis da HQ.

### Como rodar

1. Instale dependências: `npm ci`
2. Rodar em desenvolvimento: `npm run dev`
3. Rodar linter: `npm run lint`
4. Build de produção: `npm run build`
5. Servir build localmente: `npm run preview`

Observações:
- A ação de "Comprar agora" e os envios do formulário são mocks: o formulário apenas valida o e-mail no cliente e exibe uma tela de sucesso.

## Uso de IA

- Este README foi preenchido com apoio de IA (Claude), a partir da leitura do código e do histórico de commits do repositório.
- **Código:** o Antigravity foi usado em grande parte do desenvolvimento do código da landing page.
- **Imagens:** as imagens em `src/assets/` (relógio e painéis da HQ) foram criadas com o Gemini.
- **Animações:** feitas com GSAP (biblioteca), conforme descrito na seção Técnica.
- **Revisão:** o OpenCode foi usado para revisar o projeto. Ele aplicou pequenas correções e limpezas: ajustou o nome do pacote em `package.json` (de `vite-project` para `speedforce`), melhorou a acessibilidade do modal (restaura o foco ao fechar, mantém o bloqueio de rolagem e esconde o `<main>` de leitores de tela com `aria-hidden` enquanto o modal está aberto), corrigiu um aviso do linter e removeu imagens e logos do template inicial que nenhum componente usava. Depois disso, `npm ci`, `npm run lint` e `npm run build` rodaram com sucesso.

## Evolução da solução

O projeto foi construído em cinco commits, entre 14 e 19 de outubro de 2026:

1. **14/10 — Setup inicial:** projeto React com Vite, oxlint e a estrutura básica de arquivos.
2. **14/10 — Preloader e interface:** a página foi dividida em componentes com CSS Modules. Entraram o preloader cinematográfico feito com GSAP (rastro do Flash cruzando a tela, raio caindo e "flash bang"), a animação de entrada do Hero e o modal da lista de espera.
3. **18/10 — Tema de gibi:** novo visual em estilo quadrinhos, com a seção HQ "A Origem" (quatro painéis com legendas, balões e onomatopeias que "pulam" na tela ao rolar), efeitos de HQ (`Sfx`, `Burst` e `Halftone`) e ajustes de estilo em todas as seções.
4. **19/10 — Revisão, acessibilidade e limpeza (OpenCode):** o modal passou a fechar com `Esc`, bloquear a rolagem da página, devolver o foco ao elemento que o abriu e esconder o conteúdo principal de leitores de tela enquanto está aberto. Também foram removidos arquivos não usados (imagens e logos do template inicial) e o README foi atualizado.

Melhorias apontadas na revisão e ainda não aplicadas: otimizar as imagens (WebP/AVIF com `srcset`) para reduzir o tempo de carregamento, criar um menu móvel (hambúrguer) para telas de 375px, adicionar um *focus trap* mais robusto ao modal e mover o bloqueio de rolagem do preloader para um hook ou para o próprio `Preloader`.

Decisões que marcam a evolução:
- O visual deixou de ser "tech escuro" genérico e ganhou a identidade de gibi, ligada ao tema do Flash.
- O conteúdo foi centralizado em um único arquivo de dados, o que facilita trocar textos e preços sem mexer nos componentes.
- A acessibilidade foi tratada junto com a animação: o preloader e a HQ respeitam `prefers-reduced-motion`, e o CSS global reduz transições para quem prefere menos movimento.

## Resultado final

Landing page responsiva em português (pt-BR), com as seguintes partes:

- **Preloader** animado ("CALIBRANDO SPEED FORCE...") e entrada em sequência do Hero.
- **Hero** com o slogan, o relógio vermelho em destaque e o botão "Ativar minha Speed Force".
- **A Origem:** HQ de quatro painéis que conta como a energia de um raio entrou no relógio.
- **Poderes:** os três recursos principais (Cronômetro de Hiperfoco, Sensor de Reflexos e Bateria de Energia Cinética).
- **Como funciona:** três passos (vista e sincronize, ative o Modo Foco, evolua em milissegundos).
- **Avaliações:** depoimentos fictícios.
- **Oferta:** SPEEDFORCE Flash Edition por R$ 1.799 (de R$ 2.499), ou 12x de R$ 149,92, em edição limitada de 1.000 unidades numeradas.
- **FAQ:** perguntas sobre bateria, Sensor de Reflexos e sensores do relógio, em formato de acordeão.
- **Lista de espera:** modal com validação de e-mail e tela de sucesso, totalmente no front-end.

Limitações da versão atual: é um protótipo. Todo o conteúdo é fictício, não existe backend nem pagamento, e o envio do formulário não grava nem envia nenhum dado.
