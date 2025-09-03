import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation } from "lucide-react";

interface Shop {
  id: string;
  name: string;
  category: string;
  address: string;
  isOpen: boolean;
  lastUpdated: string;
  coordinates: { lat: number; lng: number };
}

interface ShopCardProps {
  shop: Shop;
  onGetDirections: (shop: Shop) => void;
}

export const ShopCard = ({ shop, onGetDirections }: ShopCardProps) => {
  const getStatusColor = (isOpen: boolean) => {
    return isOpen ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground";
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{shop.name}</h3>
            <Badge variant="outline" className="mt-1">
              {shop.category}
            </Badge>
          </div>
          <Badge className={getStatusColor(shop.isOpen)}>
            {shop.isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
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
          onClick={() => onGetDirections(shop)}
          className="w-full"
          variant="outline"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
      </CardContent>
    </Card>
  );
};