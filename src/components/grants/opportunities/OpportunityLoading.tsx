
import React from "react";
import { Loader2 } from "lucide-react";

export const OpportunityLoading: React.FC = () => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading opportunity details...</p>
      </div>
    </div>
  );
};
