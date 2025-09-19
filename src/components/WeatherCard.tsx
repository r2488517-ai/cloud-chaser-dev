import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow, Thermometer, Droplets, Wind, Eye } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
}

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className="w-16 h-16 text-primary" />;
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className="w-16 h-16 text-muted-foreground" />;
  } else if (conditionLower.includes('snow')) {
    return <CloudSnow className="w-16 h-16 text-primary" />;
  } else {
    return <Sun className="w-16 h-16 text-accent" />;
  }
};

const getBackgroundGradient = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'bg-gradient-rainy';
  } else if (conditionLower.includes('cloud')) {
    return 'bg-gradient-cloudy';
  } else if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
    return 'bg-gradient-sunny';
  } else {
    return 'bg-gradient-default';
  }
};

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className={`p-8 text-white border-glass backdrop-blur-glass shadow-weather ${getBackgroundGradient(weather.condition)} transition-all duration-500 hover:scale-105`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{weather.location}</h2>
        <div className="flex items-center justify-center mb-4">
          {getWeatherIcon(weather.condition)}
        </div>
        <div className="text-5xl font-bold mb-2">{Math.round(weather.temperature)}°C</div>
        <p className="text-lg opacity-90 capitalize">{weather.description}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 bg-glass border border-glass rounded-lg p-3 backdrop-blur-glass">
          <Droplets className="w-5 h-5" />
          <div>
            <p className="text-sm opacity-75">Humidity</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-glass border border-glass rounded-lg p-3 backdrop-blur-glass">
          <Wind className="w-5 h-5" />
          <div>
            <p className="text-sm opacity-75">Wind Speed</p>
            <p className="font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-glass border border-glass rounded-lg p-3 backdrop-blur-glass">
          <Eye className="w-5 h-5" />
          <div>
            <p className="text-sm opacity-75">Visibility</p>
            <p className="font-semibold">{weather.visibility} km</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-glass border border-glass rounded-lg p-3 backdrop-blur-glass">
          <Thermometer className="w-5 h-5" />
          <div>
            <p className="text-sm opacity-75">Feels like</p>
            <p className="font-semibold">{Math.round(weather.temperature + Math.random() * 4 - 2)}°C</p>
          </div>
        </div>
      </div>
    </Card>
  );
};