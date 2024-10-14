"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { OddBet } from "@/app/types";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  oddChoose: OddBet;
};
function Modal({ isOpen, setIsOpen, oddChoose }: Props) {
  const { toast } = useToast();
  const [moneyBet, setMoneyBet] = useState(0);
  const handleConfirm = () => {
    const dataSubmit = {
      ...oddChoose,
      money_bet: moneyBet,
      userid: 1
    };
    console.log(dataSubmit);
    toast({
      title: "Confirm bet",
      description: "Your bet has been confirmed",
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Button to open dialog */}

      {/* Dialog component */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>
            Confirm bet -{" "}
            <span className="text-blue-300">{oddChoose.market}</span>{" "}
          </DialogTitle>
          <DialogDescription>
            <p className="text-lg text-black font-bold">
              {oddChoose.home_team || oddChoose.away_team || ""}
            </p>
            <p className="font-semibold">
              Odd: {oddChoose.odd}{" "}
              <span className="text-green-500">{oddChoose.rate}</span>
            </p>
            <Input
              value={moneyBet}
              onChange={(e) => setMoneyBet(Number(e.target.value))}
              min={0}
              max={9999999999}
              step={1000}
              type="number"
            />
          </DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant={"destructive"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant={"default"}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
