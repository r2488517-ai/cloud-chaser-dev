import { useEffect } from "react";
import { SearchBox } from "@/components/SearchBox";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { useWeather } from "@/hooks/useWeather";
import { Cloud } from "lucide-react";

const Index = () => {
  const { weather, forecast, loading, fetchWeather } = useWeather();

  useEffect(() => {
    // Load default weather for London on page load
    fetchWeather("London");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-default">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="w-8 h-8 text-primary mr-2" />
            <h1 className="text-4xl font-bold text-white">Weather Forecast</h1>
          </div>
          <p className="text-lg text-white/80">Get accurate weather information for any location</p>
        </div>

        {/* Search Box */}
        <SearchBox onSearch={fetchWeather} loading={loading} />

        {/* Weather Display */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading weather data...</p>
          </div>
        )}

        {weather && !loading && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Weather */}
            <div className="lg:col-span-2">
              <WeatherCard weather={weather} />
            </div>

            {/* Forecast */}
            <div className="lg:col-span-1">
              <ForecastCard forecast={forecast} />
            </div>
          </div>
        )}

        {!weather && !loading && (
          <div className="text-center py-12">
            <Cloud className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <p className="text-white/75 text-lg">Search for a location to see weather information</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
