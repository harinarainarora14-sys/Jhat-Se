import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Store } from "lucide-react";

interface VendorToggleProps {
  shopName: string;
  address: string;
  category: string;
  isOpen: boolean;
  lastUpdated: string;
  onToggle: (isOpen: boolean) => void;
}

export const VendorToggle = ({ 
  shopName, 
  address, 
  category, 
  isOpen, 
  lastUpdated, 
  onToggle 
}: VendorToggleProps) => {
  const getStatusBadge = () => {
    return (
      <Badge 
        className={isOpen 
          ? "bg-success text-success-foreground" 
          : "bg-destructive text-destructive-foreground"}
      >
        {isOpen ? "Currently Open" : "Currently Closed"}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              {shopName}
            </CardTitle>
            <Badge variant="outline" className="mt-2">{category}</Badge>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{address}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Shop Status</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Clock className="h-4 w-4" />
              <span>Last updated {lastUpdated}</span>
            </div>
          </div>
          <Switch
            checked={isOpen}
            onCheckedChange={onToggle}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          Toggle your shop status to help customers know when you're available. 
          Updates are shown to customers instantly on the map.
        </p>
      </CardContent>
    </Card>
  );
};