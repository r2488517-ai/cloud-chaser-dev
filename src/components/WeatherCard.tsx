import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow, Thermometer, Droplets, Wind, Eye } from "lucide-react";

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
  const IconComponent = getWeatherIcon(weather.condition);
  const gradientClass = getBackgroundGradient(weather.condition);

  return (
    <Card className="weather-card border-0 overflow-hidden group hover:shadow-weather transition-all duration-500">
      <div className={`${gradientClass} p-8 text-white relative`}>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{weather.location}</h2>
              <p className="text-white/90 text-lg capitalize font-medium">{weather.condition}</p>
              <p className="text-white/70 text-sm">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="weather-icon group-hover:scale-110 transition-transform duration-300">
              {IconComponent}
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-7xl md:text-8xl font-thin tracking-tight">{weather.temperature}</span>
              <span className="text-3xl font-light text-white/80">°C</span>
            </div>
            <p className="text-white/70 mt-2">Feels like {weather.feelsLike}°C</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <Droplets className="w-6 h-6 mx-auto text-white/80" />
              <p className="text-sm text-white/70 font-medium">Humidity</p>
              <p className="text-xl font-semibold">{weather.humidity}%</p>
            </div>
            <div className="text-center space-y-2">
              <Wind className="w-6 h-6 mx-auto text-white/80" />
              <p className="text-sm text-white/70 font-medium">Wind Speed</p>
              <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
            </div>
            <div className="text-center space-y-2 md:col-span-1 col-span-2">
              <Eye className="w-6 h-6 mx-auto text-white/80" />
              <p className="text-sm text-white/70 font-medium">Visibility</p>
              <p className="text-xl font-semibold">{weather.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};