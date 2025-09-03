import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapView } from "@/components/MapView";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerViewProps {
  onBack: () => void;
}

// Mock shop data
const mockShops = [
  {
    id: "1",
    name: "Green Valley Grocery",
    category: "Grocery Store",
    address: "123 Main Street, Downtown",
    isOpen: true,
    lastUpdated: "2 mins ago",
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: "2", 
    name: "City Pharmacy",
    category: "Chemist",
    address: "456 Health Avenue, Medical District",
    isOpen: false,
    lastUpdated: "15 mins ago",
    coordinates: { lat: 28.6149, lng: 77.2095 }
  },
  {
    id: "3",
    name: "Spice Junction",
    category: "Food Stall",
    address: "789 Food Court, Market Area",
    isOpen: true,
    lastUpdated: "5 mins ago",
    coordinates: { lat: 28.6155, lng: 77.2085 }
  },
  {
    id: "4",
    name: "Fresh Mart",
    category: "Grocery Store", 
    address: "321 Shopping Complex, Central",
    isOpen: true,
    lastUpdated: "1 min ago",
    coordinates: { lat: 28.6145, lng: 77.2100 }
  },
  {
    id: "5",
    name: "Quick Bites",
    category: "Food Stall",
    address: "654 Street Food Lane, Old City",
    isOpen: false,
    lastUpdated: "25 mins ago", 
    coordinates: { lat: 28.6130, lng: 77.2080 }
  }
];

const categories = ["All", "Grocery Store", "Chemist", "Food Stall"];

export const CustomerView = ({ onBack }: CustomerViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const filteredShops = selectedCategory === "All" 
    ? mockShops 
    : mockShops.filter(shop => shop.category === selectedCategory);

  const openShops = filteredShops.filter(shop => shop.isOpen).length;
  const totalShops = filteredShops.length;

  const handleGetDirections = (shop: any) => {
    toast({
      title: "Opening Google Maps",
      description: `Getting directions to ${shop.name}...`,
      duration: 3000,
    });

    // In a real app, this would open Google Maps with directions
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${shop.coordinates.lat},${shop.coordinates.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Find Shops</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Currently Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {openShops}/{totalShops}
              </p>
              <p className="text-sm text-muted-foreground">Shops currently open</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-success text-success-foreground">
                Live updates
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Filter by category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                  {category !== "All" && (
                    <Badge variant="secondary" className="ml-2">
                      ({mockShops.filter(s => s.category === category).length})
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <MapView shops={filteredShops} onGetDirections={handleGetDirections} />

        {/* Legend */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Map Legend</h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span className="text-sm">Open shops</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive rounded-full"></div>
                <span className="text-sm">Closed shops</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};