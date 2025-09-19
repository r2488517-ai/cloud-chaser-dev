import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";

interface ForecastDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const getWeatherIcon = (condition: string, size: string = "w-8 h-8") => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className={`${size} text-primary`} />;
  } else if (conditionLower.includes('cloud')) {
    return <Cloud className={`${size} text-muted-foreground`} />;
  } else if (conditionLower.includes('snow')) {
    return <CloudSnow className={`${size} text-primary`} />;
  } else {
    return <Sun className={`${size} text-accent`} />;
  }
};

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur-glass border-glass shadow-soft">
      <h3 className="text-xl font-bold mb-4 text-foreground">5-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-glass border border-glass backdrop-blur-glass hover:bg-glass/50 transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              {getWeatherIcon(day.condition)}
              <div>
                <p className="font-semibold text-foreground">{day.day}</p>
                <p className="text-sm text-muted-foreground capitalize">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-foreground">{Math.round(day.high)}°</span>
                <span className="text-muted-foreground">{Math.round(day.low)}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};