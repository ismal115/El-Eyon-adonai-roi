    document.addEventListener('DOMContentLoaded', function() {
    const provinces = document.querySelectorAll('#rd-map-interactive path');
    const tooltip = document.getElementById('province-info');
    
    const provinceData = {
    'DO-01': { // Distrito Nacional
        name: 'Distrito Nacional',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Reforestación, sensibilización sobre valores cristianos, talleres de salud y emprendimiento'
    },
    'DO-02': { // Azua
        name: 'Azua',
        status: 'gray',
        year: 2026,
        phase: 'Fase 3',
        activities: 'Talleres educativos, programas de prevención de violencia y apoyo a personas con discapacidad'
    },
    'DO-03': { // Baoruco
        name: 'Baoruco',
        status: 'gray',
        year: 2027,
        phase: 'Fase 4',
        activities: 'Distribución de alimentos, reforestación, programas educativos'
    },
    'DO-04': { // Barahona
        name: 'Barahona',
        status: 'gray',
        year: 2026,
        phase: 'Fase 3',
        activities: 'Talleres educativos, programas de prevención de violencia'
    },
    'DO-05': { // Dajabón
        name: 'Dajabón',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Talleres de agricultura sostenible, capacitación técnica'
    },
    'DO-06': { // Duarte
        name: 'Duarte',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Operativos médicos, construcción de pozos de agua, talleres vocacionales'
    },
    'DO-07': { // Elías Piña
        name: 'Elías Piña',
        status: 'gray',
        year: 2027,
        phase: 'Fase 4',
        activities: 'Programas de nutrición, infraestructura básica'
    },
    'DO-08': { // El Seibo
        name: 'El Seibo',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Campañas de salud preventiva, talleres de emprendimiento'
    },
    'DO-09': { // Espaillat
        name: 'Espaillat',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Clínicas móviles, programas de alfabetización, apoyo a pequeños negocios'
    },
    'DO-30': { // Hato Mayor
        name: 'Hato Mayor',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Talleres agrícolas, programas de conservación ambiental'
    },
    'DO-10': { // Independencia
        name: 'Independencia',
        status: 'gray',
        year: 2027,
        phase: 'Fase 4',
        activities: 'Proyectos de agua potable, capacitación en oficios'
    },
    'DO-11': { // La Altagracia
        name: 'La Altagracia',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Turismo comunitario, talleres de artesanía'
    },
    'DO-12': { // La Romana
        name: 'La Romana',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Programas educativos, apoyo a microempresas'
    },
    'DO-13': { // La Vega
        name: 'La Vega',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Ferias de salud, talleres tecnológicos, apoyo agrícola'
    },
    'DO-14': { // María Trinidad Sánchez
        name: 'María Trinidad Sánchez',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Proyectos pesqueros, capacitación turística'
    },
    'DO-15': { // Monte Cristi
        name: 'Monte Cristi',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Programas de desarrollo costero, preservación ecológica'
    },
    'DO-16': { // Pedernales
        name: 'Pedernales',
        status: 'gray',
        year: 2027,
        phase: 'Fase 4',
        activities: 'Infraestructura comunitaria, programas de sostenibilidad'
    },
    'DO-17': { // Peravia
        name: 'Peravia',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Talleres de desarrollo personal, proyectos agrícolas'
    },
    'DO-18': { // Puerto Plata
        name: 'Puerto Plata',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Turismo solidario, programas juveniles, capacitación hotelera'
    },
    'DO-19': { // Hermanas Mirabal
        name: 'Hermanas Mirabal',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Proyectos educativos, preservación cultural'
    },
    'DO-20': { // Samaná
        name: 'Samaná',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Ecoturismo, programas de conservación marina'
    },
    'DO-21': { // San Cristóbal
        name: 'San Cristóbal',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Talleres industriales, programas comunitarios, apoyo a PYMES'
    },
    'DO-31': { // San José de Ocoa
        name: 'San José de Ocoa',
        status: 'gray',
        year: 2026,
        phase: 'Fase 3',
        activities: 'Agricultura orgánica, turismo de montaña'
    },
    'DO-22': { // San Juan
        name: 'San Juan',
        status: 'gray',
        year: 2026,
        phase: 'Fase 3',
        activities: 'Proyectos agropecuarios, artesanías locales'
    },
    'DO-23': { // San Pedro de Macorís
        name: 'San Pedro de Macorís',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Programas deportivos juveniles, capacitación técnica'
    },
    'DO-24': { // Sánchez Ramírez
        name: 'Sánchez Ramírez',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Minería responsable, proyectos educativos'
    },
    'DO-25': { // Santiago
        name: 'Santiago',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Centros tecnológicos, programas de empleo, ferias industriales'
    },
    'DO-26': { // Santiago Rodríguez
        name: 'Santiago Rodríguez',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Agricultura sostenible, proyectos ganaderos'
    },
    'DO-27': { // Valverde
        name: 'Valverde',
        status: 'gray',
        year: 2026,
        phase: 'Fase 2',
        activities: 'Proyectos agroindustriales, capacitación técnica'
    },
    'DO-28': { // Monseñor Nouel
        name: 'Monseñor Nouel',
        status: 'gray',
        year: 2026,
        phase: 'Fase 3',
        activities: 'Programas minero-ambientales, talleres vocacionales'
    },
    'DO-29': { // Monte Plata
        name: 'Monte Plata',
        status: 'orange',
        year: 2025,
        phase: 'Fase 1',
        activities: 'Proyectos agroforestales, educación ambiental'
    },
    'DO-32': { // Santo Domingo
        name: 'Santo Domingo',
        status: 'red',
        year: 2024,
        phase: 'Fase 1',
        activities: 'Programas urbanos, capacitación tecnológica, apoyo a emprendedores'
    }
    };
    
    provinces.forEach(province => {
        // Aplicar clase de color inicial
        const provinceId = province.id;
        if(provinceData[provinceId]) {
        province.classList.add(provinceData[provinceId].status);
        }
        
        // Evento Mouse Enter
        province.addEventListener('mouseenter', function(e) {
        const provinceId = this.id;
        const data = provinceData[provinceId];
        
        if(data) {
            // Posicionamiento preciso
            const svgRect = document.getElementById('rd-map-interactive').getBoundingClientRect();
            const pathRect = this.getBoundingClientRect();
            
            // Calcular posición central
            const x = pathRect.left - svgRect.left + (pathRect.width / 2);
            const y = pathRect.top - svgRect.top;
            
            // Contenido del tooltip
            tooltip.innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Estado:</strong> ${getStatusName(data.status)}</p>
            <p><strong>Año:</strong> ${data.year}</p>
            <p><strong>Actividades:</strong> ${data.activities}</p>
            `;
            
            // Posicionamiento
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
            tooltip.style.display = 'block';
        }
        });
        
        // Evento Mouse Leave
        province.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
        });
    });
    document.querySelectorAll('#rd-map-interactive path').forEach(province => {
  province.addEventListener('mouseenter', function(e) {
    const provinceId = this.id;
    const data = provinceData[provinceId];
    
    if(data) {
      const tooltip = document.getElementById('province-info');
      const svgRect = document.getElementById('rd-map-interactive').getBoundingClientRect();
      const pathRect = this.getBoundingClientRect();
      
      // Posición relativa al viewport
      const x = pathRect.left - svgRect.left + (pathRect.width / 2);
      const y = pathRect.top - svgRect.top;
      
      // Contenido del tooltip
      tooltip.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Estado:</strong> ${getStatusName(data.status)}</p>
        <p><strong>Año:</strong> ${data.year}</p>
        <p><strong>Actividades:</strong> ${data.activities}</p>
      `;
      
      // Posicionamiento responsive
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y + 20}px`; // Offset para no cubrir la provincia
      tooltip.style.display = 'block';
      
      // Ajuste para bordes en móviles
      const tooltipRect = tooltip.getBoundingClientRect();
      const overflowRight = tooltipRect.right - window.innerWidth;
      
      if(overflowRight > 0) {
        tooltip.style.left = `${x - overflowRight - 10}px`;
      }
    }
  });
  
  province.addEventListener('mouseleave', function() {
    document.getElementById('province-info').style.display = 'none';
  });
});
    // Función auxiliar para nombres de estado
    function getStatusName(status) {
        const statusMap = {
        'gray': 'No visitada',
        'brown': 'Visitada',
        'orange': 'En acción',
        'red': 'Funcional'
        };
        return statusMap[status] || 'No definido';
    }
});