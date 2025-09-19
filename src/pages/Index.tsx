import { useEffect } from "react";
import { SearchBox } from "@/components/SearchBox";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { useWeather } from "@/hooks/useWeather";
import { CloudSun, MapPin } from "lucide-react";

const Index = () => {
  const { weather, forecast, loading, fetchWeather } = useWeather();

  useEffect(() => {
    // Load default weather for London on page load
    fetchWeather("London");
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <CloudSun className="w-12 h-12 text-primary drop-shadow-lg" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              WeatherCast
            </h1>
          </div>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Beautiful weather forecasts with real-time data for any location worldwide
          </p>
        </header>

        <SearchBox onSearch={fetchWeather} loading={loading} />

        {loading && (
          <div className="text-center mb-8">
            <div className="weather-card p-8 max-w-md mx-auto">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"></div>
                <p className="text-muted-foreground font-medium">Fetching weather data...</p>
              </div>
            </div>
          </div>
        )}

        {weather && !loading && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>
            <div className="lg:col-span-1">
              <ForecastCard forecast={forecast} />
            </div>
          </div>
        )}

        {!weather && !loading && (
          <div className="text-center">
            <div className="weather-card p-12 max-w-lg mx-auto">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Welcome to WeatherCast</h3>
              <p className="text-muted-foreground">Search for any city to get started with your weather forecast</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
