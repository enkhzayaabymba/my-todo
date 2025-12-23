"use client";

import { FC } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

type LoginRequiredDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const LoginRequiredDialog: FC<LoginRequiredDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  const handleGoToLogin = () => {
    onOpenChange(false);
    router.push("/login");
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Нэвтрэх шаардлагатай</AlertDialogTitle>
            <AlertDialogDescription>
              Task нэмэхийн өмнө эхлээд аккаунтаараа нэвтэрнэ үү.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleGoToLogin}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Нэвтрэх хуудас руу очих
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoginRequiredDialog;
