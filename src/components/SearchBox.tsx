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
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for any city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="glass-input pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary/50 transition-all duration-300"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading}
          className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-soft"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={loading}
          className="h-14 px-4 rounded-2xl glass-input border-2 hover:border-primary/50 transition-all duration-300"
          title="Use current location"
        >
          <MapPin className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};