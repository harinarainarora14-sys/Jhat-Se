import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, List, Map as MapIcon } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  category: string;
  address: string;
  isOpen: boolean;
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
}

interface MapViewProps {
  shops: Shop[];
  onGetDirections: (shop: Shop) => void;
}

export const MapView = ({ shops, onGetDirections }: MapViewProps) => {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const MapPlaceholder = () => (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
      <MapIcon className="h-16 w-16 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
      <p className="text-muted-foreground max-w-md">
        Google Maps integration will show real-time shop locations with color-coded markers
      </p>
      {/* Mock markers */}
      <div className="flex gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-success rounded-full"></div>
          <span className="text-sm">Open Shops</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-destructive rounded-full"></div>
          <span className="text-sm">Closed Shops</span>
        </div>
      </div>
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {shops.map((shop) => (
        <Card key={shop.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold">{shop.name}</h4>
                <Badge variant="outline" className="mt-1">
                  {shop.category}
                </Badge>
              </div>
              <Badge 
                className={shop.isOpen 
                  ? "bg-success text-success-foreground" 
                  : "bg-destructive text-destructive-foreground"}
              >
                {shop.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{shop.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Updated {shop.lastUpdated}</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onGetDirections(shop)}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Nearby Shops</h2>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="rounded-md"
            >
              <MapIcon className="h-4 w-4 mr-2" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-md"
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>
        
        {viewMode === "map" ? <MapPlaceholder /> : <ListView />}
      </CardContent>
    </Card>
  );
};