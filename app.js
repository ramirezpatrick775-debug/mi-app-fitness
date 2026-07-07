function descargarPlanPDF() {
    // 1. Validamos que haya datos calculados previamente
    const kcal = document.getElementById('res-calorias').innerText;
    if (!kcal || kcal === "0" || kcal === "") {
        alert("Primero debes calcular tu plan ingresando tus datos.");
        return;
    }

    const carbos = document.getElementById('res-carbos').innerText;
    const proteinas = document.getElementById('res-proteinas').innerText;
    const grasas = document.getElementById('res-grasas').innerText;
    const comidas = document.getElementById('res-comidas').innerHTML;
    const rutina = document.getElementById('res-rutina').innerHTML;

    // 2. Creamos el contenedor temporal, pero lo insertamos invisible temporalmente en el cuerpo del documento
    // Esto es crucial para que los navegadores móviles permitan procesar los elementos
    const plantillaPDF = document.createElement('div');
    plantillaPDF.id = 'temp-pdf-container';
    plantillaPDF.style.padding = '25px';
    plantillaPDF.style.fontFamily = 'Arial, sans-serif';
    plantillaPDF.style.color = '#333333';
    plantillaPDF.style.backgroundColor = '#ffffff';
    plantillaPDF.style.position = 'absolute';
    plantillaPDF.style.left = '-9999px'; // Lo mantiene oculto al usuario de forma segura
    plantillaPDF.style.width = '700px';  // Ancho fijo estándar para evitar roturas de diseño en pantallas pequeñas de celular

    // Limpiamos posibles botones o interfaces web dentro del bloque para el documento impreso
    let rutinaLimpia = rutina.replace(/<button[^>]*>([\s\S]*?)<\/button>/gi, '');
    rutinaLimpia = rutinaLimpia.replace(/id="bloque-premium-web"/gi, 'style="border: 1px solid #f5c6cb; padding: 12px; border-radius: 6px; background-color: #f8d7da; color: #721c24;"');

    plantillaPDF.innerHTML = `
        <div style="text-align: center; border-bottom: 3px solid #22c55e; padding-bottom: 12px; margin-bottom: 25px;">
            <h1 style="margin: 0; font-size: 24px; color: #111827;">🏋️‍♂️ MI PLAN FITNESS PRO 🏋️‍♂️</h1>
            <p style="margin: 6px 0 0 0; color: #22c55e; font-size: 13px; font-weight: bold; letter-spacing: 1px;">Resultados y Disciplina</p>
        </div>

        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #22c55e; margin-top: 0; margin-bottom: 10px; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">📊 Macronutrientes Diarios</h3>
            <p style="margin: 5px 0; font-size: 14px;">• <strong>Calorías Objetivo:</strong> ${kcal} kcal</p>
            <p style="margin: 5px 0; font-size: 14px;">• <strong>Carbohidratos:</strong> ${carbos}g</p>
            <p style="margin: 5px 0; font-size: 14px;">• <strong>Proteínas:</strong> ${proteinas}g</p>
            <p style="margin: 5px 0; font-size: 14px;">• <strong>Grasas:</strong> ${grasas}g</p>
        </div>

        <h3 style="color: #22c55e; margin-bottom: 8px; margin-top: 25px; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">🛒 Distribución de Alimentos sugerida</h3>
        <div style="font-size: 14px; line-height: 1.5;">${comidas}</div>

        <h3 style="color: #22c55e; margin-bottom: 8px; margin-top: 25px; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">💪 Rutina de Entrenamiento Planificada</h3>
        <div style="font-size: 14px; line-height: 1.5;">${rutinaLimpia}</div>

        <div style="text-align: center; margin-top: 40px; padding-top: 15px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 11px;">
            Plan generado de forma personalizada. Prohibida su distribución masiva.
        </div>
    `;

    document.body.appendChild(plantillaPDF);

    // 3. Configuración avanzada optimizada para móviles
    const opciones = {
        margin:         10,
        filename:       'Mi_Plan_Fitness.pdf',
        image:          { type: 'jpeg', quality: 0.95 },
        html2canvas:    { 
            scale: 2,             // Balance ideal entre nitidez y rendimiento en celulares
            useCORS: true,        // Permite procesar estilos externos si los hubiera
            logging: false,
            letterRendering: true
        },
        jsPDF:          { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 4. Ejecución del renderizado y posterior limpieza del DOM
    html2pdf().set(opciones).from(plantillaPDF).save()
    .then(() => {
        // Removemos el contenedor del documento una vez se complete la descarga de forma exitosa
        const elementoCreado = document.getElementById('temp-pdf-container');
        if (elementoCreado) {
            elementoCreado.remove();
        }
    })
    .catch((error) => {
        console.error("Error generando el PDF:", error);
        alert("Hubo un percance al generar el archivo en este dispositivo. Inténtalo desde el navegador nativo (Chrome o Safari).");
        
        // Limpieza de seguridad en caso de fallo
        const elementoCreado = document.getElementById('temp-pdf-container');
        if (elementoCreado) {
            elementoCreado.remove();
        }
    });
}