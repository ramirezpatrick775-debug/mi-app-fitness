/* ==========================================
   1. ESTILOS GENERALES DE LA APLICACIÓN (WEB)
   ========================================== */
body {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #0f172a; /* Fondo oscuro Cyberpunk / Gym */
    color: #f8fafc;
    margin: 0;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.contenedor {
    background-color: #1e293b;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 550px;
    border: 1px solid #334155;
}

h1 {
    text-align: center;
    color: #ffffff;
    margin-top: 0;
    margin-bottom: 25px;
    font-size: 24px;
    letter-spacing: 0.5px;
}

.grupo-input {
    margin-bottom: 18px;
}

label {
    display: block;
    margin-bottom: 6px;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
}

input[type="number"], select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #475569;
    border-radius: 6px;
    background-color: #0f172a;
    color: #ffffff;
    font-size: 15px;
    box-sizing: border-box;
    transition: border-color 0.2s;
}

input[type="number"]:focus, select:focus {
    outline: none;
    border-color: #22c55e;
}

/* Botón de calcular en la web */
.btn-calcular {
    width: 100%;
    padding: 12px;
    background-color: #22c55e;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 10px;
}

.btn-calcular:hover {
    background-color: #16a34a;
}

/* ==========================================
   2. SECCIÓN DE RESULTADOS (WEB)
   ========================================== */
#resultados {
    margin-top: 30px;
    border-top: 2px solid #334155;
    padding-top: 20px;
}

.subtitulo-seccion {
    color: #22c55e;
    font-size: 18px;
    text-transform: uppercase;
    margin-top: 20px;
    margin-bottom: 12px;
    border-left: 4px solid #22c55e;
    padding-left: 8px;
}

.cuadro-macros {
    background-color: #0f172a;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #334155;
    font-size: 15px;
    line-height: 1.6;
}

.cuadro-macros p {
    margin: 6px 0;
}

/* Contenedores de listas de comidas y días */
#res-comidas ul {
    margin: 0;
    padding-left: 20px;
}

#res-comidas li {
    margin-bottom: 8px;
    color: #cbd5e1;
}

.dia-entrenamiento {
    background-color: #0f172a;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 10px;
    border: 1px solid #334155;
    color: #cbd5e1;
}

/* ===================================================
   3. REGLAS IMPRESCINDIBLES DE IMPRESIÓN (PARA EL PDF)
   =================================================== */
@media print {
    /* Ocultamos absolutamente todos los elementos del navegador web */
    body, html {
        background: #ffffff !important;
        color: #111827 !important;
    }

    body * {
        visibility: hidden;
    }
    
    /* Hacemos que de manera estricta SOLO la sección de resultados aparezca en el PDF */
    #resultados, #resultados * {
        visibility: visible;
    }
    
    #resultados {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background-color: #ffffff !important;
        color: #111827 !important;
        padding: 0;
        margin: 0;
    }

    /* ELIMINACIÓN DE LA PUBLICIDAD DE VIDEOS PREMIUM Y BOTONES WEB EN EL PDF */
    #bloque-premium-web, 
    .ocultar-en-pdf, 
    button, 
    .btn-calcular {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    /* Rediseño elegante en Blanco y Negro/Verde para el Reporte PDF */
    .subtitulo-seccion {
        color: #16a34a !important;
        border-left: 4px solid #16a34a !important;
        font-size: 16px;
        margin-top: 25px;
        page-break-after: avoid; /* Evita que el título quede solo al final de una hoja */
    }

    .cuadro-macros, .dia-entrenamiento {
        background-color: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
        color: #111827 !important;
        padding: 12px;
    }

    #res-comidas li, .dia-entrenamiento {
        color: #111827 !important;
    }
}