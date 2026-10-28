# SPEEDFORCE

Um relógio inteligente fictício inspirado na Speed Force, que ajuda as pessoas a acompanhar seu tempo, seus reflexos e sua produtividade.

## Integrantes

- Felipe Alves de Souza
- Lucas Guilherme Frossi Teodoro

**Disciplina e turma:** Técnicas de Programação WEB FrontEnd · 3ADSB

## Sobre o produto

SPEEDFORCE é um protótipo de landing page para um smartwatch de alta performance focado em foco, reflexos e produtividade. A página apresenta a proposta do produto, seus principais recursos (cronômetro de hiperfoco, sensor de reflexos e bateria cinética), uma seção em estilo HQ que conta a "origem" do produto, avaliações fictícias, uma oferta promocional e FAQ.

Como o produto é exclusivo, o fluxo de conversão é uma **lista de espera**: a pessoa deixa o e-mail no modal e recebe, na caixa de entrada, um e-mail de confirmação da fila, enviado pelo **EmailJS** direto do front-end. Não há integração de pagamento nem backend nesta versão.

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
- **Envio de e-mail:** documentação do EmailJS (`emailjs.send`, `publicKey`, `limitRate` e erros comuns como 403 e 429), consultada com o MCP Context7 antes de escrever o código.
- **Landing pages de produtos de tecnologia:** estrutura de seções típica de smartwatches (hero → recursos → como funciona → avaliações → oferta → FAQ).

## Técnica

- React 19
- Vite
- GSAP (animações), com `@gsap/react` e `ScrollTrigger`
- EmailJS (`@emailjs/browser`) para o e-mail de confirmação da lista de espera
- CSS Modules para estilos por componente
- Google Fonts (Bangers, Orbitron e Inter)
- Ferramentas de lint: oxlint

### Organização do código

O projeto separa dados, lógica de estado e interface (padrão **MVVM**):

- **Model** — dados, regras e acesso a serviços externos, sem React e sem estado de UI:
  - `src/data/content.js`: todo o conteúdo da página (menu, painéis da HQ, recursos, passos, avaliações, oferta, FAQ e textos do Hero, do Footer e do modal).
  - `src/model/services/emailService.js`: chama o EmailJS com as chaves do `.env` e limita o reenvio (`limitRate` de 15 segundos).
- **ViewModel** — hooks que guardam o estado e a lógica de tela e chamam o Model:
  - `src/viewmodel/useWaitlistViewModel.js`: estados do envio (`idle`, `loading`, `success` e `error`), validação do e-mail e bloqueio de clique duplo.
  - `src/hooks/useModal` (abertura/fechamento do modal, com focus trap e controle de rolagem), `useWaitlistForm` (validação do e-mail), `useAccordion` (FAQ) e `useMobileMenu` (menu hambúrguer no mobile).
- **View** — `src/components/`: um componente por seção (`Hero`, `ComicStrip`, `Features`, `HowItWorks`, `Testimonials`, `Pricing`, `Faq`, `Footer`), além de `Header`, `Preloader`, `WaitlistModal` e componentes reutilizáveis (`Button`, `Section`, `Icons`, `ComicFx`). A View só recebe dados e callbacks do ViewModel, sem chamar serviços diretamente.
- `src/assets/`: imagens do relógio e dos painéis da HQ.
- Arquivos na raiz: `AGENTS.md` (guia e regras para agentes de IA), `opencode.json` (configuração dos MCPs no OpenCode) e `.env.example` (modelo das variáveis de ambiente).

### Como rodar

1. Instale dependências: `npm ci`
2. Crie o arquivo `.env` a partir do modelo (`.env.example`) e preencha as variáveis do EmailJS (veja a seção **Configuração do EmailJS**).
3. Rodar em desenvolvimento: `npm run dev`
4. Rodar linter: `npm run lint`
5. Build de produção: `npm run build`
6. Servir build localmente: `npm run preview`

