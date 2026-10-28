# SPEEDFORCE — Guia para agentes

## Sobre o projeto

SPEEDFORCE é uma landing page para a venda de um relógio exclusivo inspirado no Flash. Como o produto é exclusivo, o usuário deixa o email e entra numa **fila de espera**; quando chegar a vez dele, poderá comprar.

- **Stack:** React + Vite (JavaScript/JSX)
- **Estilo:** CSS Modules (`*.module.css`, um por componente)
- **Arquitetura:** MVVM
- **Sem backend e sem banco de dados.** Isso é uma decisão do projeto, não uma pendência. Não proponha criar API, servidor ou banco, a menos que eu peça.
- **Ambiente:** Windows com PowerShell. Não use comandos de Linux como `head`, `tail`, `grep` ou `cat` no terminal; use equivalentes do PowerShell (`Select-Object -First`, `Select-Object -Last`, `Select-String`, `Get-Content`) ou as ferramentas de leitura e busca do agente.

## Estrutura de pastas

```
src/
  assets/       # imagens e arquivos estáticos
  components/   # View: componentes .jsx + .module.css (ex.: WaitlistModal, Button)
  data/         # textos e conteúdo estático (ex.: content.js com modalContent)
  hooks/        # hooks genéricos e legados
  model/
    services/   # acesso a serviços externos (ex.: emailService.js)
  viewmodel/    # hooks useXxxViewModel (estado e lógica de tela)
  App.jsx
  main.jsx
  index.css
```

Regras de organização:

- Código novo de **lógica de tela** vai em `viewmodel/`, e de **serviços e regras** em `model/`. Componentes visuais ficam em `components/`.
- A pasta `hooks/` é para hooks genéricos e legados. O `useWaitlistForm.js` foi substituído por `viewmodel/useWaitlistViewModel.js`; antes de apagá-lo, confirme que nada mais o importa.
- Textos exibidos ao usuário ficam em `data/content.js` sempre que possível, e não direto no JSX.

## Arquitetura MVVM

Respeite a separação de responsabilidades:

- **Model:** dados, regras e acesso a serviços externos (ex.: `emailService`). Sem React, sem JSX, sem estado de UI.
- **ViewModel:** hooks customizados (`useXxxViewModel`) que guardam estado e lógica de tela, e chamam o Model. Não renderizam JSX.
- **View:** componentes `.jsx` apenas de apresentação. Recebem dados e callbacks do ViewModel. Sem chamada direta a serviços, sem regra de negócio.

Regras:

1. A View nunca importa o Model diretamente. Passa sempre pelo ViewModel.
2. O Model nunca importa nada da View ou do ViewModel.
3. Lógica de validação (ex.: formato de email) fica no ViewModel ou no Model, nunca no JSX.
4. Se estiver em dúvida sobre onde algo deve ficar, pergunte ou explique a escolha em uma frase.

## Fila de espera e email

Como funciona hoje:

- `WaitlistModal.jsx` (View) usa `useWaitlistViewModel` (ViewModel), que chama `sendWaitlistEmail` em `model/services/emailService.js` (Model).
- O envio acontece **no front**, via **EmailJS** (`@emailjs/browser`).
- O template do EmailJS recebe a variável `to_email`, e o campo "To Email" do template no painel é `{{to_email}}`. Não renomeie essa variável sem atualizar o template.
- O `limitRate` está com `throttle: 15000` e `id: 'waitlist'`.
- O formulário trata os estados `idle`, `loading`, `success` e `error`, valida o formato do email e bloqueia duplo clique durante o envio.
- Limite do plano gratuito do EmailJS: 200 envios por mês. Não crie testes automáticos que enviem emails de verdade.

Variáveis de ambiente (arquivo `.env` na raiz, nunca versionado):

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

- O `.env.example` tem as mesmas chaves vazias e é versionado.
- A chave pública do EmailJS pode ficar no front. **Qualquer outra chave secreta (Private Key, tokens, etc.) nunca deve ir para o código do front.**
- O Vite só lê o `.env` ao iniciar; depois de mudar variáveis, é preciso reiniciar o `npm run dev`.

Pendências conhecidas (só faça se eu pedir):

- Traduzir para pt-BR amigável as mensagens de erro do EmailJS (limite de envios 429, falha de rede), hoje o texto técnico pode aparecer ao usuário.
- Mover o texto "Enviando..." do componente para `data/content.js`.

## Comandos

```bash
npm install      # instalar dependências
npm run dev      # servidor de desenvolvimento (Vite)
npm run build    # build de produção
npm run preview  # servir o build localmente
npm run lint     # só se existir no package.json
```

Antes de dizer que uma tarefa terminou, rode `npm run build` e confirme que não há erros.

## Convenções de código

- Componentes em `PascalCase`, hooks começando com `use`, serviços em `camelCase`.
- Um componente por arquivo, com seu `.module.css` ao lado. Importe como `styles` e use `styles.nomeDaClasse`.
- Prefira componentes funcionais e hooks. Sem class components.
- Não adicione dependências novas sem avisar e explicar o motivo.
- Se algo não está claro, pergunte em vez de adivinhar.
- Textos exibidos ao usuário ficam em **português (pt-BR)**.
- Mantenha acessibilidade básica: `label` nos inputs, `alt` nas imagens, contraste legível e foco visível.
- A página deve funcionar bem em **mobile e desktop**.

## Uso dos MCPs

- **context7:** use sempre que precisar consultar a documentação atual de uma biblioteca (React, Vite, EmailJS etc.) antes de escrever código com ela. Não confie só na memória para APIs que mudam.
- **github** (se estiver habilitado): use para consultar issues, PRs e commits. Nunca crie, apague ou faça push sem eu pedir.
- Se um MCP falhar ou não estiver disponível, diga isso claramente em vez de inventar a resposta.

## Segredos e segurança

- Nunca escreva tokens, chaves ou senhas em arquivos versionados.
- O `.env` está no `.gitignore` e nunca deve ser commitado. Para documentar variáveis novas, atualize o `.env.example` com valores vazios.
- `opencode.json` pode ser versionado, desde que use `{env:NOME_DA_VARIAVEL}` e nunca o valor real.
- O arquivo `mcp_config.json` também está no `.gitignore` e deve continuar fora do repositório.
- Se encontrar um segredo exposto no código, avise imediatamente.

## Como trabalhar comigo

- **Antes de mudanças grandes** (refatorar várias pastas, trocar biblioteca, mudar a estrutura), apresente um plano curto e espere minha confirmação.
- Faça mudanças **pequenas e focadas**. Não reformate nem renomeie arquivos que não têm relação com a tarefa.
- Ao terminar, resuma em poucas linhas o que mudou e quais arquivos foram tocados.
- Se algo for ambíguo, faça **uma** pergunta objetiva em vez de assumir.
- Não faça `git commit` nem `git push` por conta própria.
- Responda em português.

## Fora de escopo

- Criar backend, banco de dados ou autenticação.
- Implementar pagamento ou checkout real (a compra só acontece quando chegar a vez do usuário, e esse fluxo ainda não existe).
- Guardar a lista da fila de espera em algum lugar: hoje o email só é enviado, não é armazenado. Isso só entra em escopo se eu decidir.
- Alterar a identidade visual (cores, fontes, logo) sem pedido explícito.