// Base de datos de alimentos integrada
const baseDeDatosAlimentos = [
    { nombre: "Arroz blanco cocido", carbohidratosPor100g: 28, caloriasPor100g: 130 },
    { nombre: "Avena en hojuelas", carbohidratosPor100g: 66, caloriasPor100g: 389 },
    { nombre: "Papa/Patata hervida", carbohidratosPor100g: 17, caloriasPor100g: 77 },
    { nombre: "Banana/Plátano", carbohidratosPor100g: 23, caloriasPor100g: 89 },
    { nombre: "Pechuga de pollo", carbohidratosPor100g: 0, caloriasPor100g: 165 },
    { nombre: "Huevo entero", carbohidratosPor100g: 0.7, caloriasPor100g: 155 }
];

function procesarDatos() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.getElementById('sexo').value;
    const objetivo = document.getElementById('objetivo').value;
    const esPremium = document.getElementById('premium').value === 'si';

    if (!peso || !altura || !edad) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    let geb = 0;
    if (sexo === 'masculino') {
        geb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else {
        geb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }

    let caloriasMantenimiento = geb * 1.4;
    let caloriasObjetivo = caloriasMantenimiento;

    if (objetivo === 'deficit') {
        caloriasObjetivo -= 400; 
    } else if (objetivo === 'volumen') {
        caloriasObjetivo += 400; 
    }

    const proteinaGramos = Math.round(peso * 2); 
    const grasaGramos = Math.round(peso * 1);    
    const kcalProteina = proteinaGramos * 4;
    const kcalGrasa = grasaGramos * 9;
    const kcalRestantes = caloriasObjetivo - (kcalProteina + kcalGrasa);
    const carbohidratosGramos = Math.max(0, Math.round(kcalRestantes / 4));

    let htmlOpcionesComida = "<ul>";
    baseDeDatosAlimentos.forEach(alimento => {
        if (alimento.carbohidratosPor100g > 0) {
            const gramosNecesarios = Math.round((carbohidratosGramos / alimento.carbohidratosPor100g) * 100);
            htmlOpcionesComida += `<li>Para cubrir tus carbohidratos solo con <strong>${alimento.nombre}</strong>, deberías comer unos <strong>${gramosNecesarios}g</strong> al día.</li>`;
        }
    });
    htmlOpcionesComida += "</ul>";

    let estructuraRutina = "";
    if (sexo === 'masculino') {
        estructuraRutina = `
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ LUNES: Pecho, Hombro y Brazos</strong><br>• Press de Banca Plano — 4x10<br>• Press Militar con mancuernas — 3x12<br>• Curl de Bíceps con barra Z — 3x12</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ MARTES: Pierna Completa</strong><br>• Sentadillas Libres con barra — 4x8<br>• Prensa Inclinada a 45° — 3x12<br>• Curl Femoral acostado — 3x12</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ MIÉRCOLES: Espalda y Tríceps</strong><br>• Dominadas o Jalón al Pecho — 4x10<br>• Remo con barra T — 3x10<br>• Extensión en polea — 3x12</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ JUEVES: Pierna y Glúteos</strong><br>• Peso Muerto Convencional — 4x6<br>• Hip Thrust con barra — 4x10<br>• Zancadas caminando — 3x12</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ VIERNES: Enfoque Total</strong><br>• Press inclinado con mancuernas — 3x12<br>• Remo en polea baja — 3x12<br>• Curl martillo — 3x12</div>
        `;
    } else {
        estructuraRutina = `
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ LUNES: Glúteos y Femorales</strong><br>• Hip Thrust con barra pesada — 4x12<br>• Peso Muerto Rumano — 4x10<br>• Patada de Glúteo en polea — 3x12</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ MARTES: Cuádriceps y Pantorrilla</strong><br>• Sentadilla Goblet con mancuerna — 4x10<br>• Prensa inclinada — 3x12<br>• Elevación de talones — 4x20</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ MIÉRCOLES: Espalda y Brazos</strong><br>• Jalón al Pecho abierto — 3x12<br>• Remo con mancuerna — 3x10<br>• Extensión de Tríceps — 3x12</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ JUEVES: Pierna (Aislamiento)</strong><br>• Sentadillas Búlgaras — 3x10 por pierna<br>• Curl Femoral acostado — 4x12<br>• Prensa horizontal — 3x15</div>
            <div class="dia-entrenamiento" style="margin-bottom: 12px;"><strong>🗓️ VIERNES: Glúteos y Pierna Completa</strong><br>• Sentadilla Libre profunda — 4x10<br>• Hip Thrust (pausa de 2s arriba) — 3x12<br>• Máquina de Abductores — 4x20</div>
        `;
    }

    let contenidoFinalRutina = "";
    if (esPremium) {
        contenidoFinalRutina = `
            <div style="background-color: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 15px; font-weight: bold;">[✓] MODO PREMIUM ACTIVO</div>
            ${estructuraRutina}
        `;
    } else {
        contenidoFinalRutina = `
            ${estructuraRutina}
            <div id="bloque-premium-web" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 6px; text-align: center; margin-top: 15px;">
                <h4 style="color: #721c24; margin-top: 0;">🔒 ¿Quieres desbloquear los VIDEOS guiados?</h4>
                <p style="color: #721c24; font-size: 13px;">Aprende la postura exacta mirando el video instruccional de los ejercicios diseñados para ti.</p>
                <button onclick="simularPago()" style="background-color: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Desbloquear Videos Guía por $9.99</button>
            </div>
        `;
    }

    document.getElementById('res-calorias').innerText = Math.round(caloriasObjetivo);
    document.getElementById('res-carbos').innerText = carbohidratosGramos;
    document.getElementById('res-proteinas').innerText = proteinaGramos;
    document.getElementById('res-grasas').innerText = grasaGramos;
    document.getElementById('res-comidas').innerHTML = htmlOpcionesComida;
    document.getElementById('res-rutina').innerHTML = contenidoFinalRutina;

    document.getElementById('resultados').style.display = 'block';
}