Observações:
- Sem o `.env` preenchido, o formulário da lista de espera não consegue enviar o e-mail e mostra a mensagem de erro.
- A ação de "Comprar agora" continua sendo um mock: não existe checkout nem pagamento.

### Configuração do EmailJS

O envio acontece no navegador, dentro do Model (`emailService.js`). As credenciais ficam em variáveis do `.env` (nunca no código):

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

1. No painel do EmailJS, conecte um serviço de e-mail e copie o **Service ID**.
2. Crie um template de e-mail e copie o **Template ID**. O template do projeto usa o assunto "Você está na fila da SPEEDFORCE ⚡" e uma mensagem de confirmação assinada pela "Equipe SPEEDFORCE". O campo "Para enviar por e-mail" do template precisa apontar para a variável que carrega o e-mail da pessoa (confira o nome em `emailService.js`).
3. Copie a **Public Key** da conta.
4. Preencha o `.env` e reinicie o `npm run dev`.

Pontos de atenção:
- A chave pública do EmailJS pode ficar no front. Qualquer outra chave secreta (tokens, chaves de outros serviços) nunca deve ir para o código do front.
- O plano gratuito do EmailJS tem limite de 200 requisições por mês.
- Erro "template ID not found": o `VITE_EMAILJS_TEMPLATE_ID` não existe na conta. Confira o ID em `dashboard.emailjs.com/admin/templates`.

## Uso de IA

- Este README foi preenchido e atualizado com apoio de IA (Claude), a partir da leitura do código, do histórico de commits e do relato da Atividade 02.
- **Código:** o Antigravity foi usado em grande parte do desenvolvimento do código da landing page e na refatoração de acessibilidade e responsividade (com o MCP FileSystem).
- **Imagens:** as imagens em `src/assets/` (relógio e painéis da HQ) foram criadas com o Gemini.
- **Animações:** feitas com GSAP (biblioteca), conforme descrito na seção Técnica.
- **Revisão:** o OpenCode foi usado para revisar o projeto. Ele aplicou pequenas correções e limpezas: ajustou o nome do pacote em `package.json` (de `vite-project` para `speedforce`), melhorou a acessibilidade do modal (restaura o foco ao fechar, mantém o bloqueio de rolagem e esconde o `<main>` de leitores de tela com `aria-hidden` enquanto o modal está aberto), corrigiu um aviso do linter e removeu imagens e logos do template inicial que nenhum componente usava. Depois disso, `npm ci`, `npm run lint` e `npm run build` rodaram com sucesso.
- **MCPs (Atividade 02):** três MCPs foram usados, descritos na próxima seção.
- **Regras para a IA:** o `AGENTS.md` define a stack, a arquitetura MVVM, as convenções de código, o uso dos MCPs e o que está fora de escopo (backend, banco de dados, autenticação, pagamento e mudança da identidade visual sem pedido explícito). Também proíbe `git commit` e `git push` sem pedido e exige apresentar um plano curto antes de mudanças grandes.

## MCPs utilizados (Atividade 02)

| MCP | Quem usou | Função | O que alterou |
| --- | --- | --- | --- |
| **FileSystem** | Felipe | Dá à IA acesso aos arquivos do projeto: ela lê as pastas, abre os arquivos e edita o código direto no workspace (via Antigravity). | Auditoria em `src/components`, `src/hooks` e `src/data`: acessibilidade (ARIA, focus trap nos modais, skip link) e responsividade no mobile, sem quebrar as animações do GSAP nem a estrutura MVVM. |
| **GitHub** | Felipe | Conecta a IA ao repositório por um token de acesso, para consultar commits e arquivos e analisar o que foi feito. | Code review do último commit. Achou um bug no `App.jsx` com o atributo `inert` do React 19, corrigido em um commit de fix. |
| **Context7** | Lucas | Busca a documentação atualizada das bibliotecas e entrega para a IA na hora de escrever o código, para ela não usar versões antigas ou inventadas de uma API. | Envio real do e-mail da fila de espera com EmailJS: `emailService` (Model), `useWaitlistViewModel` (ViewModel) e ajustes no `WaitlistModal` (View). |

