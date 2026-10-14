/* "Fai il lavoro di NEX" — mini-gioco delle pagine /gioco/, /manutenzione/ e 404.
   Uso: NexGame.mount(elemento, 'it'|'en'|'es', { shareUrl, invertPage }) -> { setLang(l) }

   - Serra in stile minimale: sole e luna scorrono sull'orizzonte e fanno da orologio, le nuvole
     annunciano gli imprevisti, di notte i colori si invertono.
   - LED supplementari: accesi solo nel fotoperiodo (06–22) quando manca il sole (nuvole o dopo il tramonto).
   - Gioco infinito a cicli di 28 giorni (primo taglio del basilico); punti solo con tutti i parametri in fascia, maggiorati da
     precisione e serie; bonus a ogni raccolto. Le prime giornate durano di più.
   - Simulazione a passo fisso con semi casuali: "Guarda NEX" rigioca la stessa identica serra.
   - È una simulazione semplificata: i numeri sono del gioco, non rese o prestazioni reali. */
(function () {
  var STR = {
    it: {
      headNex: 'NEX al comando', day: 'Giorno ', cycle: 'Ciclo', hi: 'HI', health: 'Salute', bestShort: 'Record',
      st: ['Seme', 'Germinazione', 'Cotiledoni', 'Prime foglie vere', 'Pianta adulta', 'Pronta per il raccolto'],
      crop: 'Basilico',
      start_t: 'Fai il lavoro di NEX',
      start_p: 'EC, pH e VPD si spostano da soli. Tienili nella fascia verde con ▲ ▼: più sei preciso e costante, più punti fai. Guarda il cielo: nuvole e sole annunciano cosa succederà. Ogni 28 giorni si raccoglie e si riparte.',
      keys: 'Da tastiera: Q/A, W/S, E/D.', start_b: 'Inizia',
      over_t: 'La pianta non ce l’ha fatta.', over_p: '{p} punti · giorno {d} · ciclo {c}.',
      newbest: 'Nuovo record!',
      nexline: 'NEX corregge questi parametri da solo, ogni pochi secondi, 24 ore su 24.',
      watch: 'Guarda come lo fa NEX', again: 'Rigioca', share: 'Sfida un collega', copied: 'Testo copiato',
      skip: 'Vai al risultato',
      cmp_t: 'Stessa serra, stessi imprevisti, stessi giorni.', you: 'Tu', nex: 'NEX',
      r_day: 'Giorni', r_band: 'Tempo con tutto in fascia', r_manual: 'Correzioni a mano', r_pts: 'Punti',
      auto: 'automatico',
      note: 'Simulazione semplificata a scopo dimostrativo: non rappresenta rese o prestazioni reali.',
      cta: 'Vuoi vedere NEX in una serra vera?',
      harvest: '🌿 Raccolto! +{b} punti · si riparte con il ciclo {c}',
      pause_t: 'In pausa', resume: 'Riprendi',
      shareRec: 'Nuovo record personale nella serra di NEX: {p} punti, arrivato al giorno {d}. 🌱',
      shareRun: 'Ho fatto {p} punti nella serra di NEX (giorno {d}). Il mio record è {r}. 🌱',
      jabs: ['Scommetto che non tieni EC, pH e VPD in fascia neanche per una settimana. 😏', 'Tu quanto resisti prima che il basilico appassisca?', 'Pensi di fare il lavoro di NEX meglio di me? Dimostralo.'],
      ev: ['☀ Picco di sole: VPD in salita', '💧 Rabbocco con acqua: EC in calo', '⚗ Acqua di rete alcalina: pH in salita',
           '☁ Arrivano le nuvole: VPD in calo', '🌡 Caldo, la pianta beve: EC in salita', '🌙 Umidità notturna: VPD in calo'],
      evT: ['Picco di sole', 'Rabbocco con acqua', 'Acqua di rete alcalina', 'Arrivano le nuvole', 'Caldo, la pianta beve', 'Umidità notturna'],
      up: 'sale', down: 'scende', press: 'premi', now: 'ora',
      w_clear: '☀ Sereno', w_cloud: '☁ Nuvoloso · LED supplementari accesi', w_dusk: '🌇 Dopo il tramonto · LED supplementari accesi', w_night: '🌙 Notte',
      vpd: 'VPD', ec: 'EC'
    },
    en: {
      headNex: 'NEX in control', day: 'Day ', cycle: 'Cycle', hi: 'HI', health: 'Health', bestShort: 'Best',
      st: ['Seed', 'Germination', 'Cotyledons', 'First true leaves', 'Mature plant', 'Ready to harvest'],
      crop: 'Basil',
      start_t: 'Do NEX’s job',
      start_p: 'EC, pH and VPD drift on their own. Keep them in the green band with ▲ ▼: the more precise and steady you are, the more points you score. Watch the sky: clouds and sun tell you what is coming. Every 28 days you harvest and start again.',
      keys: 'Keyboard: Q/A, W/S, E/D.', start_b: 'Start',
      over_t: 'The plant didn’t make it.', over_p: '{p} points · day {d} · cycle {c}.',
      newbest: 'New best!',
      nexline: 'NEX corrects these parameters on its own, every few seconds, around the clock.',
      watch: 'Watch NEX do it', again: 'Play again', share: 'Challenge a colleague', copied: 'Text copied',
      skip: 'Skip to result',
      cmp_t: 'Same greenhouse, same surprises, same days.', you: 'You', nex: 'NEX',
      r_day: 'Days', r_band: 'Time with everything in range', r_manual: 'Manual corrections', r_pts: 'Points',
      auto: 'automatic',
      note: 'Simplified simulation for demonstration only: it does not represent real yields or performance.',
      cta: 'Want to see NEX in a real greenhouse?',
      harvest: '🌿 Harvest! +{b} points · starting cycle {c}',
      pause_t: 'Paused', resume: 'Resume',
      shareRec: 'New personal best in the NEX greenhouse: {p} points, made it to day {d}. 🌱',
      shareRun: 'I scored {p} points in the NEX greenhouse (day {d}). My best is {r}. 🌱',
      jabs: ['Bet you can’t keep EC, pH and VPD in range for even a week. 😏', 'How long can you last before the basil wilts?', 'Think you can do NEX’s job better than me? Prove it.'],
      ev: ['☀ Sun peak: VPD rising', '💧 Topping up with water: EC falling', '⚗ Alkaline tap water: pH rising',
           '☁ Clouds coming: VPD falling', '🌡 Hot day, the plant drinks: EC rising', '🌙 Humid night: VPD falling'],
      evT: ['Sun peak', 'Topping up with water', 'Alkaline tap water', 'Clouds coming', 'Hot day, the plant drinks', 'Humid night'],
      up: 'rising', down: 'falling', press: 'press', now: 'now',
      w_clear: '☀ Clear sky', w_cloud: '☁ Cloudy · supplemental LEDs on', w_dusk: '🌇 After sunset · supplemental LEDs on', w_night: '🌙 Night',
      vpd: 'VPD', ec: 'EC'
    },
    es: {
      headNex: 'NEX al mando', day: 'Día ', cycle: 'Ciclo', hi: 'REC', health: 'Salud', bestShort: 'Récord',
      st: ['Semilla', 'Germinación', 'Cotiledones', 'Primeras hojas verdaderas', 'Planta adulta', 'Lista para cosechar'],
      crop: 'Albahaca',
      start_t: 'Haz el trabajo de NEX',
      start_p: 'La CE, el pH y el DPV se desvían solos. Mantenlos en la franja verde con ▲ ▼: cuanto más preciso y constante seas, más puntos harás. Mira el cielo: las nubes y el sol anuncian lo que va a pasar. Cada 28 días se cosecha y se vuelve a empezar.',
      keys: 'Con teclado: Q/A, W/S, E/D.', start_b: 'Empezar',
      over_t: 'La planta no lo ha conseguido.', over_p: '{p} puntos · día {d} · ciclo {c}.',
      newbest: '¡Nuevo récord!',
      nexline: 'NEX corrige estos parámetros por sí solo, cada pocos segundos, las 24 horas.',
      watch: 'Mira cómo lo hace NEX', again: 'Volver a jugar', share: 'Reta a un colega', copied: 'Texto copiado',
      skip: 'Ir al resultado',
      cmp_t: 'Mismo invernadero, mismos imprevistos, mismos días.', you: 'Tú', nex: 'NEX',
      r_day: 'Días', r_band: 'Tiempo con todo en rango', r_manual: 'Correcciones manuales', r_pts: 'Puntos',
      auto: 'automático',
      note: 'Simulación simplificada con fines demostrativos: no representa rendimientos ni prestaciones reales.',
      cta: '¿Quieres ver NEX en un invernadero real?',
      harvest: '🌿 ¡Cosecha! +{b} puntos · empieza el ciclo {c}',
      pause_t: 'En pausa', resume: 'Continuar',
      shareRec: 'Nuevo récord personal en el invernadero de NEX: {p} puntos, llegué al día {d}. 🌱',
      shareRun: 'He hecho {p} puntos en el invernadero de NEX (día {d}). Mi récord es {r}. 🌱',
      jabs: ['Apuesto a que no mantienes la CE, el pH y el DPV en rango ni una semana. 😏', '¿Cuánto aguantas antes de que se marchite la albahaca?', '¿Crees que haces el trabajo de NEX mejor que yo? Demuéstralo.'],
      ev: ['☀ Pico de sol: DPV en aumento', '💧 Relleno con agua: CE en descenso', '⚗ Agua de red alcalina: pH en aumento',
           '☁ Llegan las nubes: DPV en descenso', '🌡 Calor, la planta bebe: CE en aumento', '🌙 Humedad nocturna: DPV en descenso'],
      evT: ['Pico de sol', 'Relleno con agua', 'Agua de red alcalina', 'Llegan las nubes', 'Calor, la planta bebe', 'Humedad nocturna'],
      up: 'sube', down: 'baja', press: 'pulsa', now: 'ya',
      w_clear: '☀ Despejado', w_cloud: '☁ Nublado · LED suplementarios encendidos', w_dusk: '🌇 Tras la puesta de sol · LED suplementarios encendidos', w_night: '🌙 Noche',
      vpd: 'DPV', ec: 'CE'
    }
  };

  // ---------- simulazione (nessun accesso al DOM) ----------
  var C = {
    HARVEST: 28, DT: 1 / 30, MOVE: 5,
    // durata di una giornata in secondi: lenta all'inizio (DAY_SEC0), a regime dopo SLOW_T secondi (DAY_SEC1)
    DAY_SEC0: 13, DAY_SEC1: 10, SLOW_T: 60,
    DRIFT: .023, CAP: .008, LOSS: 20, REGEN: 6,
    // difficoltà in funzione del tempo di gioco (secondi): riscaldamento, salita, poi crescita lenta
    D0: 1.15, D1: 1.8, RAMP_T: 130, D2: .3, D2_T: 90, DMAX: 2.8,
    EV_MAG: .058, EV_WARN: 2, EV_GAP: 7, EV_FIRST: 10,
    WARMUP_T: 50, DW: .5, EV_WARN_START: 3.5,
    SUNRISE: 6, SUNSET: 20, PHOTO_END: 22, NIGHT: .006, CLOUD_COVER: 9,
    HELP_EV: 5, PTS: 10, STREAK_STEP: 4, MULT_MAX: 3, HARVEST_BONUS: 200
  };
  var GAUGES = [
    { k: 'ec',  unit: 'mS/cm', min: .4, max: 3.2, lo: 1.5, hi: 2.1,  step: .12, dec: 2, key: ['q', 'a'] },
    { k: 'ph',  unit: '',      min: 4.4, max: 7.6, lo: 5.6, hi: 6.3, step: .12, dec: 1, key: ['w', 's'] },
    { k: 'vpd', unit: 'kPa',   min: .2, max: 2.2, lo: .8, hi: 1.25,  step: .08, dec: 2, key: ['e', 'd'] }
  ];
  // [indicatore, direzione]; l'indice corrisponde ai testi STR.ev
  var EVENTS = [[2, 1], [0, -1], [1, 1], [2, -1], [0, 1], [2, -1]];
  var EV_SUN = 0, EV_CLOUD = 3, EV_HEAT = 4;
  // ore in cui ogni imprevisto è plausibile [da, a): sole e caldo nelle ore centrali, nuvole di giorno, umidità di notte
  var EV_HOURS = [[10, 17], [0, 24], [0, 24], [7, 18], [11, 18], [21, 29]];
  function evOk(k, h) { var r = EV_HOURS[k]; return (h >= r[0] && h < r[1]) || (h + 24 >= r[0] && h + 24 < r[1]); }

  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function Sim(seed) {
    this.r = rng(seed); this.er = rng(seed ^ 0x5bd1e995);
    this.t = 0; this.day = 9 / 24; // si parte alle 9:00 del primo giorno
    this.health = 100; this.points = 0; this.mult = 1; this.streak = 0;
    this.inBand = 0; this.n = 0; this.presses = 0; this.cycle = 1; this.cyH = 0; this.cyN = 0;
    this.next = C.EV_FIRST; this.pend = null; this.shown = null; this.showUntil = 0; this.lastHarvest = null;
    this.cloudUntil = -1; this.active = null; this.activeUntil = 0; this.evN = 0;
    this.g = GAUGES.map(function (d) { return { v: (d.lo + d.hi) / 2, vel: 0, push: 0, cd: 0 }; });
  }
  Sim.prototype.daySec = function () { return C.DAY_SEC0 - (C.DAY_SEC0 - C.DAY_SEC1) * Math.min(1, this.t / C.SLOW_T); };
  Sim.prototype.hour = function (day) { return ((day === undefined ? this.day : day) % 1) * 24; };
  Sim.prototype.sunUp = function (h) { h = h === undefined ? this.hour() : h; return h >= C.SUNRISE && h < C.SUNSET; };
  Sim.prototype.photo = function () { var h = this.hour(); return h >= C.SUNRISE && h < C.PHOTO_END; };
  Sim.prototype.cloudy = function () { return this.t < this.cloudUntil; };
  Sim.prototype.ledOn = function () { return this.photo() && (this.cloudy() || !this.sunUp()); };
  Sim.prototype.diff = function () {
    var t = this.t;
    if (t < C.WARMUP_T) return C.DW + (C.D0 - C.DW) * t / C.WARMUP_T;
    t -= C.WARMUP_T;
    var d = C.D0 + (C.D1 - C.D0) * Math.min(1, t / C.RAMP_T) + C.D2 * Math.max(0, (t - C.RAMP_T) / C.D2_T);
    return Math.min(C.DMAX, d);
  };
  Sim.prototype.warn = function () { return this.t < C.WARMUP_T ? C.EV_WARN_START : C.EV_WARN; };
  Sim.prototype.cycleDay = function () { return this.day - (this.cycle - 1) * C.HARVEST; };
  Sim.prototype.nudge = function (i, dir) {
    var d = GAUGES[i], g = this.g[i];
    g.v = Math.max(d.min, Math.min(d.max, g.v + dir * d.step)); g.vel *= .4; this.presses++;
  };
  Sim.prototype.nex = function () {
    var DT = C.DT;
    this.g.forEach(function (g, i) {
      var d = GAUGES[i]; g.cd -= DT; if (g.cd > 0) return;
      var w = d.hi - d.lo, p = g.v + (g.vel + g.push) * DT * C.MOVE * 6;
      if (p < d.lo + w * .15 || p > d.hi - w * .15) {
        g.v = Math.max(d.min, Math.min(d.max, g.v + (p < d.lo + w * .15 ? 1 : -1) * d.step * .6));
        g.vel *= .3; g.push *= .3; g.cd = .3;
      }
    });
  };
  // un passo da DT secondi; restituisce i punti bonus se in questo passo c'è stato un raccolto
  Sim.prototype.step = function (auto) {
    var s = this, DT = C.DT, diff = s.diff(), harvested = 0;
    if (!s.pend && s.t >= s.next - s.warn()) {
      // l'imprevisto dipende dall'ora in cui accadrà: niente sole o nuvole di notte
      var hAt = s.hour(s.day + (s.next - s.t) / s.daySec()), list = [];
      for (var e = 0; e < EVENTS.length; e++) if (evOk(e, hAt)) list.push(e);
      if (evOk(EV_CLOUD, hAt)) list.push(EV_CLOUD, EV_CLOUD); // di giorno le nuvole sono l'imprevisto più comune
      var k = list[Math.floor(s.er() * list.length)];
      s.pend = { k: k, at: s.next, from: s.t, mag: C.EV_MAG * (.7 + .6 * s.er()) * diff };
      s.shown = k; s.showUntil = s.next + .8; s.evN++;
    }
    if (s.pend && s.t >= s.pend.at) {
      var ev = EVENTS[s.pend.k], d0 = GAUGES[ev[0]];
      s.g[ev[0]].push = ev[1] * (d0.max - d0.min) * s.pend.mag;
      if (s.pend.k === EV_CLOUD) s.cloudUntil = s.t + C.CLOUD_COVER;
      s.active = s.pend.k; s.activeUntil = s.t + 2.5;
      s.pend = null; s.next = s.t + C.EV_GAP * (.75 + .5 * s.er()) / Math.sqrt(diff);
    }
    if (s.shown !== null && s.t > s.showUntil) s.shown = null;
    if (s.active !== null && s.t > s.activeUntil) s.active = null;
    var night = !s.sunUp();
    s.g.forEach(function (g, i) {
      var d = GAUGES[i], span = d.max - d.min, cap = span * C.CAP * diff;
      g.vel += (s.r() - .5) * span * C.DRIFT * diff * DT * 60;
      if (night && i === 2) g.vel -= span * C.NIGHT * DT;
      g.vel *= .985;
      g.vel = Math.max(-cap, Math.min(cap, g.vel));
      g.v += (g.vel + g.push) * DT * C.MOVE; g.push *= .93;
      if (g.v <= d.min || g.v >= d.max) { g.v = Math.max(d.min, Math.min(d.max, g.v)); g.vel *= -.3; g.push = 0; }
    });
    if (auto) s.nex();
    var out = 0, prec = 0;
    s.g.forEach(function (g, i) {
      var d = GAUGES[i], c = (d.lo + d.hi) / 2, half = (d.hi - d.lo) / 2;
      if (g.v < d.lo || g.v > d.hi) out++;
      prec += Math.max(0, 1 - Math.abs(g.v - c) / half);
    });
    prec /= 3;
    if (out) {
      s.health = Math.max(0, s.health - out * C.LOSS * DT); s.streak = 0; s.mult = 1;
    } else {
      s.health = Math.min(100, s.health + C.REGEN * DT); s.streak += DT; s.inBand++;
      s.mult = Math.min(C.MULT_MAX, 1 + Math.floor(s.streak / C.STREAK_STEP) * .5);
      s.points += C.PTS * (.3 + .7 * prec) * s.mult * DT;
    }
    s.n++; s.cyH += s.health; s.cyN++; s.t += DT; s.day += DT / s.daySec();
    if (s.health > 0 && s.day >= s.cycle * C.HARVEST) {
      harvested = Math.round(C.HARVEST_BONUS * (s.cyH / s.cyN) / 100);
      s.points += harvested; s.cycle++; s.cyH = 0; s.cyN = 0; s.lastHarvest = { bonus: harvested, until: s.t + 3 };
    }
    return harvested;
  };
  Sim.prototype.result = function () {
    return { day: Math.floor(this.day) + 1, cycle: this.cycle, points: Math.round(this.points),
             band: this.n ? Math.round(this.inBand / this.n * 100) : 0, presses: this.presses };
  };

  // ---------- interfaccia minimale ----------
  var NS = 'http://www.w3.org/2000/svg', H = 196, GX = 150;
  var CLOUD_PATH = 'M-28 10h54a13 13 0 0 0 0-26a17 17 0 0 0-32-6a13 13 0 0 0-22 32z';
  // arco del cielo: curva quadratica da (24,H) a (576,H) passando sopra
  function arcPt(f) { var u = 1 - f; return [u * u * 24 + 2 * u * f * 300 + f * f * 576, u * u * H + 2 * u * f * -60 + f * f * H]; }

  function scene() {
    var stars = '', k;
    var st = [[70, 64, 1.6], [150, 40, 1.2], [250, 86, 1.4], [330, 48, 1.2], [395, 100, 1], [540, 46, 1.6], [575, 118, 1.1], [205, 128, 1], [480, 140, 1.1]];
    for (k = 0; k < st.length; k++) stars += '<circle cx="' + st[k][0] + '" cy="' + st[k][1] + '" r="' + st[k][2] + '"/>';
    var leds = '';
    for (k = 0; k < 6; k++) leds += '<rect class="ng-led ' + (k % 2 ? 'b' : 'a') + '" x="' + (GX - 38 + k * 13) + '" y="' + (H - 73) + '" width="5" height="5"/>';
    return '<svg class="ng-scene" viewBox="0 0 600 ' + (H + 24) + '" aria-hidden="true">' +
      '<path class="ng-arc" d="M24 ' + H + ' Q300 -60 576 ' + H + '"/>' +
      '<g class="ng-stars">' + stars + '</g>' +
      '<g class="ng-moon"><path d="M-3 -13a13 13 0 1 0 14 17a10.5 10.5 0 1 1 -14 -17z"/></g>' +
      '<g class="ng-sun"><circle r="11"/><path d="M0 -18v-5M0 18v5M-18 0h-5M18 0h5M-13 -13l-3.5 -3.5M13 13l3.5 3.5M-13 13l-3.5 3.5M13 -13l3.5 -3.5"/></g>' +
      '<g class="ng-cloud ng-cloud-deco"><path d="' + CLOUD_PATH + '"/></g>' +
      '<g class="ng-cloud ng-cloud-ev"><path d="' + CLOUD_PATH + '"/></g>' +
      '<g class="ng-heat"><path d="M330 150q6-6 12 0t12 0t12 0M390 162q6-6 12 0t12 0t12 0M450 146q6-6 12 0t12 0t12 0"/></g>' +
            '<path class="ng-house" d="M' + (GX - 80) + ' ' + H + 'V' + (H - 62) + 'L' + GX + ' ' + (H - 108) + 'L' + (GX + 80) + ' ' + (H - 62) + 'V' + H + '"/>' +
      '<polygon class="ng-cone" points="' + (GX - 38) + ',' + (H - 68) + ' ' + (GX + 38) + ',' + (H - 68) + ' ' + (GX + 58) + ',' + H + ' ' + (GX - 58) + ',' + H + '"/>' +
      '<rect class="ng-ledbar" x="' + (GX - 42) + '" y="' + (H - 78) + '" width="84" height="5"/>' + leds +
      '<g transform="translate(' + (GX - 60) + ',' + (H - 98) + ')"><g class="ng-pl"><g class="ng-sway">' +
      '<path class="ng-stem" d="M60 88V64"/>' +
      '<g class="ng-s"><ellipse cx="52" cy="76" rx="8" ry="4.5" transform="rotate(-20 52 76)"/><ellipse cx="68" cy="76" rx="8" ry="4.5" transform="rotate(20 68 76)"/></g>' +
      '<g class="ng-s"><path class="ng-stem" d="M60 64V54"/><path d="M60 72c-12-4-22 1-26 10 11 3 21-1 26-10z"/><path d="M60 72c12-4 22 1 26 10-11 3-21-1-26-10z"/></g>' +
      '<g class="ng-s"><path class="ng-stem" d="M60 54V44"/><path d="M60 56c-10-5-19-2-23 6 9 4 18 1 23-6z"/><path d="M60 56c10-5 19-2 23 6-9 4-18 1-23-6z"/></g>' +
      '<g class="ng-s"><path class="ng-stem" d="M60 44V34"/><path d="M60 42c-8-5-15-3-18 4 7 3 14 1 18-4z"/><path d="M60 42c8-5 15-3 18 4-7 3-14 1-18-4z"/><path d="M60 36c-3-7-1-12 0-14 1 2 3 7 0 14z"/></g>' +
      '<g class="ng-s"><path d="M60 30c-6-4-12-2-14 3 6 3 11 1 14-3z"/><path d="M60 30c6-4 12-2 14 3-6 3-11 1-14-3z"/></g>' +
      '</g></g><circle class="ng-seed" cx="60" cy="86" r="3"/><path class="ng-pot" d="M48 88h24l-3 10H51z"/></g>' +
      '<line class="ng-horizon" x1="0" y1="' + H + '" x2="600" y2="' + H + '"/>' +
      '<g class="ng-ground"><rect x="40" y="' + (H + 10) + '" width="6" height="2"/><rect x="240" y="' + (H + 14) + '" width="10" height="2"/><rect x="300" y="' + (H + 8) + '" width="4" height="2"/><rect x="520" y="' + (H + 12) + '" width="8" height="2"/></g>' +
      '</svg>';
  }
  function pt(r, a) { var rad = a * Math.PI / 180; return [r * Math.sin(rad), -r * Math.cos(rad)]; }
  function arcD(r, a0, a1) { var p0 = pt(r, a0), p1 = pt(r, a1); return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) + 'A' + r + ' ' + r + ' 0 ' + (a1 - a0 > 180 ? 1 : 0) + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1); }
  function ang(d, v) { return -120 + 240 * (v - d.min) / (d.max - d.min); }
  function dial(d) {
    var ticks = '';
    for (var k = 0; k <= 10; k++) { var a = -120 + k * 24, o = pt(34, a), n = pt(30, a); ticks += '<line x1="' + o[0].toFixed(1) + '" y1="' + o[1].toFixed(1) + '" x2="' + n[0].toFixed(1) + '" y2="' + n[1].toFixed(1) + '"/>'; }
    return '<svg class="ng-dial" viewBox="-42 -42 84 84" aria-hidden="true">' +
      '<circle class="ng-face" r="38"/><path class="ng-track" d="' + arcD(34, -120, 120) + '"/>' +
      '<path class="ng-band" d="' + arcD(32, ang(d, d.lo), ang(d, d.hi)) + '"/>' +
      '<g class="ng-ticks">' + ticks + '</g>' +
      '<g class="ng-needle"><line x1="0" y1="0" x2="0" y2="-27"/></g><circle class="ng-hub" r="3.5"/>' +
      '<text class="ng-dname" y="14" text-anchor="middle"></text><text class="ng-dval" y="25" text-anchor="middle"></text></svg>';
  }

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pad(n, w) { n = String(Math.max(0, Math.round(n))); while (n.length < w) n = '0' + n; return n; }

  function mount(root, lang, opts) {
    opts = opts || {};
    var shareUrl = opts.shareUrl || 'https://neuragrowtech.com/gioco/';
    root.classList.add('ng');
    root.innerHTML =
      '<div class="ng-top"><span class="ng-clock"></span><span class="ng-label"></span><span class="ng-score"><span class="ng-hi"></span> <b class="ng-pts">00000</b> <span class="ng-mult"></span></span></div>' +
      scene() +
      '<div class="ng-bottom"><div class="ng-info">' +
      '<span class="ng-hlabel"></span><span class="ng-health"><i></i></span>' +
      '<span class="ng-status"></span><span class="ng-stage"></span></div>' +
      '<div class="ng-gauges"></div></div>' +
      '<div class="ng-ov"><h2 class="ng-ov-t"></h2><p class="ng-ov-p"></p><p class="ng-ov-nex"></p><div class="ng-cmp"></div><p class="ng-note"></p><p class="ng-cta"></p>' +
      '<div class="ng-ov-btns"></div><span class="ng-ov-best"></span></div>';
    var q = function (s) { return root.querySelector(s); };
    var el = {
      sun: q('.ng-sun'), moon: q('.ng-moon'), stars: q('.ng-stars'), deco: q('.ng-cloud-deco'), cev: q('.ng-cloud-ev'),
      heat: q('.ng-heat'), cone: q('.ng-cone'), pl: q('.ng-pl'), seed: q('.ng-seed'), leaves: root.querySelectorAll('.ng-s'),
      stem: q('.ng-stem'), hp: q('.ng-health i')
    };

    var ui = GAUGES.map(function (d, i) {
      var g = document.createElement('div');
      g.className = 'ng-gauge';
      g.innerHTML = dial(d) +
        '<div class="ng-ctl"><button type="button" aria-label="+">▲</button><button type="button" aria-label="−">▼</button></div>' +
        '<span class="ng-keys">' + d.key[0].toUpperCase() + ' / ' + d.key[1].toUpperCase() + '</span>';
      q('.ng-gauges').appendChild(g);
      var b = g.querySelectorAll('.ng-ctl button');
      hold(b[0], function () { nudge(i, 1); }); hold(b[1], function () { nudge(i, -1); });
      return { el: g, btn: b, needle: g.querySelector('.ng-needle'), name: g.querySelector('.ng-dname'), val: g.querySelector('.ng-dval') };
    });

    function hold(btn, fn) {
      var t = null; function stop() { clearInterval(t); t = null; }
      btn.addEventListener('pointerdown', function (e) { e.preventDefault(); fn(); stop(); t = setInterval(fn, 160); });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { btn.addEventListener(ev, stop); });
      btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); } });
    }
    document.addEventListener('keydown', function (e) {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      var k = e.key.toLowerCase();
      GAUGES.forEach(function (d, i) { if (k === d.key[0]) nudge(i, 1); if (k === d.key[1]) nudge(i, -1); });
    });

    var S = new Sim(1), mode = 'idle', seed = 1, you = null, nexRes = null, raf = 0, acc = 0, last = 0;
    var best = +(read('ngt-nex-best-pts') || 0), newBest = false;

    function nudge(i, dir) {
      if (mode !== 'play') return;
      S.nudge(i, dir);
      var g = ui[i].el; g.classList.remove('kick'); void g.offsetWidth; g.classList.add('kick');
      draw();
    }
    function loop(ts) {
      if (mode !== 'play' && mode !== 'nex') return;
      var speed = mode === 'nex' ? 4 : 1;
      acc += Math.min(.1, (ts - (last || ts)) / 1000) * speed; last = ts;
      while (acc >= C.DT) {
        acc -= C.DT; S.step(mode === 'nex');
        if (S.health <= 0) { draw(); return finish(); }
        if (mode === 'nex' && S.day >= you.day) { draw(); return finish(); }
      }
      draw(); raf = requestAnimationFrame(loop);
    }
    function finish() {
      cancelAnimationFrame(raf);
      var sk = q('.ng-skip'); if (sk) sk.parentNode.removeChild(sk);
      var r = S.result();
      if (mode === 'play') {
        you = r; newBest = r.points > best;
        if (newBest) { best = r.points; store('ngt-nex-best-pts', String(best)); }
        mode = 'idle'; show('over');
      } else {
        nexRes = r; nexRes.day = Math.min(nexRes.day, you.day); mode = 'idle'; show('compare');
      }
    }
    function skip() {
      if (mode !== 'nex') return;
      cancelAnimationFrame(raf);
      while (S.health > 0 && S.day < you.day) S.step(true);
      draw(); finish();
    }
    function run(m) {
      cancelAnimationFrame(raf);
      if (m === 'play') seed = (Math.random() * 1e9) | 0;
      S = new Sim(seed); mode = m; acc = 0; last = 0;
      q('.ng-ov').hidden = true;
      root.classList.toggle('ng-nexmode', m === 'nex');
      var old = q('.ng-skip'); if (old) old.parentNode.removeChild(old);
      if (m === 'nex') {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'ng-skip'; b.textContent = STR[lang].skip;
        b.addEventListener('click', skip); q('.ng-top').appendChild(b);
      }
      draw(); raf = requestAnimationFrame(loop);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && mode === 'play') { cancelAnimationFrame(raf); mode = 'paused'; show('pause'); }
    });

    function num(n) { try { return n.toLocaleString(lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'it-IT'); } catch (e) { return String(n); } }
    function fmt(v, dec) { var s = v.toFixed(dec); return lang === 'en' ? s : s.replace('.', ','); }
    function fill(s, r) { return s.replace('{p}', num(r.points || 0)).replace('{d}', r.day).replace('{c}', r.cycle).replace('{b}', r.bonus); }
    function place(node, x, y, sc) { node.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')' + (sc ? ' scale(' + sc + ')' : '')); }

    var dark = false;
    function draw() {
      var t = STR[lang], h = S.hour(), up = S.sunUp(h);
      // notte: colori invertiti (anche la pagina, se richiesto)
      if (dark !== !up) { dark = !up; root.classList.toggle('ng-dark', dark); if (opts.invertPage) document.body.classList.toggle('ng-dark-page', dark); }
      // sole e luna sull'arco: fanno da orologio
      var sunPos = arcPt(Math.min(1, Math.max(0, (h - C.SUNRISE) / (C.SUNSET - C.SUNRISE))));
      var peak = S.shown === EV_SUN || S.active === EV_SUN;
      el.sun.style.display = up ? '' : 'none';
      if (up) place(el.sun, sunPos[0], sunPos[1], peak ? 1.4 : 1);
      root.classList.toggle('ng-peak', peak);
      el.moon.style.display = up ? 'none' : '';
      el.stars.style.display = up ? 'none' : '';
      if (!up) { var mh = (h - C.SUNSET + 24) % 24, mp = arcPt(Math.min(1, mh / (24 - C.SUNSET + C.SUNRISE))); place(el.moon, mp[0], mp[1]); }
      // nuvola decorativa che attraversa lentamente il cielo di giorno
      el.deco.style.display = up ? '' : 'none';
      if (up) place(el.deco, 660 - ((S.t * 9) % 780), 58, .7);
      // nuvola dell'imprevisto: arriva da destra durante l'avviso, copre il sole, poi se ne va
      var cx = null;
      if (S.pend && S.pend.k === EV_CLOUD) { var p = Math.min(1, (S.t - S.pend.from) / Math.max(.1, S.pend.at - S.pend.from)); cx = 650 + (sunPos[0] + 18 - 650) * p; }
      else if (S.cloudy()) cx = sunPos[0] + 18;
      else if (S.t < S.cloudUntil + 3) cx = sunPos[0] + 18 - (S.t - S.cloudUntil) / 3 * (sunPos[0] + 120);
      el.cev.style.display = cx === null || !up ? 'none' : '';
      if (cx !== null) place(el.cev, cx, sunPos[1] + 16, 1);
      // caldo: aria che tremola
      el.heat.style.display = (S.shown === EV_HEAT || S.active === EV_HEAT) ? '' : 'none';
      // LED supplementari
      var led = S.ledOn();
      root.classList.toggle('ng-led-on', led);
      // testi in alto
      var hh = Math.floor(h), mm = Math.floor((h - hh) * 6) * 10;
      q('.ng-clock').textContent = t.day + Math.floor(S.day + 1) + ' · ' + (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
      q('.ng-label').textContent = mode === 'nex' ? t.headNex : '';
      q('.ng-hi').textContent = best ? t.hi + ' ' + pad(best, 5) : '';
      q('.ng-pts').textContent = pad(S.points, 5);
      q('.ng-mult').textContent = S.mult > 1 ? '×' + fmt(S.mult, 1).replace(/[.,]0$/, '') : '';
      // manometri
      ui.forEach(function (u, i) {
        var d = GAUGES[i], g = S.g[i], o = g.v < d.lo || g.v > d.hi;
        u.needle.setAttribute('transform', 'rotate(' + ang(d, g.v).toFixed(1) + ')');
        u.el.classList.toggle('out', o);
        var w = S.shown !== null && EVENTS[S.shown][0] === i;
        u.el.classList.toggle('warn', w);
        var help = w && S.evN <= C.HELP_EV; // aiuto solo per i primi imprevisti
        u.btn[0].classList.toggle('hint', help && EVENTS[S.shown][1] < 0);
        u.btn[1].classList.toggle('hint', help && EVENTS[S.shown][1] > 0);
        u.name.textContent = d.k === 'vpd' ? t.vpd : d.k === 'ec' ? t.ec : 'pH';
        u.val.textContent = fmt(g.v, d.dec) + (d.unit ? ' ' + d.unit : '');
      });
      // stato: raccolto > imprevisto in arrivo > meteo
      var st = q('.ng-status'), msg, kind = '', html = null;
      if (S.lastHarvest && S.t < S.lastHarvest.until) { msg = fill(t.harvest, { bonus: S.lastHarvest.bonus, cycle: S.cycle, day: 0 }); kind = 'good'; }
      else if (S.shown !== null) {
        var ev = EVENTS[S.shown], gk = GAUGES[ev[0]].k, gn = gk === 'vpd' ? t.vpd : gk === 'ec' ? t.ec : 'pH';
        var cd = S.pend ? Math.max(1, Math.ceil(S.pend.at - S.t)) : null, eff = gn + ' ' + (ev[1] > 0 ? '▲ ' + t.up : '▼ ' + t.down);
        if (S.evN <= C.HELP_EV) {
          html = '<span class="ng-evc">' + (cd !== null ? cd + '<small>s</small>' : t.now) + '</span><span class="ng-evt">' + t.evT[S.shown] +
            '</span><span class="ng-evd">' + eff + ' → ' + t.press + ' <b>' + (ev[1] > 0 ? '▼' : '▲') + '</b></span>';
          kind = 'warn';
        } else { // dopo i primi imprevisti: solo cosa succede, senza secondi né tasto suggerito
          html = '<span class="ng-evt">' + t.evT[S.shown] + '</span><span class="ng-evd">' + eff + '</span>';
          kind = 'warn bare';
        }
        msg = t.evT[S.shown];
      }
      else msg = !up ? (S.photo() ? t.w_dusk : t.w_night) : S.cloudy() ? t.w_cloud : t.w_clear;
      if (html !== null) { if (st._h !== html) { st.innerHTML = html; st._h = html; } }
      else if (st._h !== msg) { st.textContent = msg; st._h = msg; }
      st.className = 'ng-status' + (kind ? ' ' + kind : '');
      // pianta
      var cf = Math.min(1, S.cycleDay() / C.HARVEST), s = cf < .07 ? 0 : cf < .2 ? 1 : cf < .4 ? 2 : cf < .65 ? 3 : cf < .93 ? 4 : 5;
      q('.ng-stage').textContent = t.crop + ' · ' + t.st[s] + ' · ' + t.cycle + ' ' + S.cycle;
      for (var k = 0; k < el.leaves.length; k++) el.leaves[k].style.display = s > k ? '' : 'none';
      el.stem.style.display = s > 0 ? '' : 'none';
      el.seed.style.display = s === 0 ? '' : 'none';
      var droop = (100 - S.health) / 100;
      el.pl.style.transform = 'rotate(' + (droop * 16) + 'deg) scaleY(' + (1 - droop * .15) + ')';
      root.style.setProperty('--ng-wilt', (1 - droop * .8).toFixed(2));
      q('.ng-hlabel').textContent = t.health;
      el.hp.style.width = S.health + '%';
      root.classList.toggle('ng-low', S.health < 35);
    }

    var shown = 'start';
    function show(kind) {
      shown = kind;
      var t = STR[lang], ov = q('.ng-ov'), btns = q('.ng-ov-btns'), cmp = q('.ng-cmp');
      ov.hidden = false; cmp.innerHTML = ''; btns.innerHTML = '';
      ['.ng-ov-p', '.ng-ov-nex', '.ng-note', '.ng-cta', '.ng-ov-best'].forEach(function (s) { q(s).textContent = ''; });
      function btn(label, cls, fn) { var b = document.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = label; b.addEventListener('click', fn); btns.appendChild(b); return b; }
      function shareBtn() {
        var b = btn(t.share, 'ng-btn ghost', function () {
          // record + battuta + link, tutto nel testo: molte app ignorano il testo se il link è passato a parte
          var rec = you.points >= best, head = fill(rec ? t.shareRec : t.shareRun, you).replace('{r}', num(best));
          var full = head + '\n' + t.jabs[Math.floor(Math.random() * t.jabs.length)] + '\n👉 ' + shareUrl;
          if (navigator.share) { navigator.share({ text: full }).catch(function () {}); return; }
          function ok() { b.textContent = t.copied; setTimeout(function () { b.textContent = t.share; }, 1800); }
          try { navigator.clipboard.writeText(full).then(ok, function () {}); } catch (e) {}
        });
      }
      if (kind === 'start') {
        q('.ng-ov-t').textContent = t.start_t;
        q('.ng-ov-p').textContent = t.start_p + ' ' + t.keys;
        btn(t.start_b, 'ng-btn', function () { run('play'); });
        if (best) q('.ng-ov-best').textContent = t.bestShort + ': ' + num(best);
      } else if (kind === 'pause') {
        q('.ng-ov-t').textContent = t.pause_t;
        btn(t.resume, 'ng-btn', function () { q('.ng-ov').hidden = true; mode = 'play'; last = 0; raf = requestAnimationFrame(loop); });
      } else if (kind === 'over') {
        q('.ng-ov-t').textContent = newBest ? t.newbest : t.over_t;
        q('.ng-ov-p').textContent = fill(t.over_p, you);
        q('.ng-ov-nex').textContent = t.nexline;
        btn(t.watch, 'ng-btn', function () { run('nex'); });
        btn(t.again, 'ng-btn ghost', function () { run('play'); });
        shareBtn();
        q('.ng-ov-best').textContent = t.bestShort + ': ' + num(best);
      } else if (kind === 'compare') {
        q('.ng-ov-t').textContent = t.cmp_t;
        var rows = [[t.r_day, String(you.day), String(nexRes.day)],
                    [t.r_band, you.band + '%', nexRes.band + '%'],
                    [t.r_manual, String(you.presses), '0 · ' + t.auto],
                    [t.r_pts, num(you.points), num(nexRes.points)]];
        cmp.innerHTML = '<table><thead><tr><th></th><th>' + esc(t.you) + '</th><th>' + esc(t.nex) + '</th></tr></thead><tbody>' +
          rows.map(function (r) { return '<tr><th>' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'; }).join('') + '</tbody></table>';
        q('.ng-ov-nex').textContent = t.nexline;
        q('.ng-note').textContent = t.note;
        q('.ng-cta').innerHTML = esc(t.cta) + ' <a href="mailto:info@neuragrowtech.com">info@neuragrowtech.com</a>';
        btn(t.again, 'ng-btn', function () { run('play'); });
        shareBtn();
      }
    }

    draw(); show('start');
    return {
      setLang: function (l) {
        if (!STR[l]) return; lang = l; draw();
        var sk = q('.ng-skip'); if (sk) sk.textContent = STR[l].skip;
        if (!q('.ng-ov').hidden) show(shown);
      }
    };
  }

  window.NexGame = { mount: mount, Sim: Sim, C: C, GAUGES: GAUGES };
})();
