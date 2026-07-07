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
    // 1. Capturar los valores del formulario HTML
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

    // 2. Calcular Gasto Energético Basal (Fórmula Mifflin-St Jeor)
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

    // 3. Distribución de Macronutrientes
    const proteinaGramos = Math.round(peso * 2); 
    const grasaGramos = Math.round(peso * 1);    
    const kcalProteina = proteinaGramos * 4;
    const kcalGrasa = grasaGramos * 9;
    const kcalRestantes = caloriasObjetivo - (kcalProteina + kcalGrasa);
    const carbohidratosGramos = Math.max(0, Math.round(kcalRestantes / 4));

    // 4. Calcular opciones de comidas
    let htmlOpcionesComida = "<ul>";
    baseDeDatosAlimentos.forEach(alimento => {
        if (alimento.carbohidratosPor100g > 0) {
            const gramosNecesarios = Math.round((carbohidratosGramos / alimento.carbohidratosPor100g) * 100);
            htmlOpcionesComida += `<li>Para cubrir tus carbohidratos solo con <strong>${alimento.nombre}</strong>, deberías comer unos <strong>${gramosNecesarios}g</strong> al día.</li>`;
        }
    });
    htmlOpcionesComida += "</ul>";

    // 5. Ejercicios por género
    let estructuraRutina = "";

    if (sexo === 'masculino') {
        estructuraRutina = `
            <div style="margin-bottom: 15px;">
                <strong>🗓️ LUNES: Pecho, Hombro, Tríceps y Bíceps</strong><br>
                • Press de Banca Plano con barra — 4 series x 10 repeticiones<br>
                • Press Militar con mancuernas — 3 series x 12 repeticiones<br>
                • Fondos en paralelas — 3 series x 10 repeticiones<br>
                • Curl de Bíceps con barra Z — 3 series x 12 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ MARTES: Pierna Completa</strong><br>
                • Sentadillas Libres con barra — 4 series x 8 repeticiones<br>
                • Prensa Inclinada a 45° — 3 series x 12 repeticiones<br>
                • Silla de Extensiones — 3 series x 15 repeticiones<br>
                • Curl Femoral acostado — 3 series x 12 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ MIÉRCOLES: Espalda, Trapecio, Bíceps y Tríceps</strong><br>
                • Dominadas o Jalón al Pecho — 4 series x 10 repeticiones<br>
                • Remo con barra T — 3 series x 10 repeticiones<br>
                • Encogimientos con mancuernas — 3 series x 15 repeticiones<br>
                • Curl de Bíceps alternado + Extensión en polea — 3 series x 12 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ JUEVES: Pierna Completa y Glúteos</strong><br>
                • Peso Muerto Convencional — 4 series x 6 repeticiones<br>
                • Hip Thrust pesado con barra — 4 series x 10 repeticiones<br>
                • Zancadas caminando con peso — 3 series x 12 pasos por pierna<br>
                • Elevación de Talones de pie — 4 series x 20 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ VIERNES: Enfoque Total (2 Ejercicios por grupo)</strong><br>
                • Pecho: Press inclinado con mancuernas + Aperturas — 3x12<br>
                • Espalda: Remo en polea baja + Pullover — 3x12<br>
                • Brazos: Curl martillo + Copa a dos manos — 3x12<br>
                • Antebrazo: Curl de antebrazo prono + supino — 3x15
            </div>
        `;
    } else {
        estructuraRutina = `
            <div style="margin-bottom: 15px;">
                <strong>🗓️ LUNES: Glúteos y Femorales</strong><br>
                • Hip Thrust con barra pesada — 4 series x 12 repeticiones<br>
                • Peso Muerto Rumano con mancuernas — 4 series x 10 repeticiones<br>
                • Patada de Glúteo en polea baja — 3 series x 12 repeticiones por lado<br>
                • Curl Femoral sentado — 3 series x 15 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ MARTES: Cuádriceps, Isquios y Pantorrilla</strong><br>
                • Sentadilla Goblet con mancuerna pesada — 4 series x 10 repeticiones<br>
                • Prensa inclinada (pies juntos) — 3 series x 12 repeticiones<br>
                • Extensiones de cuádriceps — 3 series x 15 repeticiones<br>
                • Elevación de talones sentada — 4 series x 20 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ MIÉRCOLES: Espalda (4 Ejercicios) y Tríceps</strong><br>
                • Jalón al Pecho abierto — 3 series x 12 repeticiones<br>
                • Remo con mancuerna a una mano — 3 series x 10 repeticiones<br>
                • Remo Gironda — 3 series x 12 repeticiones<br>
                • Pullover en polea alta — 3 series x 15 repeticiones<br>
                • Extensión de Tríceps en polea — 3 series x 12 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ JUEVES: Cuádriceps y Femoral (Aislamiento)</strong><br>
                • Sentadillas Búlgaras con mancuernas — 3 series x 10 repeticiones por pierna<br>
                • Curl Femoral acostado — 4 series x 12 repeticiones<br>
                • Prensa horizontal de piernas — 3 series x 15 repeticiones<br>
                • Buenos Días con barra — 3 series x 12 repeticiones
            </div>
            <div style="margin-bottom: 15px;">
                <strong>🗓️ VIERNES: Glúteos y Pierna Completa</strong><br>
                • Sentadilla Libre profunda — 4 series x 10 repeticiones<br>
                • Hip Thrust (pausa de 2s arriba) — 3 series x 12 repeticiones<br>
                • Zancadas cruzadas hacia atrás — 3 series x 12 por pierna<br>
                • Máquina de Abductores — 4 series x 20 repeticiones
            </div>
        `;
    }

    let contenidoFinalRutina = "";
    if (esPremium) {
        contenidoFinalRutina = `
            <div style="background-color: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 15px; font-weight: bold;">
                [✓] MODO PREMIUM: Explicaciones en video desbloqueadas
            </div>
            ${estructuraRutina}
            <div style="background: #333; color: #fff; padding: 15px; text-align: center; border-radius: 4px; font-size: 14px; margin-top: 15px;">
                ▶️ <strong>REPRODUCTOR MULTIMEDIA:</strong> Haciendo clic sobre cualquier ejercicio de arriba se reproducirá aquí su video-guía técnica en HD.
            </div>
        `;
    } else {
        contenidoFinalRutina = `
            <div style="background-color: #fff3cd; color: #856404; padding: 12px; border-radius: 4px; margin-bottom: 15px; font-weight: bold;">
                [!] PLAN GRATUITO - TEXTO DE EJERCICIOS BÁSICOS
            </div>
            ${estructuraRutina}
            <hr style="border: 0; border-top: 1px dashed #ccc; margin: 15px 0;">
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 6px; text-align: center;">
                <h4 style="color: #721c24; margin-top: 0;">🔒 ¿Quieres desbloquear los VIDEOS guiados de cada ejercicio?</h4>
                <p style="font-size: 13px; color: #721c24; margin-bottom: 12px;">
                    Aprende la postura exacta mirando el video instruccional de los ejercicios diseñados para ti.
                </p>
                <button onclick="simularPago()" style="background-color: #dc3545; color: white; padding: 10px 20px; font-size: 14px; width: auto; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Desbloquear Videos Guía por $9.99
                </button>
            </div>
        `;
    }

    // 6. Inyectar resultados en la página
    document.getElementById('res-calorias').innerText = Math.round(caloriasObjetivo);
    document.getElementById('res-carbos').innerText = carbohidratosGramos;
    document.getElementById('res-proteinas').innerText = proteinaGramos;
    document.getElementById('res-grasas').innerText = grasaGramos;
    document.getElementById('res-comidas').innerHTML = htmlOpcionesComida;
    document.getElementById('res-rutina').innerHTML = contenidoFinalRutina;

    document.getElementById('resultados').style.display = 'block';
}