### FileSystem MCP: refatoração geral

- **Model (`src/data/`):** textos antes espalhados pela interface foram centralizados em `content.js`, e objetos de estilo inline de posição (balões e onomatopeias) foram trocados por identificadores semânticos.
- **ViewModel (`src/hooks/`):** `useModal` ganhou focus trap (o Tab fica preso dentro do modal enquanto ele está aberto) e controle de rolagem do `body` sem conflitar com o preloader. `useWaitlistForm` ganhou validação separada para campo vazio e formato inválido, e foco após o envio. `useMobileMenu` foi criado para o menu hambúrguer.
- **View (`src/components/` e `.module.css`):** atributos de acessibilidade (tags semânticas e `aria-label`) e correções de overflow, layout e tipografia para celulares, sem quebrar as animações do GSAP.
- **Raiz (`src/App.jsx` e `src/index.css`):** skip link (atalho para pular a navegação) e tratamento da rolagem global.

### GitHub MCP: code review e correção

1. Um token de acesso pessoal foi gerado no GitHub e conectado à IA por um arquivo de configuração do MCP.
2. O token ficou fora do repositório: o arquivo de configuração está no `.gitignore`.
3. A IA analisou o último commit (31 arquivos alterados, +960 e −278 linhas) e encontrou um bug no `App.jsx`: o código `inert={modal.isOpen ? '' : undefined}` não aplicava o atributo, porque no React 19 a string vazia conta como falso.
4. A correção foi `inert={modal.isOpen}`, commitada como "fix: aplica atributo inert corretamente no conteúdo de fundo do modal". O build e o lint continuaram passando.

### Context7 MCP: lista de espera com e-mail real

- **Por que Context7:** a primeira ideia era usar um MCP de e-mail para o agente mandar o e-mail pelo chat, mas isso não resolve, porque o MCP funciona no chat da IA e o site roda no navegador de quem acessa. A saída foi usar o EmailJS direto no código (o projeto não tem backend) e consultar a documentação atual dele com o Context7.
- **Configuração:** o Context7 foi adicionado ao `opencode.json` como MCP remoto, e o `AGENTS.md` manda a IA consultar o context7 antes de usar qualquer biblioteca.
- **Antes e depois:** antes, quem deixava o e-mail no site não recebia nada. Agora o e-mail é validado e a pessoa recebe uma confirmação da fila de espera.
- **O que mudou:** `emailService.js` (novo), `useWaitlistViewModel.js` (novo), `WaitlistModal.jsx` (alterado: usa o ViewModel, trava o campo e o botão durante o envio e mostra a mensagem de erro) e arquivos de configuração (`package.json`, `.gitignore`, `opencode.json`, `AGENTS.md` e `.env.example`).
- **Testes feitos:** e-mail vazio e inválido (mostram o erro e não enviam), duas tentativas seguidas em menos de 15 segundos (a segunda é bloqueada), fechar e abrir o modal de novo e um envio real, que chegou na caixa de entrada com o template da SPEEDFORCE.
- **Limite do Context7:** ele só entrega documentação; não escreve, não roda e não testa o código.

### Segredos e segurança

- O `.env` está no `.gitignore`; o `.env.example` traz as variáveis com valores vazios.
- O `opencode.json` pode ser versionado porque usa referências no formato `{env:NOME_DA_VARIAVEL}`, nunca o valor real do token.
- O arquivo de configuração do GitHub MCP, que contém o token, não vai para o repositório.
- No front só pode ficar a chave pública do EmailJS.

## Evolução da solução

### Fase 1: construção da landing page (14 a 19 de outubro de 2026)

