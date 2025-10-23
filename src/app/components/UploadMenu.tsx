import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Camera, File, FileImage, Film, Image } from "lucide-react";

interface IUploadMenu {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function UploadMenu({ open, setOpen }: IUploadMenu) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upload Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center gap-10">
          <label className="flex items-center gap-2 cursor-pointer border-3 border-gray-300 p-2 rounded-full">
            <File className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer border-3 border-gray-300  p-2 rounded-full">
            <FileImage className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer border-3 border-gray-300  p-2 rounded-full">
            <Film className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
          </label>
        </div>
        <DrawerFooter>
          <Button className="bg-black text-white">Submit</Button>
          <DrawerClose asChild>
            <Button variant={"destructive"} className="bg-red-600">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