function simularPago() {
    alert("Redirigiendo de forma segura a la plataforma de pago... 💳\n\n¡Gracias por tu compra simulada! Para ver tu plan semanal con videos, ahora cambia la opción de arriba a 'Sí, acceso total' y vuelve a dar clic en Calcular.");
}

// FUNCIÓN DE IMPRESIÓN DIRECTA SIN COMPLICACIONES
function descargarPDF() {
    const ventanaImpresion = window.open('', '_blank');
    
    const kcal = document.getElementById('res-calorias').innerText;
    const carbos = document.getElementById('res-carbos').innerText;
    const proteinas = document.getElementById('res-proteinas').innerText;
    const grasas = document.getElementById('res-grasas').innerText;
    const comidas = document.getElementById('res-comidas').innerHTML;
    const rutina = document.getElementById('res-rutina').innerHTML;

    ventanaImpresion.document.write(`
        <html>
        <head>
            <title>Mi Plan Fitness Pro</title>
            <style>
                body { font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.5; }
                .header { text-align: center; border-bottom: 3px solid #22c55e; padding-bottom: 10px; margin-bottom: 20px; }
                h1 { margin: 0; color: #1e293b; font-size: 24px; }
                h2 { color: #22c55e; font-size: 18px; margin-top: 25px; text-transform: uppercase; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; text-align: center; }
                th { background-color: #1e293b; color: white; padding: 10px; border: 1px solid #cbd5e1; }
                td { padding: 12px; border: 1px solid #cbd5e1; font-weight: bold; font-size: 16px; }
                .box { background-color: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🏋️‍♂️ MI PLAN FITNESS PRO 🏋️‍♂️</h1>
                <p style="color: #64748b; margin: 5px 0 0 0;">Tu guía personalizada de entrenamiento y macros</p>
            </div>

            <h2>📊 Tus Objetivos Nutricionales</h2>
            <table>
                <thead>
                    <tr>
                        <th>🔥 Calorías</th>
                        <th>🍞 Carbohidratos</th>
                        <th>🍗 Proteínas</th>
                        <th>🥑 Grasas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${kcal} kcal</td>
                        <td>${carbos}g</td>
                        <td>${proteinas}g</td>
                        <td>${grasas}g</td>
                    </tr>
                </tbody>
            </table>

            <h2>🛒 Fuentes Recomendadas</h2>
            <div class="box">${comidas}</div>

            <h2>💪 Rutina Semanal de Entrenamiento</h2>
            <div class="box" style="background-color: #f8fafc;">${rutina}</div>

            <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                Generado por GymApp Pro. ¡A entrenar duro!
            </div>
        </body>
        </html>
    `);

    ventanaImpresion.document.close();
    ventanaImpresion.focus();
    
    setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
    }, 250);
}