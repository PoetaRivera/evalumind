// Reading the Mind in the Eyes Test — versión textual adaptada
// Descripciones de miradas con opciones de estado mental
const RMET_STIMULI = [
  { id: 1, description: 'Ojos que miran fijamente con las cejas ligeramente levantadas, los párpados abiertos y la boca formando una línea tensa.', options: ['Juguetón', 'Irritado', 'Aterrorizado', 'Arrogante'], correct: 1 },
  { id: 2, description: 'Mirada de reojo con los ojos entrecerrados y una ligera inclinación de cabeza.', options: ['Afectuoso', 'Avergonzado', 'Desconfiado', 'Triste'], correct: 2 },
  { id: 3, description: 'Ojos muy abiertos con las cejas arqueadas hacia arriba y la mandíbula ligeramente caída.', options: ['Sorprendido', 'Aterrado', 'Emocionado', 'Confundido'], correct: 0 },
  { id: 4, description: 'Mirada hacia abajo con los párpados caídos, las cejas juntas hacia adentro y hacia arriba.', options: ['Arrepentido', 'Triste', 'Agotado', 'Desilusionado'], correct: 1 },
  { id: 5, description: 'Cejas apretadas hacia abajo, mirada intensa y fija, mandíbula tensa.', options: ['Concentrado', 'Enojado', 'Desafiante', 'Asustado'], correct: 1 },
  { id: 6, description: 'Ojos brillantes con pequeñas arrugas en las esquinas, mejillas elevadas.', options: ['Nervioso', 'Alegre', 'Aliviado', 'Agradecido'], correct: 1 },
  { id: 7, description: 'Mirada perdida hacia el horizonte con los ojos ligeramente desenfocados.', options: ['Reflexivo', 'Aburrido', 'Deprimido', 'Soñador'], correct: 0 },
  { id: 8, description: 'Ojos muy abiertos, cejas elevadas, pupilas dilatadas, sin pestañear.', options: ['Aterrorizado', 'Fascinado', 'Alerta', 'Paranoico'], correct: 0 },
  { id: 9, description: 'Una ceja ligeramente arqueada, mirada lateral, ligera media sonrisa.', options: ['Dudoso', 'Divertido', 'Sarcástico', 'Seductor'], correct: 2 },
  { id: 10, description: 'Ojos caídos mirando hacia un lado, cejas relajadas, sin expresión en la boca.', options: ['Cansado', 'Aburrido', 'Indiferente', 'Tranquilo'], correct: 1 },
  { id: 11, description: 'Mirada fija con los ojos muy abiertos, sin pestañear, postura rígida.', options: ['Horrorizado', 'Fascinado', 'Hipnotizado', 'Conmocionado'], correct: 0 },
  { id: 12, description: 'Ojos entrecerrados con una ceja arqueada y los labios apretados hacia un lado.', options: ['Escéptico', 'Decepcionado', 'Crítico', 'Fastidiado'], correct: 0 },
  { id: 13, description: 'Mirada suave con los párpados relajados, una ligera sonrisa en los ojos.', options: ['Agradecido', 'Afectuoso', 'Amigable', 'Esperanzado'], correct: 1 },
  { id: 14, description: 'Mirada intensa hacia arriba con las cejas juntas y los labios fruncidos.', options: ['Preocupado', 'Suplicante', 'Desesperado', 'Devastado'], correct: 1 },
  { id: 15, description: 'Ojos brillantes con lágrimas contenidas, labios temblorosos, cejas hacia arriba.', options: ['Emocionado', 'Triste', 'Conmovido', 'Agradecido'], correct: 2 },
  { id: 16, description: 'Mirada fija y penetrante, mandíbula firme, cejas neutras.', options: ['Desafiante', 'Determinado', 'Agresivo', 'Seguro'], correct: 1 },
  { id: 17, description: 'Cejas arqueadas, ojos muy abiertos, ligera apertura de boca.', options: ['Curioso', 'Sorprendido', 'Incrédulo', 'Esperanzado'], correct: 2 },
  { id: 18, description: 'Ojos que se apartan rápidamente, sonrisa nerviosa apenas perceptible.', options: ['Tímido', 'Avergonzado', 'Culpable', 'Inseguro'], correct: 1 },
  { id: 19, description: 'Mirada de superioridad con los ojos ligeramente entrecerrados y barbilla elevada.', options: ['Orgulloso', 'Arrogante', 'Desdeñoso', 'Satisfecho'], correct: 2 },
  { id: 20, description: 'Ojos relajados, párpados pesados, pequeña sonrisa en los ojos.', options: ['Satisfecho', 'Tranquilo', 'Relajado', 'Agradecido'], correct: 0 },
  { id: 21, description: 'Mirada hacia el vacío con los ojos inmóviles y los músculos faciales quietos.', options: ['Aturdido', 'Pensativo', 'Ausente', 'Deprimido'], correct: 0 },
  { id: 22, description: 'Cejas hacia abajo y juntas, mirada intensa, labios apretados en línea fina.', options: ['Frustrado', 'Concentrado', 'Enojado', 'Decidido'], correct: 0 },
  { id: 23, description: 'Mirada rápida de arriba a abajo, cejas ligeramente arqueadas.', options: ['Juzgando', 'Curioso', 'Interesado', 'Evaluando'], correct: 3 },
  { id: 24, description: 'Ojos muy abiertos, pupilas dilatadas, cejas elevadas, respiración contenida.', options: ['Anticipando', 'Esperanzado', 'Emocionado', 'Ansioso'], correct: 0 },
];

export default RMET_STIMULI;
