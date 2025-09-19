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
    <Card className="weather-card border-0">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          5-Day Forecast
        </h3>
        <div className="space-y-1">
          {forecast.map((day, index) => {
            const IconComponent = getWeatherIcon(day.condition);
            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="weather-icon group-hover:scale-110 transition-transform duration-200">
                    {IconComponent}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{day.day}</p>
                    <p className="text-sm text-muted-foreground capitalize">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">{day.high}°</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-lg text-muted-foreground">{day.low}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};