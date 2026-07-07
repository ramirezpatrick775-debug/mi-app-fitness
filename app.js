// Base de datos de alimentos ampliada y más variada
const baseDeDatosAlimentos = [
    { nombre: "Arroz blanco cocido", carbohidratosPor100g: 28, proteinasPor100g: 2.7, grasasPor100g: 0.3, caloriasPor100g: 130 },
    { nombre: "Avena en hojuelas", carbohidratosPor100g: 66, proteinasPor100g: 16.9, grasasPor100g: 6.9, caloriasPor100g: 389 },
    { nombre: "Papa/Patata hervida", carbohidratosPor100g: 17, proteinasPor100g: 2, grasasPor100g: 0.1, caloriasPor100g: 77 },
    { nombre: "Banana/Plátano", carbohidratosPor100g: 23, proteinasPor100g: 1.1, grasasPor100g: 0.3, caloriasPor100g: 89 },
    { nombre: "Pechuga de pollo (plancha)", carbohidratosPor100g: 0, proteinasPor100g: 31, grasasPor100g: 3.6, caloriasPor100g: 165 },
    { nombre: "Carne vacuna magra", carbohidratosPor100g: 0, proteinasPor100g: 26, grasasPor100g: 10, caloriasPor100g: 200 },
    { nombre: "Filete de Merluza o Pescado blanco", carbohidratosPor100g: 0, proteinasPor100g: 18, grasasPor100g: 2, caloriasPor100g: 90 },
    { nombre: "Huevo entero (por unidad)", carbohidratosPor100g: 0.7, proteinasPor100g: 6.3, grasasPor100g: 5, caloriasPor100g: 78 }
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

    // Renderizado de alimentación variada (Carbohidratos y Proteínas principales)
    let htmlOpcionesComida = "<p style='margin-bottom:8px; font-weight:bold; color:#22c55e;'>🍞 Fuentes de Carbohidratos (Elige para tus comidas):</p><ul>";
    baseDeDatosAlimentos.forEach(alimento => {
        if (alimento.carbohidratosPor100g > 15) {
            const gramosNecesarios = Math.round((carbohidratosGramos / alimento.carbohidratosPor100g) * 100);
            htmlOpcionesComida += `<li><strong>${alimento.nombre}</strong>: unos <strong>${gramosNecesarios}g</strong> netos para cubrir tus carbohidratos diarios.</li>`;
        }
    });
    htmlOpcionesComida += "</ul><p style='margin-top:15px; margin-bottom:8px; font-weight:bold; color:#22c55e;'>🥩 Fuentes de Proteína (Distribúyelas en tu día):</p><ul>";
    
    baseDeDatosAlimentos.forEach(alimento => {
        if (alimento.proteinasPor100g > 10 && alimento.carbohidratosPor100g <= 15) {
            const gramosProteina = Math.round((proteinaGramos / alimento.proteinasPor100g) * 100);
            htmlOpcionesComida += `<li><strong>${alimento.nombre}</strong>: necesitas unos <strong>${gramosProteina}g</strong> al día para alcanzar tu meta de proteína.</li>`;
        }
    });
    htmlOpcionesComida += "</ul>";

    // Rutina expandida con 4 ejercicios exigentes por día
    let estructuraRutina = "";
    if (sexo === 'masculino') {
        estructuraRutina = `
            <div class="dia-entrenamiento"><strong>🗓️ LUNES: Pecho, Hombro y Tríceps</strong><br>• Press de Banca Plano — 4x10<br>• Press Inclinado con mancuernas — 3x12<br>• Press Militar con mancuernas — 3x10<br>• Fondos en paralelas o copa de Tríceps — 3x12</div>
            <div class="dia-entrenamiento"><strong>🗓️ MARTES: Pierna (Enfoque Cuádriceps)</strong><br>• Sentadillas Libres con barra — 4x8<br>• Prensa Inclinada a 45° — 3x12<br>• Extensiones de Cuádriceps en máquina — 4x15<br>• Elevación de Pantorrillas de pie — 4x20</div>
            <div class="dia-entrenamiento"><strong>🗓️ MIÉRCOLES: Espalda y Bíceps</strong><br>• Dominadas o Jalón al Pecho — 4x10<br>• Remo con barra T o Remo Gironda — 3x10<br>• Pull-over con polea alta — 3x12<br>• Curl de Bíceps con barra Z — 4x12</div>
            <div class="dia-entrenamiento"><strong>🗓️ JUEVES: Hombro Completo y Abdomen</strong><br>• Press Arnold para hombros — 4x10<br>• Elevaciones Laterales con mancuernas — 4x12<br>• Pájaros (Hombro posterior) — 3x15<br>• Crunch abdominal en polea — 4x15</div>
            <div class="dia-entrenamiento"><strong>🗓️ VIERNES: Pierna (Femorales y Glúteos)</strong><br>• Peso Muerto Convencional o Rumano — 4x8<br>• Hip Thrust con barra — 4x10<br>• Curl Femoral acostado — 3x12<br>• Zancadas caminando — 3x12 por pierna</div>
        `;
    } else {
        estructuraRutina = `
            <div class="dia-entrenamiento"><strong>🗓️ LUNES: Glúteos y Femorales (Pesado)</strong><br>• Hip Thrust con barra — 4x12<br>• Peso Muerto Rumano — 4x10<br>• Patada de Glúteo en polea baja — 3x12<br>• Curl Femoral acostado — 3x15</div>
            <div class="dia-entrenamiento"><strong>🗓️ MARTES: Tren Superior Completo</strong><br>• Jalón al Pecho abierto — 3x12<br>• Press inclinado con mancuernas — 3x12<br>• Elevaciones laterales para hombro — 3x12<br>• Curl de bíceps + Extensión de tríceps — 3x12</div>
            <div class="dia-entrenamiento"><strong>🗓️ MIÉRCOLES: Cuádriceps y Pantorrillas</strong><br>• Sentadilla Goblet con mancuerna — 4x10<br>• Prensa inclinada — 3x12<br>• Extensiones de Cuádriceps — 3x15<br>• Elevación de talones sentada — 4x20</div>
            <div class="dia-entrenamiento"><strong>🗓️ JUEVES: Glúteo (Aislamiento y Enfoque)</strong><br>• Sentadillas Búlgaras — 3x10 por pierna<br>• Hip Thrust (con pausa de 2s arriba) — 4x10<br>• Máquina de Abductores — 4x20<br>• Extensiones de espalda enfocadas en glúteo — 3x12</div>
            <div class="dia-entrenamiento"><strong>🗓️ VIERNES: Full Body / Acondicionamiento</strong><br>• Sentadilla Libre profunda — 4x10<br>• Remo con mancuerna — 3x12<br>• Zancadas inversas — 3x12 por pierna<br>• Plancha abdominal tradicional — 3x45 segundos</div>
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
            <div id="bloque-premium-web" style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 6px; text-align: center; margin-top: 15px; color: #721c24;">
                <h4 style="margin-top: 0; color: #721c24;">🔒 ¿Quieres desbloquear los VIDEOS guiados?</h4>
                <p style="font-size: 13px;">Aprende la postura exacta mirando el video instruccional de los ejercicios diseñados para ti.</p>
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

function descargarPlanPDF() {
    const kcal = document.getElementById('res-calorias').innerText;
    const carbos = document.getElementById('res-carbos').innerText;
    const proteinas = document.getElementById('res-proteinas').innerText;
    const grasas = document.getElementById('res-grasas').innerText;
    const comidas = document.getElementById('res-comidas').innerHTML;
    const sexo = document.getElementById('sexo').value;
    
    let rutinaPDF = "";
    if (sexo === 'masculino') {
        rutinaPDF = `
            <div style="margin-bottom: 8px;"><strong>🗓️ LUNES: Pecho, Hombro y Tríceps</strong><br>• Press Banca — 4x10 | • Press Inclinado — 3x12 | • Press Militar — 3x10 | • Fondos — 3x12</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ MARTES: Pierna (Cuádriceps)</strong><br>• Sentadillas Libres — 4x8 | • Prensa 45° — 3x12 | • Extensiones — 4x15 | • Pantorrillas — 4x20</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ MIÉRCOLES: Espalda y Bíceps</strong><br>• Dominadas/Jalón — 4x10 | • Remo T — 3x10 | • Pull-over — 3x12 | • Curl Barra Z — 4x12</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ JUEVES: Hombro y Abdomen</strong><br>• Press Arnold — 4x10 | • Laterales — 4x12 | • Pájaros — 3x15 | • Crunches Polea — 4x15</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ VIERNES: Pierna (Femoral/Glúteo)</strong><br>• Peso Muerto — 4x8 | • Hip Thrust — 4x10 | • Curl Femoral — 3x12 | • Zancadas — 3x12</div>
        `;
    } else {
        rutinaPDF = `
            <div style="margin-bottom: 8px;"><strong>🗓️ LUNES: Glúteos y Femorales</strong><br>• Hip Thrust — 4x12 | • Peso Muerto Rumano — 4x10 | • Patadas Polea — 3x12 | • Curl Femoral — 3x15</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ MARTES: Tren Superior Completo</strong><br>• Jalón Pecho — 3x12 | • Press Inclinado — 3x12 | • Laterales — 3x12 | • Bíceps/Tríceps — 3x12</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ MIÉRCOLES: Cuádriceps y Pantorrilla</strong><br>• Sentadilla Goblet — 4x10 | • Prensa — 3x12 | • Extensiones — 3x15 | • Talones — 4x20</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ JUEVES: Glúteo (Enfoque)</strong><br>• S. Búlgaras — 3x10 | • Hip Thrust Pausa — 4x10 | • Abductores — 4x20 | • Ext. Glúteo — 3x12</div>
            <div style="margin-bottom: 8px;"><strong>🗓️ VIERNES: Full Body</strong><br>• Sentadilla Profunda — 4x10 | • Remo Mancuerna — 3x12 | • Zancadas — 3x12 | • Plancha — 3x45s</div>
        `;
    }

    const plantilla = document.createElement('div');
    plantilla.style.padding = '25px';
    plantilla.style.fontFamily = 'Arial, sans-serif';
    plantilla.style.color = '#1e293b';
    plantilla.style.backgroundColor = '#ffffff';

    plantilla.innerHTML = `
        <div style="text-align: center; border-bottom: 3px solid #22c55e; padding-bottom: 8px; margin-bottom: 15px;">
            <h1 style="margin: 0; color: #0f172a; font-size: 22px;">🏋️‍♂️ MI PLAN FITNESS PRO 🏋️‍♂️</h1>
            <p style="margin: 4px 0 0 0; color: #22c55e; font-size: 11px; font-weight: bold; text-transform: uppercase;">Tu Guía Personalizada</p>
        </div>

        <h3 style="color: #22c55e; font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">📊 Macronutrientes Objetivos</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; text-align: center; border: 1px solid #e2e8f0; background-color: #f8fafc;">
            <thead>
                <tr style="background-color: #0f172a; color: white; font-size: 11px;">
                    <th style="padding: 6px;">CALORÍAS</th>
                    <th style="padding: 6px;">CARBOHIDRATOS</th>
                    <th style="padding: 6px;">PROTEÍNAS</th>
                    <th style="padding: 6px;">GRASAS</th>
                </tr>
            </thead>
            <tbody>
                <tr style="font-weight: bold; font-size: 13px;">
                    <td style="padding: 8px; color: #2563eb;">${kcal} kcal</td>
                    <td style="padding: 8px; color: #16a34a;">${carbos}g</td>
                    <td style="padding: 8px; color: #16a34a;">${proteinas}g</td>
                    <td style="padding: 8px; color: #16a34a;">${grasas}g</td>
                </tr>
            </tbody>
        </table>

        <h3 style="color: #22c55e; font-size: 14px; text-transform: uppercase; margin-bottom: 6px;">🛒 Distribución de Alimentos Variados</h3>
        <div style="background-color: #f8fafc; padding: 10px; border-radius: 6px; font-size: 11px; line-height: 1.4; border: 1px solid #e2e8f0; margin-bottom: 15px;">
            ${comidas}
        </div>

        <h3 style="color: #22c55e; font-size: 14px; text-transform: uppercase; margin-bottom: 6px;">💪 Rutina Semanal Completada (4 Ejercicios)</h3>
        <div style="background-color: #f8fafc; padding: 10px; border-radius: 6px; font-size: 11px; line-height: 1.4; border: 1px solid #e2e8f0;">
            ${rutinaPDF}
        </div>

        <div style="text-align: center; margin-top: 15px; color: #94a3b8; font-size: 9px;">
            ¡Plan de entrenamiento y alimentación optimizado! A romperla.
        </div>
    `;

    const opciones = {
        margin:       8,
        filename:     'Mi_Plan_Fitness_Variado.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, backgroundColor: '#ffffff' },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(plantilla).save();
}