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
            <div style="margin-bottom: 12px;"><strong>🗓️ LUNES: Pecho, Hombro y Brazos</strong><br>• Press de Banca Plano — 4x10<br>• Press Militar con mancuernas — 3x12<br>• Curl de Bíceps con barra Z — 3x12</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ MARTES: Pierna Completa</strong><br>• Sentadillas Libres con barra — 4x8<br>• Prensa Inclinada a 45° — 3x12<br>• Curl Femoral acostado — 3x12</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ MIÉRCOLES: Espalda y Tríceps</strong><br>• Dominadas o Jalón al Pecho — 4x10<br>• Remo con barra T — 3x10<br>• Extensión en polea — 3x12</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ JUEVES: Pierna y Glúteos</strong><br>• Peso Muerto Convencional — 4x6<br>• Hip Thrust con barra — 4x10<br>• Zancadas caminando — 3x12</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ VIERNES: Enfoque Total</strong><br>• Press inclinado con mancuernas — 3x12<br>• Remo en polea baja — 3x12<br>• Curl martillo — 3x12</div>
        `;
    } else {
        estructuraRutina = `
            <div style="margin-bottom: 12px;"><strong>🗓️ LUNES: Glúteos y Femorales</strong><br>• Hip Thrust con barra pesada — 4x12<br>• Peso Muerto Rumano — 4x10<br>• Patada de Glúteo en polea — 3x12</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ MARTES: Cuádriceps y Pantorrilla</strong><br>• Sentadilla Goblet con mancuerna — 4x10<br>• Prensa inclinada — 3x12<br>• Elevación de talones — 4x20</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ MIÉRCOLES: Espalda y Brazos</strong><br>• Jalón al Pecho abierto — 3x12<br>• Remo con mancuerna — 3x10<br>• Extensión de Tríceps — 3x12</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ JUEVES: Pierna (Aislamiento)</strong><br>• Sentadillas Búlgaras — 3x10 por pierna<br>• Curl Femoral acostado — 4x12<br>• Prensa horizontal — 3x15</div>
            <div style="margin-bottom: 12px;"><strong>🗓️ VIERNES: Glúteos y Pierna Completa</strong><br>• Sentadilla Libre profunda — 4x10<br>• Hip Thrust (pausa de 2s arriba) — 3x12<br>• Máquina de Abductores — 4x20</div>
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
                <p style="color: #721c24; font-size: 12px;">Aprende la postura exacta mirando el video instruccional de los ejercicios diseñados para ti.</p>
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

// NUEVA FUNCIÓN CAMBIADA DE NOMBRE PARA DETENER EL CONGELAMIENTO
function descargarPlanPDF() {
    const kcal = document.getElementById('res-calorias').innerText;
    const carbos = document.getElementById('res-carbos').innerText;
    const proteinas = document.getElementById('res-proteinas').innerText;
    const grasas = document.getElementById('res-grasas').innerText;
    const comidas = document.getElementById('res-comidas').innerHTML;
    const sexo = document.getElementById('sexo').value;
    
    let rutinaLimpia = "";
    if (sexo === 'masculino') {
        rutinaLimpia = `
            <p><strong>🗓️ LUNES: Pecho, Hombro y Brazos</strong><br>• Press de Banca Plano — 4x10<br>• Press Militar con mancuernas — 3x12<br>• Curl de Bíceps con barra Z — 3x12</p>
            <p><strong>🗓️ MARTES: Pierna Completa</strong><br>• Sentadillas Libres con barra — 4x8<br>• Prensa Inclinada a 45° — 3x12<br>• Curl Femoral acostado — 3x12</p>
            <p><strong>🗓️ MIÉRCOLES: Espalda y Tríceps</strong><br>• Dominadas o Jalón al Pecho — 4x10<br>• Remo con barra T — 3x10<br>• Extensión en polea — 3x12</p>
            <p><strong>🗓️ JUEVES: Pierna y Glúteos</strong><br>• Peso Muerto Convencional — 4x6<br>• Hip Thrust con barra — 4x10<br>• Zancadas caminando — 3x12</p>
            <p><strong>🗓️ VIERNES: Enfoque Total</strong><br>• Press inclinado con mancuernas — 3x12<br>• Remo en polea baja — 3x12<br>• Curl martillo — 3x12</p>
        `;
    } else {
        rutinaLimpia = `
            <p><strong>🗓️ LUNES: Glúteos y Femorales</strong><br>• Hip Thrust con barra pesada — 4x12<br>• Peso Muerto Rumano — 4x10<br>• Patada de Glúteo en polea — 3x12</p>
            <p><strong>🗓️ MARTES: Cuádriceps y Pantorrilla</strong><br>• Sentadilla Goblet con mancuerna — 4x10<br>• Prensa inclinada — 3x12<br>• Elevación de talones — 4x20</p>
            <p><strong>🗓️ MIÉRCOLES: Espalda y Brazos</strong><br>• Jalón al Pecho abierto — 3x12<br>• Remo con mancuerna — 3x10<br>• Extensión de Tríceps — 3x12</p>
            <p><strong>🗓️ JUEVES: Pierna (Aislamiento)</strong><br>• Sentadillas Búlgaras — 3x10 por pierna<br>• Curl Femoral acostado — 4x12<br>• Prensa horizontal — 3x15</p>
            <p><strong>🗓️ VIERNES: Glúteos y Pierna Completa</strong><br>• Sentadilla Libre profunda — 4x10<br>• Hip Thrust (pausa de 2s arriba) — 3x12<br>• Máquina de Abductores — 4x20</p>
        `;
    }

    const plantillaPDF = document.createElement('div');
    plantillaPDF.style.padding = '20px';
    plantillaPDF.style.fontFamily = 'Arial, sans-serif';
    plantillaPDF.style.color = '#333333';
    plantillaPDF.style.backgroundColor = '#ffffff';

    plantillaPDF.innerHTML = `
        <div style="text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 22px;">🏋️‍♂️ MI PLAN FITNESS PRO 🏋️‍♂️</h1>
            <p style="margin: 5px 0 0 0; color: #22c55e; font-size: 12px; font-weight: bold;">Disciplina y Enfoque</p>
        </div>

        <h3 style="color: #22c55e; margin-bottom: 5px;">📊 Macronutrientes Diarios</h3>
        <p>• <strong>Calorías:</strong> ${kcal} kcal<br>• <strong>Carbohidratos:</strong> ${carbos}g<br>• <strong>Proteínas:</strong> ${proteinas}g<br>• <strong>Grasas:</strong> ${grasas}g</p>

        <h3 style="color: #22c55e; margin-bottom: 5px; margin-top: 20px;">🛒 Guía de Alimentación</h3>
        <div>${comidas}</div>

        <h3 style="color: #22c55e; margin-bottom: 5px; margin-top: 20px;">💪 Rutina Semanal</h3>
        <div>${rutinaLimpia}</div>
    `;

    html2pdf().from(plantillaPDF).save('Mi_Plan_Fitness.pdf');
}