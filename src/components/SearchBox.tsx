import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { toast } from "sonner";

interface SearchBoxProps {
  onSearch: (location: string) => void;
  loading: boolean;
}

export const SearchBox = ({ onSearch, loading }: SearchBoxProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }
    onSearch(location.trim());
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onSearch(`${latitude},${longitude}`);
        toast.success("Using your current location");
      },
      (error) => {
        toast.error("Unable to get your location");
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Enter city name..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 bg-glass border-glass backdrop-blur-glass"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="px-6"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={loading}
          className="px-3 bg-glass border-glass backdrop-blur-glass hover:bg-glass/50"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};