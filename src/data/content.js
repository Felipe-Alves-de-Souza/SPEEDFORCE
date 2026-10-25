// MODEL — dados mockados da landing page (sem lógica de UI).
import heroImg from '../assets/comic-hero.jpg'
import strikeImg from '../assets/comic-strike.jpg'
import boltArmImg from '../assets/comic-bolt-arm.png'
import flashImg from '../assets/comic-flash.png'

export const navLinks = [
  { label: 'A Origem', href: '#origin' },
  { label: 'Poderes', href: '#features' },
  { label: 'Como Funciona', href: '#how' },
  { label: 'Avaliações', href: '#reviews' },
  { label: 'Oferta', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const heroContent = {
  eyebrow: 'Smartwatch de alta performance',
  titleMain: 'Não fique apenas correndo contra o tempo.',
  titleHighlight: 'Assuma o controle.',
  subtitle:
    'Desperte a Speed Force que há em você com o relógio definitivo para reflexos, foco e hiperprodutividade.',
  ctaLabel: 'Ativar minha Speed Force',
  watchAlt: 'Smartwatch SPEEDFORCE vermelho com raios na tela',
  sfxText: 'ZOOM!',
  burstText: 'NOVO!',
}

export const sectionHeaders = {
  origin: {
    kicker: 'Edição #1',
    titlePrefix: 'A origem da',
    titleHighlight: 'Speed Force',
  },
  features: {
    kicker: 'Superpoderes',
    titlePrefix: 'Poderes no seu',
    titleHighlight: 'pulso',
  },
  how: {
    kicker: 'Como funciona',
    titlePrefix: 'Três passos para a',
    titleHighlight: 'velocidade',
  },
  reviews: {
    kicker: 'Fala, heróis!',
    titlePrefix: 'Quem usa,',
    titleHighlight: 'não volta atrás',
  },
  pricing: {
    kicker: 'Oferta relâmpago',
    titlePrefix: 'Garanta a sua',
    titleHighlight: 'unidade',
  },
  faq: {
    kicker: 'FAQ',
    titlePrefix: 'Perguntas',
    titleHighlight: 'frequentes',
  },
}

// HQ "A Origem": cada painel tem área no grid, legenda, balão e onomatopeia (sem estilos inline).
export const comicPanels = [
  {
    id: 'p1',
    area: 'a',
    img: heroImg,
    alt: 'Herói de uniforme vermelho cercado de energia dourada',
    caption: 'Capítulo 1: Um dia comum...',
    bubble: 'O tempo nunca é suficiente!',
    bubblePlace: 'bottomLeft',
  },
  {
    id: 'p2',
    area: 'b',
    img: strikeImg,
    alt: 'Raio vermelho e dourado atingindo o chão',
    caption: 'Até que um raio caiu do céu!',
    sfx: 'KRA-KOOOM!',
    sfxColor: 'gold',
    sfxPlace: 'topRight',
  },
  {
    id: 'p3',
    area: 'c',
    img: boltArmImg,
    alt: 'Garoto com raios saindo do braço',
    caption: 'A energia entrou no relógio...',
    sfx: 'BZZZT!',
    sfxColor: 'white',
    sfxPlace: 'bottomLeft',
  },
  {
    id: 'p4',
    area: 'd',
    img: flashImg,
    alt: 'Velocista correndo em meio a raios',
    bubble: 'Agora eu sou o mais rápido!',
    bubblePlace: 'topLeft',
    sfx: 'ZOOM!',
    sfxColor: 'red',
    sfxPlace: 'bottomRight',
  },
]

export const features = [
  {
    id: 'focus',
    icon: 'timer',
    sfx: 'FOCO!',
    title: 'Cronômetro de Hiperfoco',
    description:
      'Bloqueio total de distrações. Notificações silenciadas, tela em modo tunnel e foco absoluto até a linha de chegada.',
  },
  {
    id: 'reflex',
    icon: 'bolt',
    sfx: 'ZAP!',
    title: 'Sensor de Reflexos',
    description:
      'Mede em milissegundos o seu tempo de reação e acompanha sua evolução a cada treino.',
  },
  {
    id: 'kinetic',
    icon: 'battery',
    sfx: 'VRUUM!',
    title: 'Bateria de Energia Cinética',
    description:
      'Carrega com o seu próprio movimento. Quanto mais você corre, mais energia você tem.',
  },
]

export const steps = [
  {
    number: 1,
    title: 'Vista e sincronize',
    description:
      'Coloque o SPEEDFORCE no pulso. Em 10 segundos ele calibra seus batimentos e seu ritmo base.',
  },
  {
    number: 2,
    title: 'Ative o Modo Foco',
    description:
      'Toque duas vezes na coroa dourada. Distrações bloqueadas, cronômetro de hiperfoco em ação.',
  },
  {
    number: 3,
    title: 'Evolua em milissegundos',
    description:
      'Veja seus reflexos e sua produtividade melhorarem dia após dia no painel de performance.',
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
  discountBurst: '-28% OFF!',
  oldPrice: 'R$ 2.499',
  price: 'R$ 1.799',
  installments: 'ou 12x de R$ 149,92',
  ctaLabel: 'Comprar agora!',
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
    answer:
      'Com uso normal, até 21 dias. A energia cinética recarrega o relógio enquanto você se movimenta, e o carregador magnético completa 100% em 45 minutos.',
  },
  {
    id: 'reflex',
    question: 'Como funciona o Sensor de Reflexos?',
    answer:
      'Um estímulo visual e háptico é disparado aleatoriamente. O sensor mede, com precisão de 1 milissegundo, o intervalo até o seu toque e registra seu histórico.',
  },
  {
    id: 'sensors',
    question: 'Quais sensores o SPEEDFORCE possui?',
    answer:
      'Frequência cardíaca óptica, acelerômetro de 9 eixos, giroscópio, GPS de dupla banda, oxímetro e o sensor de reflexos exclusivo da linha Flash.',
  },
]

export const modalContent = {
  title: 'Entre na lista de espera',
  subtitle: 'Seja o primeiro a ativar a Speed Force na Edição Limitada Flash.',
  emailLabel: 'Seu melhor e-mail',
  emailPlaceholder: 'voce@email.com',
  submitLabel: 'Entrar na lista',
  successTitle: 'Você está na fila! ⚡',
  successPrefix: 'Avisaremos',
  successSuffix: 'assim que a Speed Force for liberada.',
  closeLabel: 'Fechar',
}

export const footerContent = {
  continua: 'Continua na próxima edição...',
  logo: 'SPEEDFORCE',
  disclaimer: 'SPEEDFORCE. Produto fictício — projeto de demonstração.',
}
