function generarPlan() {
    const peso = parseFloat(document.getElementById('peso').value);
    const sexo = document.getElementById('sexo').value;
    const nivel = document.getElementById('nivel').value;
    const obj = document.getElementById('objetivo').value;

    if (!peso) return alert("Por favor, ingresa tu peso");

    // 1. Cálculos de Nutrición
    const cal = obj === 'volumen' ? (peso * 35) + 400 : (peso * 28) - 400;
    const proteina = Math.round(peso * 2.2);
    
    document.getElementById('r-cal').innerText = Math.round(cal) + " kcal";

    // 2. Rutina Semanal (Adaptada por nivel y sexo)
    let rutinas = {
        masculino: {
            principiante: "Lunes: FullBody (3x10), Miércoles: FullBody (3x10), Viernes: FullBody (3x10). Enfoque: Técnica básica.",
            intermedio: "Lunes: Empuje (4x10), Martes: Tracción (4x10), Jueves: Pierna (4x10), Viernes: Torso/Brazo (3x12).",
            avanzado: "Lunes: Pecho/Hombro (Drop-sets), Martes: Espalda/Bíceps (Drop-sets), Jueves: Pierna (Alta carga), Viernes: Full Body (Alta intensidad)."
        },
        femenino: {
            principiante: "Lunes: Glúteo/Pierna (3x12), Miércoles: Tren Superior (3x12), Viernes: Glúteo/Core (3x12).",
            intermedio: "Lunes: Glúteo (4x10), Martes: Espalda/Hombro (3x12), Jueves: Pierna completa (4x10), Sábado: Glúteo/Abdomen (4x15).",
            avanzado: "Lunes: Glúteo Pro (Drop-sets), Martes: Espalda/Brazos (4x12), Jueves: Cuádriceps/Femoral (Drop-sets), Viernes: Glúteo/Core (Alta intensidad)."
        }
    };

    // 3. Dieta Semanal Estructurada
    let estructuraDieta = `
        <div class='day'><b>Desayuno:</b> 3 claras + 1 huevo entero + 50g avena.</div>
        <div class='day'><b>Media Mañana:</b> 1 fruta + 15 almendras.</div>
        <div class='day'><b>Almuerzo:</b> 150g proteína (pollo/pescado) + 100g carbohidrato (arroz/papa) + vegetales verdes.</div>
        <div class='day'><b>Merienda:</b> Proteína en polvo o yogurt griego.</div>
        <div class='day'><b>Cena:</b> 150g proteína (pescado/carne magra) + vegetales al vapor.</div>
    `;

    document.getElementById('r-rutina').innerHTML = `<h4>📅 Rutina Semanal:</h4><div class='day'>${rutinas[sexo][nivel]}</div>`;
    document.getElementById('r-dieta').innerHTML = `<h4>🥗 Plan de Comidas Diario:</h4>${estructuraDieta}<p>Proteína meta diaria: <b>${proteina}g</b>.</p>`;
    
    document.getElementById('res').style.display = 'block';
    document.getElementById('res').scrollIntoView({ behavior: 'smooth' });
}