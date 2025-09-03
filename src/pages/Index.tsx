import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VendorDashboard } from "./VendorDashboard";
import { CustomerView } from "./CustomerView";
import { MapPin, Store, Users, Smartphone, Clock, Navigation } from "lucide-react";

type View = "landing" | "vendor" | "customer";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("landing");

  if (currentView === "vendor") {
    return <VendorDashboard onBack={() => setCurrentView("landing")} />;
  }

  if (currentView === "customer") {
    return <CustomerView onBack={() => setCurrentView("landing")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <Badge className="bg-primary text-primary-foreground mb-4">
              Real-time Shop Status
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ShopMap
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Never visit a closed shop again! Vendors update their status with one tap, 
              customers see real-time availability on an interactive map.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                onClick={() => setCurrentView("customer")}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Find Shops Near Me
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setCurrentView("vendor")}
              >
                <Store className="h-5 w-5 mr-2" />
                I'm a Shop Owner
              </Button>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Shop Owners</h3>
              <p className="text-muted-foreground mb-4">Vendor Dashboard</p>
              <ul className="text-sm text-left space-y-2">
                <li>• Login with phone + OTP</li>
                <li>• Pin your shop on Google Maps</li>
                <li>• Toggle open/closed with one tap</li>
              </ul>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Customers</h3>
              <p className="text-muted-foreground mb-4">Customer App</p>
              <ul className="text-sm text-left space-y-2">
                <li>• See shops on interactive map</li>
                <li>• Green markers = Open shops</li>
                <li>• Get directions instantly</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Map Legend Preview */}
        <Card className="mb-16">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-6">Live Status Indicators</h3>
            <div className="flex justify-center gap-8 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-success rounded-full"></div>
                <span>Shop is Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive rounded-full"></div>
                <span>Shop is Closed</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time updates with timestamps - "Updated 2 mins ago"
            </p>
          </CardContent>
        </Card>

        {/* MVP Stats */}
        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-center mb-8">90-Day MVP Goal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500</div>
                <div className="text-muted-foreground">Vendors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">1</div>
                <div className="text-muted-foreground">Pilot City</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">Live</div>
                <div className="text-muted-foreground">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
