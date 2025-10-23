import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { File, FileImage, Film } from "lucide-react";

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
        <div className="flex justify-center gap-6">
          <label className="flex max-sm:flex-col items-center gap-1 cursor-pointer border-2 border-gray-300 p-2 rounded-lg">
            <File className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
            <p>File PDF</p>
          </label>
          <label className="flex max-sm:flex-col items-center gap-1 cursor-pointer border-2 border-gray-300  p-2 rounded-lg">
            <FileImage className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
            <p>Gambar</p>
          </label>
          <label className="flex max-sm:flex-col items-center gap-1 cursor-pointer border-2 border-gray-300  p-2 rounded-lg">
            <Film className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
            <p>Video</p>
          </label>
        </div>
        <DrawerFooter className="md:w-[60%] lg:w-[50%] xl:w-[40%]  md:mx-auto">
          <Button className="bg-black  text-white cursor-pointer">
            Submit
          </Button>
          <DrawerClose asChild>
            <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
