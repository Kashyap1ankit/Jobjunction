"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const PWAInstallButton = () => {
  return (
    <Button className="flex items-center gap-2">
      <Download size={16} />
      Install App
    </Button>
  );
};

export default PWAInstallButton;
