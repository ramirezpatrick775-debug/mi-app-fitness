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

    if (!peso || !altura || !edad) { alert("Completa todos los campos"); return; }

    // Cálculos simples
    const geb = (sexo === 'masculino') ? (10*peso + 6.25*altura - 5*edad + 5) : (10*peso + 6.25*altura - 5*edad - 161);
    const cal = (objetivo === 'deficit') ? geb * 1.2 : geb * 1.6;
    
    document.getElementById('res-calorias').innerText = Math.round(cal);
    document.getElementById('res-carbos').innerText = Math.round((cal * 0.5) / 4);
    document.getElementById('res-proteinas').innerText = Math.round(peso * 2);
    
    document.getElementById('res-rutina').innerHTML = `
        <div class="dia-entrenamiento"><strong>LUNES:</strong> Pecho y Tríceps - Press Banca 4x10, Fondos 3x12</div>
        <div class="dia-entrenamiento"><strong>MARTES:</strong> Pierna Completa - Sentadilla 4x8, Prensa 3x12</div>
        <div class="dia-entrenamiento"><strong>MIÉRCOLES:</strong> Espalda y Bíceps - Dominadas 4x10, Curl Barra 3x12</div>
    `;
    document.getElementById('resultados').style.display = 'block';
}

function descargarPlanPDF() {
    const element = document.getElementById('resultados');
    const opt = {
        margin:       10,
        filename:     'MiPlanFitness.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}