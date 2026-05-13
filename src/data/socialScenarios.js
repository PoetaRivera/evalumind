const SOCIAL_SCENARIOS = [
  {
    id: 1,
    scenario: 'Un colega no te devuelve el saludo al pasar por el pasillo.',
    rejection: 'Te está evitando a propósito.',
    benign: 'Iba distraído/a o no te vio.',
  },
  {
    id: 2,
    scenario: 'Le envías un mensaje a un amigo y no recibes respuesta en 24 horas.',
    rejection: 'No le interesas lo suficiente como para contestar.',
    benign: 'Está ocupado/a, vio el mensaje y se olvidó de responder.',
  },
  {
    id: 3,
    scenario: 'En una reunión grupal, alguien interrumpe tu intervención y cambia de tema.',
    rejection: 'Lo que estabas diciendo no era importante para nadie.',
    benign: 'La persona estaba emocionada con su idea y no se dio cuenta.',
  },
  {
    id: 4,
    scenario: 'Dos compañeros se ríen cerca de ti mientras hablan en voz baja.',
    rejection: 'Se están riendo de ti.',
    benign: 'Están compartiendo un chiste interno entre ellos.',
  },
  {
    id: 5,
    scenario: 'Publicas algo en redes sociales y recibes menos interacciones de lo esperado.',
    rejection: 'A nadie le importa lo que compartes.',
    benign: 'El algoritmo no lo mostró a mucha gente, o no era el mejor momento.',
  },
  {
    id: 6,
    scenario: 'Una persona con la que estabas hablando mira su teléfono a mitad de la conversación.',
    rejection: 'Le aburres y prefiere hacer otra cosa.',
    benign: 'Recibió una notificación urgente y no pudo ignorarla.',
  },
  {
    id: 7,
    scenario: 'Te enteras de que varios amigos quedaron sin invitarte.',
    rejection: 'No te quieren en el grupo y te excluyeron intencionalmente.',
    benign: 'Fue una quedada improvisada y asumieron que no podrías venir.',
  },
  {
    id: 8,
    scenario: 'Tu jefe te da feedback mayoritariamente positivo pero menciona una pequeña área de mejora.',
    rejection: 'Está decepcionado/a con tu trabajo y esto es solo el comienzo.',
    benign: 'Es una práctica estándar de feedback constructivo, lo general fue positivo.',
  },
  {
    id: 9,
    scenario: 'Alguien cancela un plan contigo a último momento diciendo que "le surgió algo".',
    rejection: 'No quería verte y puso una excusa.',
    benign: 'Realmente le surgió un imprevisto que no pudo evitar.',
  },
  {
    id: 10,
    scenario: 'En una conversación grupal haces un comentario y nadie responde — la conversación sigue como si no hubieras dicho nada.',
    rejection: 'Tu opinión no vale nada para este grupo.',
    benign: 'La conversación iba muy rápido y tu comentario simplemente se perdió en el flujo.',
  },
  {
    id: 11,
    scenario: 'Tu pareja o alguien cercano está inusualmente callado/a durante una cena.',
    rejection: 'Está enfadado/a contigo por algo que hiciste.',
    benign: 'Tuvo un día agotador y necesita silencio para recuperarse.',
  },
  {
    id: 12,
    scenario: 'Te postulas a un puesto o proyecto y no quedas seleccionado/a.',
    rejection: 'No eres suficientemente bueno/a y lo saben.',
    benign: 'Había mucha competencia o buscaban un perfil distinto al tuyo.',
  },
  {
    id: 13,
    scenario: 'Alguien te hace un cumplido sobre tu trabajo pero añade un "pero..." al final.',
    rejection: 'El cumplido fue falso, solo querían suavizar la crítica.',
    benign: 'Valoran tu trabajo pero tienen una sugerencia genuina de mejora.',
  },
  {
    id: 14,
    scenario: 'Un vecino con el que solías saludar ha dejado de mirarte cuando te cruzas.',
    rejection: 'Hiciste algo que le molestó y ahora te evita.',
    benign: 'Está pasando por algo personal y está más retraído/a en general.',
  },
  {
    id: 15,
    scenario: 'Estás contando algo que te importa y la otra persona cambia de tema bruscamente.',
    rejection: 'Lo que te importa no le interesa en absoluto.',
    benign: 'No se dio cuenta de que era importante para ti o tenía algo urgente que decir.',
  },
  {
    id: 16,
    scenario: 'Recibes un mensaje que solo dice "tenemos que hablar".',
    rejection: 'Va a decirte algo malo, probablemente está enfadado/a.',
    benign: 'Quiere tratar un tema práctico que es mejor hablar en persona que por mensaje.',
  },
];

export default SOCIAL_SCENARIOS;
