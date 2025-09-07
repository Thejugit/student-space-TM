"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

export default function LeaveRequestDialog() {
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [tillDate, setTillDate] = useState<Date | undefined>(undefined);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Apply New</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-lg border-[#E2E8F0]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#1E3A8A]">
            Leave Request
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input 
            placeholder="Subject" 
            className="border-[#E2E8F0] focus:border-[#1E3A8A]" 
          />
          <Input 
            placeholder="Reason" 
            className="border-[#E2E8F0] focus:border-[#1E3A8A]" 
          />

          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left text-muted-foreground">
                  {fromDate ? format(fromDate, "dd-MM-yyyy") : "Date from"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left text-muted-foreground">
                  {tillDate ? format(tillDate, "dd-MM-yyyy") : "Date till"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-80" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={tillDate} onSelect={setTillDate} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="submit" 
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
