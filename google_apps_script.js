/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT
 * ----------------------------------------------------
 * Restaurante: El Pollón de Manchester
 * Función: Recibir datos de Fidelización (Cumpleaños) y Reseñas desde la web
 * 
 * INSTRUCCIONES:
 * 1. En tu hoja de cálculo de Google Sheets, ve a: Extensiones > Apps Script.
 * 2. Borra todo el código que haya y pega este contenido completo.
 * 3. Si quieres que se creen y configuren los encabezados automáticamente, selecciona
 *    la función 'inicializarHojas' arriba y haz clic en 'Ejecutar'.
 * 4. Luego haz clic en el botón azul "Implementar" (arriba a la derecha) > "Nueva implementación".
 * 5. En tipo de implementación, elige el icono de engranaje ⚙️ > "Aplicación web".
 * 6. Configuración obligatoria:
 *    - Descripción: API Pollón
 *    - Ejecutar como: Yo (tu correo)
 *    - Quién tiene acceso: Cualquier persona (Anyone) [MUY IMPORTANTE]
 * 7. Haz clic en "Implementar", autoriza los permisos y COPIA la "URL de la aplicación web".
 * 8. Pega esa URL en WEB_APP_URL en tu archivo src/services/googleSheets.ts.
 */

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'API de Google Apps Script activa y funcionando correctamente para El Pollón de Manchester.'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Espera hasta 10 segundos para evitar colisiones si varios usuarios envían al mismo tiempo
  lock.tryLock(10000);

  try {
    var rawData = e.postData.contents;
    var payload = JSON.parse(rawData);
    var targetSheet = (payload.sheetName || '').trim();
    var data = payload.data || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Normalizar nombres de hojas para aceptar 'Fidelización', 'Fidelizacion', 'Cumpleaños', 'Reseñas', etc.
    var isBirthday = targetSheet.toLowerCase().includes('fideliz') || targetSheet.toLowerCase().includes('cumple');
    var isReview = targetSheet.toLowerCase().includes('rese') || targetSheet.toLowerCase().includes('review');

    if (isBirthday) {
      // Buscar hoja existente que coincida o crear 'Fidelización'
      var sheet = getOrCreateSheet(ss, ['Fidelización', 'Fidelizacion', 'Cumpleaños', 'Cumpleanos'], 'Fidelización');
      ensureHeaders(sheet, [
        'Fecha y Hora',
        'Nombre Completo',
        'Teléfono / WhatsApp',
        'Fecha de Cumpleaños',
        'Distrito',
        'Correo Electrónico'
      ]);

      sheet.appendRow([
        data.timestamp || new Date().toLocaleString('es-PE'),
        data.nombre || '',
        "'" + (data.telefono || ''), // Prefijo ' para conservar ceros a la izquierda
        data.fechaNacimiento || '',
        data.distrito || '',
        data.correo || 'No indicado'
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Registro de fidelización guardado exitosamente.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (isReview) {
      var sheetReview = getOrCreateSheet(ss, ['Reseñas', 'Reseña', 'Resenas', 'Reviews'], 'Reseñas');
      ensureHeaders(sheetReview, [
        'Fecha y Hora',
        'Atención del Mozo (Estrellas)',
        'Sabor de la Comida (Estrellas)',
        'Comentarios'
      ]);

      sheetReview.appendRow([
        data.timestamp || new Date().toLocaleString('es-PE'),
        data.estrellasMozo || 0,
        data.estrellasComida || 0,
        data.comentario || 'Sin comentarios'
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Reseña guardada exitosamente.'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Hoja no reconocida: ' + targetSheet
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Busca una hoja por alias o la crea si no existe
 */
function getOrCreateSheet(ss, aliases, defaultName) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var name = sheets[i].getName().trim().toLowerCase();
    for (var j = 0; j < aliases.length; j++) {
      if (name === aliases[j].trim().toLowerCase()) {
        return sheets[i];
      }
    }
  }
  // Si no existe, crear con defaultName
  return ss.insertSheet(defaultName);
}

/**
 * Asegura que la primera fila contenga los encabezados correspondientes
 */
function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#F59E0B'); // Color naranja ámbar Manchester
    headerRange.setFontColor('#000000');
    sheet.setFrozenRows(1);
  }
}

/**
 * Función auxiliar para preparar automáticamente todas las pestañas de tu Google Sheets.
 * Puedes ejecutarla manualmente una vez desde el editor de Apps Script.
 */
function inicializarHojas() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Hoja Categorías
  var catSheet = getOrCreateSheet(ss, ['Categorías', 'Categorias'], 'Categorías');
  ensureHeaders(catSheet, ['nombre', 'URL de imagen']);

  // 2. Hoja Platos
  var platosSheet = getOrCreateSheet(ss, ['Platos', 'Menu'], 'Platos');
  ensureHeaders(platosSheet, ['categoría', 'nombre del plato', 'descripción', 'precio']);

  // 3. Hoja Fidelización
  var fidSheet = getOrCreateSheet(ss, ['Fidelización', 'Fidelizacion', 'Cumpleaños'], 'Fidelización');
  ensureHeaders(fidSheet, [
    'Fecha y Hora',
    'Nombre Completo',
    'Teléfono / WhatsApp',
    'Fecha de Cumpleaños',
    'Distrito',
    'Correo Electrónico'
  ]);

  // 4. Hoja Reseñas
  var resSheet = getOrCreateSheet(ss, ['Reseñas', 'Resenas'], 'Reseñas');
  ensureHeaders(resSheet, [
    'Fecha y Hora',
    'Atención del Mozo (Estrellas)',
    'Sabor de la Comida (Estrellas)',
    'Comentarios'
  ]);

  Logger.log('¡Todas las hojas se inicializaron correctamente con sus encabezados!');
}
