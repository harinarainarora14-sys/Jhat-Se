import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VendorToggle } from "@/components/VendorToggle";
import { ArrowLeft, Store, BarChart3, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorDashboardProps {
  onBack: () => void;
}

export const VendorDashboard = ({ onBack }: VendorDashboardProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("2 mins ago");
  const { toast } = useToast();

  const handleToggle = (newStatus: boolean) => {
    setIsOpen(newStatus);
    setLastUpdated("just now");

    toast({
      title: `Shop ${newStatus ? "Opened" : "Closed"}`,
      description: `Your shop status has been updated. Customers can now see you're ${newStatus ? "open" : "closed"}.`,
      duration: 3000,
    });
  };

  // Mock shop data
  const shopData = {
    name: "Green Valley Grocery",
    address: "123 Main Street, Downtown",
    category: "Grocery Store"
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        </div>

        {/* Main Toggle Card */}
        <VendorToggle
          shopName={shopData.name}
          address={shopData.address}
          category={shopData.category}
          isOpen={isOpen}
          lastUpdated={lastUpdated}
          onToggle={handleToggle}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Views Today</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">47</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Direction Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" size="lg">
            <BarChart3 className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" size="lg">
            <Settings className="h-4 w-4 mr-2" />
            Edit Shop Details
          </Button>
        </div>

        {/* Info */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">How it works:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Toggle your shop status in real-time</li>
              <li>• Customers see green markers when you're open</li>
              <li>• Red markers show when you're closed</li>
              <li>• Your location is pinned on the customer map</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};