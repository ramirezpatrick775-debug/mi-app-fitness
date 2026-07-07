function generarPlan() {
    const peso = parseFloat(document.getElementById('peso').value);
    const sexo = document.getElementById('sexo').value;
    const nivel = document.getElementById('nivel').value;
    const obj = document.getElementById('objetivo').value;

    if (!peso) return alert("Por favor, ingresa tu peso");

    // Cálculos
    const cal = obj === 'volumen' ? (peso * 35) + 400 : (peso * 28) - 400;
    const proteina = Math.round(peso * 2.2);
    document.getElementById('r-cal').innerText = Math.round(cal) + " kcal";

    // Formato de ejercicios (Añade Drop-set para nivel avanzado)
    const series = (ejercicio) => (nivel === 'avanzado') ? `${ejercicio} (4x12-15 + Drop-set)` : `${ejercicio} (3x12-15)`;

    let rutinaHTML = "<h4>📅 Rutina Semanal (12-15 Repeticiones):</h4>";

    if (sexo === 'masculino') {
        rutinaHTML += `
            <div class='day'><b>Lunes (Pecho/Bi/Tri/Hom):</b> ${series("Press Banca")}, ${series("Press Inclinado")}, ${series("Aperturas")}, ${series("Curl Barra")}, ${series("Curl Martillo")}, ${series("Ext. Polea")}, ${series("Copa Tríceps")}, ${series("Press Militar")}, ${series("Elev. Laterales")}, ${series("Elev. Frontales")}</div>
            <div class='day'><b>Martes (Pierna):</b> ${series("Sentadilla")}, ${series("Prensa")}, ${series("Peso Muerto Rumano")}, ${series("Curl Femoral")}, ${series("Elev. Talones")}, ${series("Gemelo sentado")}, ${series("Hip Thrust")}, ${series("Patada Glúteo")}</div>
            <div class='day'><b>Miércoles (Espalda/Bi/Tri/Trap):</b> ${series("Dominadas")}, ${series("Remo Barra")}, ${series("Jalón Pecho")}, ${series("Curl Scott")}, ${series("Curl Polea")}, ${series("Press Francés")}, ${series("Ext. Polea")}, ${series("Encogimientos Barra")}, ${series("Encogimientos Manc.")}</div>
            <div class='day'><b>Jueves (Pierna Completa):</b> ${series("Sentadilla")} (x2), ${series("Prensa")} (x2), ${series("Curl Femoral")} (x2), ${series("Ext. Cuádriceps")} (x2)</div>
            <div class='day'><b>Viernes (Pecho/Espalda/Bi/Tri/Ante):</b> ${series("Press Plano")}, ${series("Press Inclinado")}, ${series("Cruces polea")}, ${series("Remo Manc.")}, ${series("Remo Gironda")}, ${series("Curl Barra")}, ${series("Curl Invertido")}, ${series("Press Francés")}, ${series("Tríceps Polea")}, ${series("Flexión Muñeca")} (x2)</div>
        `;
    } else {
        rutinaHTML += `
            <div class='day'><b>Lunes (Glúteo/Femoral):</b> ${series("Hip Thrust")}, ${series("Puente Glúteo")}, ${series("Patada Polea")}, ${series("Peso Muerto Rumano")}, ${series("Curl Femoral")}, ${series("Curl Femoral sentado")}</div>
            <div class='day'><b>Martes (Cuádriceps/Aductor):</b> ${series("Sentadilla Goblet")}, ${series("Prensa")}, ${series("Zancadas")}, ${series("Aductor Máquina")} (x3)</div>
            <div class='day'><b>Miércoles (Espalda/Tríceps/Bíceps):</b> ${series("Jalón al pecho")}, ${series("Remo Polea")}, ${series("Remo Manc.")}, ${series("Ext. Polea")}, ${series("Copa Tríceps")}, ${series("Press Francés")}, ${series("Curl Barra")}, ${series("Curl Martillo")}, ${series("Curl Scott")}</div>
            <div class='day'><b>Jueves (Glúteo/Femoral/Pantorrilla):</b> ${series("Hip Thrust")}, ${series("Sentadilla Búlgara")}, ${series("Glúteo en polea")}, ${series("Peso Muerto Rumano")}, ${series("Curl Femoral")}, ${series("Curl Femoral sentado")}, ${series("Elev. Talones")}</div>
            <div class='day'><b>Viernes (Pecho/Bíceps/Tríceps/Hombro):</b> ${series("Press Manc.")}, ${series("Aperturas")}, ${series("Flexiones")}, ${series("Curl Barra")}, ${series("Curl Martillo")}, ${series("Ext. Polea")}, ${series("Copa Tríceps")}, ${series("Press Militar")}, ${series("Elev. Laterales")}, ${series("Elev. Frontales")}</div>
        `;
    }

    // Dieta
    const dietaHTML = `
        <h4>🥗 Plan de Alimentación Diario:</h4>
        <div class='day'><b>Desayuno:</b> 3 claras + 1 huevo entero + 50g avena.</div>
        <div class='day'><b>Media Mañana:</b> 1 fruta + 15 almendras.</div>
        <div class='day'><b>Almuerzo:</b> 150g proteína (pollo/pescado) + 100g carbohidrato (arroz/papa) + vegetales verdes.</div>
        <div class='day'><b>Merienda:</b> Proteína en polvo o yogurt griego.</div>
        <div class='day'><b>Cena:</b> 150g proteína (pescado/carne magra) + vegetales al vapor.</div>
        <p>Proteína meta diaria: <b>${proteina}g</b>.</p>
    `;

    document.getElementById('r-rutina').innerHTML = rutinaHTML;
    document.getElementById('r-dieta').innerHTML = dietaHTML;
    document.getElementById('res').style.display = 'block';
    document.getElementById('res').scrollIntoView({ behavior: 'smooth' });
}

function descargarPlanPDF() {
    const element = document.querySelector('.container');
    const botonDescarga = document.querySelector('button[onclick="descargarPlanPDF()"]');
    
    // 1. Ocultamos el botón visualmente para que no salga en la captura
    botonDescarga.style.display = 'none';

    const opt = {
        margin: [5, 5, 5, 5],
        filename: 'Mi_Plan_Gym_Pro.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 2, 
            logging: false, 
            windowWidth: document.body.scrollWidth 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 2. Generamos el PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // 3. Volvemos a mostrar el botón después de generar
        botonDescarga.style.display = 'block';
    });
}