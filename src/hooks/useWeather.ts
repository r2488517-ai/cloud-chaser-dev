import { useState } from "react";
import { toast } from "sonner";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  icon: string;
}

interface ForecastDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

const API_KEY = "YOUR_API_KEY"; // Users will need to add their OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    
    try {
      // For demo purposes, we'll use mock data
      // In a real app, you'd uncomment the API calls below and add your API key
      
      // Mock data for demonstration
      const conditions = [
        { condition: "sunny", temp: 25, humidity: 45, wind: 8, visibility: 15 },
        { condition: "cloudy", temp: 18, humidity: 65, wind: 12, visibility: 8 },
        { condition: "rainy", temp: 15, humidity: 85, wind: 15, visibility: 5 },
        { condition: "clear", temp: 22, humidity: 50, wind: 6, visibility: 20 }
      ];
      
      const selectedCondition = conditions[Math.floor(Math.random() * conditions.length)];
      
      const mockWeatherData: WeatherData = {
        location: location.includes(',') ? 'Current Location' : location.charAt(0).toUpperCase() + location.slice(1),
        temperature: selectedCondition.temp + Math.floor(Math.random() * 10) - 5,
        condition: selectedCondition.condition,
        humidity: selectedCondition.humidity + Math.floor(Math.random() * 20) - 10,
        windSpeed: selectedCondition.wind + Math.floor(Math.random() * 8) - 4,
        visibility: selectedCondition.visibility + Math.floor(Math.random() * 6) - 3,
        feelsLike: selectedCondition.temp + Math.floor(Math.random() * 6) - 3,
        icon: '01d'
      };

      const mockForecastData: ForecastDay[] = Array.from({ length: 5 }, (_, i) => {
        const futureCondition = conditions[Math.floor(Math.random() * conditions.length)];
        return {
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          day: i === 0 ? 'Today' : new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          high: futureCondition.temp + Math.floor(Math.random() * 8),
          low: futureCondition.temp - Math.floor(Math.random() * 8) - 5,
          condition: futureCondition.condition,
          icon: '01d'
        };
      });

      setWeather(mockWeatherData);
      setForecast(mockForecastData);
      
      toast.success(`Weather data loaded for ${mockWeatherData.location}`);

      /* 
      // Real API implementation (uncomment and add your API key):
      
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Weather data not found');
      }
      
      const weatherData = await weatherResponse.json();
      
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      
      const forecastData = await forecastResponse.json();
      
      setWeather({
        location: weatherData.name,
        temperature: weatherData.main.temp,
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(weatherData.visibility / 1000), // Convert m to km
        icon: weatherData.weather[0].icon
      });
      
      const forecast = forecastData.list
        .filter((item: any, index: number) => index % 8 === 0) // Every 8th item (24 hours)
        .slice(0, 5)
        .map((item: any) => ({
          date: item.dt_txt,
          day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          condition: item.weather[0].main,
          icon: item.weather[0].icon
        }));
      
      setForecast(forecast);
      */
      
    } catch (error) {
      toast.error('Failed to fetch weather data. Please check the location and try again.');
      console.error('Weather fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    fetchWeather
  };
};