1. **14/10 — Setup inicial:** projeto React com Vite, oxlint e a estrutura básica de arquivos.
2. **14/10 — Preloader e interface:** a página foi dividida em componentes com CSS Modules. Entraram o preloader cinematográfico feito com GSAP (rastro do Flash cruzando a tela, raio caindo e "flash bang"), a animação de entrada do Hero e o modal da lista de espera.
3. **18/10 — Tema de gibi:** novo visual em estilo quadrinhos, com a seção HQ "A Origem" (quatro painéis com legendas, balões e onomatopeias que "pulam" na tela ao rolar), efeitos de HQ (`Sfx`, `Burst` e `Halftone`) e ajustes de estilo em todas as seções.
4. **19/10 — Revisão, acessibilidade e limpeza (OpenCode):** o modal passou a fechar com `Esc`, bloquear a rolagem da página, devolver o foco ao elemento que o abriu e esconder o conteúdo principal de leitores de tela enquanto está aberto. Também foram removidos arquivos não usados (imagens e logos do template inicial) e o README foi atualizado.

### Fase 2: evolução com MCPs (Atividade 02, outubro de 2026)

1. **Refatoração de acessibilidade, responsividade e MVVM (FileSystem MCP):** commit "refactor: melhora acessibilidade, responsividade mobile e estrutura MVVM" (`505fef0`), com 31 arquivos alterados. Entraram focus trap nos modais, skip link, ARIA, menu mobile (hambúrguer), textos centralizados em `content.js` e correções de layout no mobile.
2. **Code review do commit e correção do bug do `inert` (GitHub MCP):** o atributo `inert` do `App.jsx` não era aplicado no React 19 e foi corrigido em um commit de fix.
3. **Lista de espera com e-mail real (Context7 MCP):** `emailService` (Model), `useWaitlistViewModel` (ViewModel) e ajustes no `WaitlistModal` (View), com validação, estados de envio e limite de reenvio.
4. **Regras para agentes e documentação:** criação do `AGENTS.md`, do `opencode.json`, do `.env.example` e do relato da Atividade 02 (PDF), além desta atualização do README.

Melhorias apontadas na revisão da Fase 1 que foram resolvidas na Fase 2: o menu móvel (hambúrguer) para telas pequenas e o focus trap mais robusto no modal. Ainda não aplicada: otimizar as imagens (WebP/AVIF com `srcset`) para reduzir o tempo de carregamento.

Decisões que marcam a evolução:
- O visual deixou de ser "tech escuro" genérico e ganhou a identidade de gibi, ligada ao tema do Flash.
- O conteúdo foi centralizado em um único arquivo de dados, o que facilita trocar textos e preços sem mexer nos componentes.
- A acessibilidade foi tratada junto com a animação: o preloader e a HQ respeitam `prefers-reduced-motion`, e o CSS global reduz transições para quem prefere menos movimento.
- A lista de espera deixou de ser mock e passou a enviar e-mail real. Como o projeto não tem backend, o envio acontece no front com EmailJS, o que obriga a manter só a chave pública no código.
- A IA passou a trabalhar com regras escritas (`AGENTS.md`) e com documentação atual (Context7), em vez de depender só do que já conhece.

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
- **Lista de espera:** modal com validação do e-mail, estados de envio (`idle`, `loading`, `success` e `error`), bloqueio de clique duplo, limite de reenvio de 15 segundos e e-mail de confirmação enviado pelo EmailJS.
- **Acessibilidade e mobile:** skip link, ARIA, focus trap nos modais, menu hambúrguer e layout ajustado para celulares.

## Limitações da versão atual

É um protótipo. Todo o conteúdo do produto é fictício.

- Não existe backend nem banco de dados: a lista da fila **não é guardada em lugar nenhum**. Só o e-mail de confirmação é enviado.
- Não existe pagamento nem checkout; "Comprar agora" é um mock.
- As mensagens de erro do EmailJS aparecem como a biblioteca devolve, em inglês e sem tradução.
- O EmailJS no plano gratuito limita o envio a 200 requisições por mês.
- As imagens ainda não foram otimizadas (WebP/AVIF).
