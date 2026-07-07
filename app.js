function generarPlan() {
    const peso = parseFloat(document.getElementById('peso').value);
    const sexo = document.getElementById('sexo').value;
    const nivel = document.getElementById('nivel').value;
    const obj = document.getElementById('objetivo').value;

    if (!peso) return alert("Por favor, ingresa tu peso");

    // 1. Cálculo de Calorías
    const cal = obj === 'volumen' ? (peso * 35) + 400 : (peso * 28) - 400;
    document.getElementById('r-cal').innerText = Math.round(cal) + " kcal";

    // 2. Lógica de Rutinas Adaptativas
    let rutinaHTML = "<h4>📅 Tu Rutina Personalizada:</h4>";
    
    if (sexo === 'masculino') {
        if (nivel === 'principiante') {
            rutinaHTML += "<div class='day'>Full Body: Press Banca 3x10, Sentadilla 3x10, Remo 3x10 (Enfoque en técnica)</div>";
        } else if (nivel === 'intermedio') {
            rutinaHTML += "<div class='day'>Push: Press Banca 4x10, Press Inclinado 3x10, Press Militar 3x10</div>";
            rutinaHTML += "<div class='day'>Pull: Dominadas 4x8, Remo con barra 4x10, Curl Bíceps 3x12</div>";
        } else { // Avanzado
            rutinaHTML += "<div class='day'>Push (Avanzado): Press Banca 4x8 + Drop-set final, Press Inclinado 3x10 + Drop-set</div>";
            rutinaHTML += "<div class='day'>Pull (Avanzado): Peso Muerto 4x6, Remo Pendlay 4x8 + Drop-set, Dominadas lastradas 3x8</div>";
        }
    } else { // Femenino
        if (nivel === 'principiante') {
            rutinaHTML += "<div class='day'>Glúteo: Puente Glúteo 3x15, Sentadilla libre 3x12, Patada glúteo 3x12</div>";
        } else if (nivel === 'intermedio') {
            rutinaHTML += "<div class='day'>Enfoque Glúteo: Hip Thrust 4x10, Peso Muerto Rumano 4x10, Prensa 3x12</div>";
        } else { // Avanzado
            rutinaHTML += "<div class='day'>Glúteo Pro: Hip Thrust 4x8 (Pausa 2s) + Drop-set final, Sentadilla Búlgara 3x10 + Drop-set, Abductores 4x20</div>";
        }
    }

    // 3. Guía Nutricional
    let proteina = Math.round(peso * 2.2);
    let dieta = obj === 'volumen' ? "Superávit: Prioriza carbohidratos (avena, arroz) y proteína en cada comida." : "Déficit: Prioriza proteína alta, vegetales verdes y grasas saludables.";
    
    document.getElementById('r-rutina').innerHTML = rutinaHTML;
    document.getElementById('r-dieta').innerHTML = `<h4>🥗 Nutrición:</h4><p>Proteína meta: <b>${proteina}g</b>. ${dieta}</p>`;
    
    document.getElementById('res').style.display = 'block';
    document.getElementById('res').scrollIntoView({ behavior: 'smooth' });
}