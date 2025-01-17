import express from 'express';
import { locations } from './locations';

const app = express();
const port = 3000;

const normalize = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const levenshteinDistance = (cadena1: string, cadena2: string): number => {
  const longitudCadena1 = cadena1.length;
  const longitudCadena2 = cadena2.length;
  
  // Inicialización de la matriz dp
  const dp = Array.from({ length: longitudCadena1 + 1 }, (_, fila) =>
    Array.from({ length: longitudCadena2 + 1 }, (_, columna) =>
      fila === 0 ? columna : (columna === 0 ? fila : 0)
    )
  );
  
  // Rellenar la matriz dp con el cálculo de distancias
  Array.from({ length: longitudCadena1 + 1 }, (_, fila) =>
    Array.from({ length: longitudCadena2 + 1 }, (_, columna) => {
      if (fila > 0 && columna > 0) {
        const cost = cadena1[fila - 1] === cadena2[columna - 1] ? 0 : 1;
        dp[fila][columna] = Math.min(
          dp[fila - 1][columna] + 1, // Costo por eliminación
          dp[fila][columna - 1] + 1, // Costo por inserción
          dp[fila - 1][columna - 1] + cost // Costo por sustitución
        );
      }
      return dp[fila][columna];
    })
  );

  // Devuelve el costo mínimo para transformar cadena1 en cadena2
  return dp[longitudCadena1][longitudCadena2];
};

  
// Define la estructura para el resultado de la búsqueda
interface SearchResult {
    rate: number;
    city: string | null;
    name: string | null;
    type: 'CITY' | 'DISTRICT' | null;
  }  

app.get('/', (req, res) => {
    try {
      !locations?.length 
        ? res.status(404).json({ error: 'No se han encontrado ubicaciones' })
        : res.json(locations);
    } catch (error: unknown) {
      res.status(500).json({ error: 'Ha ocurrido un error interno del servidor' });
    }
  });
  

app.get('/cities', (req, res) => {
    try {
        const cities = Array.isArray(locations)
            ? locations.map(location => location.city)
            : [];
        const uniqueCities = [...new Set(cities)];
        
        return uniqueCities.length
            ? res.json(uniqueCities)
            : res.status(404).json({ error: 'No se han encontrado ciudades' });
  } catch (error: unknown) {
    console.error('Ocurrió un error:', error);
    res.status(500).json({ error: error instanceof Error ? 'Error interno del servidor' : 'Error desconocido' });
  }
});

app.get('/districts', (req, res) => {
    try {
      const districts = Array.isArray(locations)
        ? locations.map(location => location.district)
        : [];
  
      return districts.length
        ? res.json(districts)
        : res.status(404).json({ error: 'No se han encontrado distritos' });
    } catch (error: unknown) {
      console.error('Ocurrió un error:', error);
      return res.status(500).json({ error: error instanceof Error ? `Error interno del servidor: ${error.message}` : 'Error interno del servidor' });
    }
  });

app.get('/:city/districts', (req, res) => {
    try {
      const error = !Array.isArray(locations) 
        ? res.status(500).json({ error: 'Error interno del servidor: Datos de ubicaciones no disponibles' }) 
        : null;
      if (error) return error;
  
      const city = normalize(req.params.city);
  
      const districts = locations
        .filter(location => normalize(location.city) === city)
        .map(location => location.district);
  
      return districts.length
        ? res.json(districts)
        : res.status(404).json({ error: `No se han encontrado distritos para la ciudad: ${req.params.city}` });
    } catch (error: unknown) {
      console.error('Ocurrió un error:', error);
      return res.status(500).json({ error: error instanceof Error ? `Error interno del servidor: ${error.message}` : 'Error interno del servidor' });
    }
  });  
  
app.get('/:city', (req, res) => {
    try {
      const city = normalize(req.params.city);
  
      !city
        ? res.status(400).json({ error: 'El parámetro "city" es requerido' })
        : (() => {
            const units = locations
              .filter(location => normalize(location.city) === city)
              .reduce((acc, location) => acc + location.units, 0);
  
            return units > 0
              ? res.json({ city, units })
              : res.status(404).json({ error: `No se han encontrado unidades para la ciudad: ${city}` });
          })();
    } catch (error: unknown) {
      console.error('Ocurrió un error:', error);
      return res.status(500).json({
        error: error instanceof Error ? `Error interno del servidor: ${error.message}` : 'Error interno del servidor'
      });
    }
  });
  
app.get('/district/:district', (req, res) => {
    try {
      const district = normalize(req.params.district);
  
      !district
        ? res.status(400).json({ error: 'El parámetro "district" es requerido' })
        : (() => {
            const units = locations
              .filter(location => normalize(location.district) === district)
              .reduce((acc, location) => acc + location.units, 0);
  
            return units > 0
              ? res.json({ district, units })
              : res.status(404).json({ error: `No se han encontrado unidades para el distrito: ${district}` });
          })();
    } catch (error: unknown) {
      console.error('Ocurrió un error:', error);
      res.status(500).json({
        error: error instanceof Error ? `Error interno del servidor: ${error.message}` : 'Error interno del servidor'
      });
    }
  });
  
  app.get('/search/:query', (req, res) => {
    try {
      const query = normalize(req.params.query);
  
      return !query
        ? res.status(400).json({ error: 'El parámetro de búsqueda no puede estar vacío' })
        : (() => {
            // Buscar la ubicación que coincida con la ciudad o el distrito
            const bestMatch = locations
              .map(loc => {
                const cityDistance = levenshteinDistance(normalize(loc.city), query);
                const districtDistance = levenshteinDistance(normalize(loc.district), query);
                const cityRate = 1 - (cityDistance / Math.max(normalize(loc.city).length, query.length));
                const districtRate = 1 - (districtDistance / Math.max(normalize(loc.district).length, query.length));
  
                return {
                  city: loc.city,
                  district: loc.district,
                  cityRate,
                  districtRate
                };
              })
              .reduce<SearchResult>((bestMatch, match) => {
                // Preferir coincidencias de ciudad si la tasa de coincidencia de ciudad es mayor
                return match.cityRate > bestMatch.rate
                  ? {
                      rate: match.cityRate,
                      city: match.city,
                      name: match.city,
                      type: 'CITY'
                    }
                  : match.districtRate > bestMatch.rate
                  ? {
                      rate: match.districtRate,
                      city: match.city, // Aquí se asigna la ciudad correspondiente al distrito encontrado
                      name: match.district,
                      type: 'DISTRICT'
                    }
                  : bestMatch;
              }, { rate: 0, city: null, name: null, type: null });
  
            // Responder con el resultado de la búsqueda
            return bestMatch.rate > 0
              ? res.json({
                  found: true,
                  rate: bestMatch.rate,
                  city: bestMatch.city,
                  name: bestMatch.name,
                  type: bestMatch.type
                })
              : res.status(404).json({
                  found: false,
                  rate: null,
                  city: null,
                  name: null,
                  type: null,
                  error: `No se encontraron resultados para: ${req.params.query}`
                });
          })();
    } catch (error: unknown) {
      console.error('Ocurrió un error:', error);
      res.status(500).json({
        error: error instanceof Error ? `Error interno del servidor: ${error.message}` : 'Error interno del servidor'
      });
    }
  });
  


// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'URL incorrecta o no encontrada' });
  });

app.listen(port, () => console.log(`API running at http://localhost:${port}`));