// MODEL — dados mockados da landing page (sem lógica de UI).

export const navLinks = [
  { label: 'Diferenciais', href: '#features' },
  { label: 'Como Funciona', href: '#how' },
  { label: 'Avaliações', href: '#reviews' },
  { label: 'Oferta', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const features = [
  {
    id: 'focus',
    icon: 'timer',
    title: 'Cronômetro de Hiperfoco',
    description: 'Bloqueio total de distrações. Notificações silenciadas, tela em modo tunnel e foco absoluto até a linha de chegada.',
  },
  {
    id: 'reflex',
    icon: 'bolt',
    title: 'Sensor de Reflexos',
    description: 'Mede em milissegundos o seu tempo de reação e acompanha sua evolução a cada treino.',
  },
  {
    id: 'kinetic',
    icon: 'battery',
    title: 'Bateria de Energia Cinética',
    description: 'Carrega com o seu próprio movimento. Quanto mais você corre, mais energia você tem.',
  },
]

export const steps = [
  {
    number: 1,
    title: 'Vista e sincronize',
    description: 'Coloque o SPEEDFORCE no pulso. Em 10 segundos ele calibra seus batimentos e seu ritmo base.',
  },
  {
    number: 2,
    title: 'Ative o Modo Foco',
    description: 'Toque duas vezes na coroa dourada. Distrações bloqueadas, cronômetro de hiperfoco em ação.',
  },
  {
    number: 3,
    title: 'Evolua em milissegundos',
    description: 'Veja seus reflexos e sua produtividade melhorarem dia após dia no painel de performance.',
  },
]

export const testimonials = [
  {
    id: 1,
    text: 'No modo foco, me sinto mais rápido do que nunca. A bateria dura semanas.',
    author: 'B.A.',
    stars: 5,
  },
  {
    id: 2,
    text: 'O sensor de reflexos virou vício. Baixei meu tempo de reação em 40ms em um mês.',
    author: 'I.W.',
    stars: 5,
  },
]

export const pricing = {
  badge: 'Edição Limitada Flash',
  name: 'SPEEDFORCE Flash Edition',
  oldPrice: 'R$ 2.499',
  price: 'R$ 1.799',
  installments: 'ou 12x de R$ 149,92',
  perks: [
    'Caixa em liga vermelha com detalhes em ouro',
    'Pulseira de fibra de carbono premium',
    'Numeração exclusiva — apenas 1.000 unidades',
    'Garantia de 2 anos + 30 dias para testar',
  ],
}

export const faqs = [
  {
    id: 'battery',
    question: 'Quanto tempo dura a bateria?',
    answer: 'Com uso normal, até 21 dias. A energia cinética recarrega o relógio enquanto você se movimenta, e o carregador magnético completa 100% em 45 minutos.',
  },
  {
    id: 'reflex',
    question: 'Como funciona o Sensor de Reflexos?',
    answer: 'Um estímulo visual e háptico é disparado aleatoriamente. O sensor mede, com precisão de 1 milissegundo, o intervalo até o seu toque e registra seu histórico.',
  },
  {
    id: 'sensors',
    question: 'Quais sensores o SPEEDFORCE possui?',
    answer: 'Frequência cardíaca óptica, acelerômetro de 9 eixos, giroscópio, GPS de dupla banda, oxímetro e o sensor de reflexos exclusivo da linha Flash.',
  },
]