function simularPago() {
    alert("Redirigiendo de forma segura a la plataforma de pago... 💳");
}

// NUEVA FUNCIÓN INMUNE A ERRORES: FONDO CLARO ESTÉTICO Y CERO ANUNCIOS
function descargarPDF() {
    const kcal = document.getElementById('res-calorias').innerText;
    const carbos = document.getElementById('res-carbos').innerText;
    const proteinas = document.getElementById('res-proteinas').innerText;
    const grasas = document.getElementById('res-grasas').innerText;
    const comidas = document.getElementById('res-comidas').innerHTML;
    const sexo = document.getElementById('sexo').value;
    
    // Construimos la rutina del PDF de manera directa para evitar arrastrar la publicidad web
    let rutinaLimpiaPDF = "";
    if (sexo === 'masculino') {
        rutinaLimpiaPDF = `
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ LUNES: Pecho, Hombro y Brazos</strong><br>• Press de Banca Plano — 4x10<br>• Press Militar con mancuernas — 3x12<br>• Curl de Bíceps con barra Z — 3x12</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ MARTES: Pierna Completa</strong><br>• Sentadillas Libres con barra — 4x8<br>• Prensa Inclinada a 45° — 3x12<br>• Curl Femoral acostado — 3x12</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ MIÉRCOLES: Espalda y Tríceps</strong><br>• Dominadas o Jalón al Pecho — 4x10<br>• Remo con barra T — 3x10<br>• Extensión en polea — 3x12</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ JUEVES: Pierna y Glúteos</strong><br>• Peso Muerto Convencional — 4x6<br>• Hip Thrust con barra — 4x10<br>• Zancadas caminando — 3x12</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ VIERNES: Enfoque Total</strong><br>• Press inclinado con mancuernas — 3x12<br>• Remo en polea baja — 3x12<br>• Curl martillo — 3x12</div>
        `;
    } else {
        rutinaLimpiaPDF = `
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ LUNES: Glúteos y Femorales</strong><br>• Hip Thrust con barra pesada — 4x12<br>• Peso Muerto Rumano — 4x10<br>• Patada de Glúteo en polea — 3x12</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ MARTES: Cuádriceps y Pantorrilla</strong><br>• Sentadilla Goblet con mancuerna — 4x10<br>• Prensa inclinada — 3x12<br>• Elevación de talones — 4x20</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ MIÉRCOLES: Espalda y Brazos</strong><br>• Jalón al Pecho abierto — 3x12<br>• Remo con mancuerna — 3x10<br>• Extensión de Tríceps — 3x12</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ JUEVES: Pierna (Aislamiento)</strong><br>• Sentadillas Búlgaras — 3x10 por pierna<br>• Curl Femoral acostado — 4x12<br>• Prensa horizontal — 3x15</div>
            <div style="margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;"><strong>🗓️ VIERNES: Glúteos y Pierna Completa</strong><br>• Sentadilla Libre profunda — 4x10<br>• Hip Thrust (pausa de 2s arriba) — 3x12<br>• Máquina de Abductores — 4x20</div>
        `;
    }

    // Contenedor con diseño limpio deportivo (Fondo Blanco - Letras Oscuras)
    const plantillaPDF = document.createElement('div');
    plantillaPDF.style.padding = '30px';
    plantillaPDF.style.fontFamily = "'Segoe UI', Roboto, Arial, sans-serif";
    plantillaPDF.style.color = '#1e293b';
    plantillaPDF.style.backgroundColor = '#ffffff';

    plantillaPDF.innerHTML = `
        <div style="text-align: center; border-bottom: 3px solid #16a34a; padding-bottom: 12px; margin-bottom: 25px;">
            <h1 style="margin: 0; color: #0f172a; font-size: 26px; letter-spacing: 1px;">🏋️‍♂️ MI PLAN FITNESS PRO 🏋️‍♂️</h1>
            <p style="margin: 5px 0 0 0; color: #16a34a; font-size: 13px; font-weight: bold; text-transform: uppercase;">Disciplina, Enfoque y Resultados</p>
        </div>

        <h2 style="color: #16a34a; font-size: 16px; text-transform: uppercase; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px;">📊 Macronutrientes Diarios</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background-color: #f8fafc; border-radius: 6px; overflow: hidden; text-align: center; border: 1px solid #e2e8f0;">
            <thead>
                <tr style="background-color: #0f172a; color: #ffffff; font-size: 12px; text-transform: uppercase;">
                    <th style="padding: 10px;">Calorías totales</th>
                    <th style="padding: 10px;">Carbohidratos</th>
                    <th style="padding: 10px;">Proteínas</th>
                    <th style="padding: 10px;">Grasas</th>
                </tr>
            </thead>
            <tbody>
                <tr style="font-weight: bold; font-size: 16px;">
                    <td style="padding: 12px; border-top: 1px solid #e2e8f0; color: #2563eb;">${kcal} kcal</td>
                    <td style="padding: 12px; border-top: 1px solid #e2e8f0; color: #16a34a;">${carbos}g</td>
                    <td style="padding: 12px; border-top: 1px solid #e2e8f0; color: #16a34a;">${proteinas}g</td>
                    <td style="padding: 12px; border-top: 1px solid #e2e8f0; color: #16a34a;">${grasas}g</td>
                </tr>
            </tbody>
        </table>

        <h2 style="color: #16a34a; font-size: 16px; text-transform: uppercase; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px;">🛒 Guía de Alimentación</h2>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; font-size: 13px; line-height: 1.6; color: #334155; margin-bottom: 25px; border: 1px solid #e2e8f0;">
            ${comidas}
        </div>

        <h2 style="color: #16a34a; font-size: 16px; text-transform: uppercase; border-left: 4px solid #16a34a; padding-left: 8px; margin-bottom: 15px;">💪 Rutina de Entrenamiento Semanal</h2>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; font-size: 13px; line-height: 1.6; color: #334155; border: 1px solid #e2e8f0;">
            ${rutinaLimpiaPDF}
        </div>

        <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 11px;">
            Plan generado de forma personalizada • ¡A darle con todo!
        </div>
    `;

    const opciones = {
        margin:       [12, 12, 12, 12],
        filename:     'Mi_Plan_Fitness_GymApp.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, backgroundColor: '#ffffff', useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(plantillaPDF).save();
}