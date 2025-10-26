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
import React from "react";

interface IUploadMenu {
  open: boolean;
  setOpen: (value: boolean) => void;
  onUpload: (file: File) => void;
}

export default function UploadMenu({ open, setOpen, onUpload }: IUploadMenu) {
  // fungsi untuk upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
      setOpen(false);
    }
    console.log(file);
  };
  if (!open) return null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upload Menu</DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center gap-6">
          {/* PDF Options */}
          {/* <label className="flex max-sm:flex-col items-center gap-1 cursor-pointer border-2 border-gray-300 p-2 rounded-lg">
            <File className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
            <p>File PDF</p>
          </label> */}
          {/* ---- OPSI GAMBAR ---- */}
          <label className="flex max-sm:flex-col items-center gap-1 cursor-pointer border-2 border-gray-300  p-2 rounded-lg">
            <File className="text-gray-600 size-10" />
            <input type="file" className="hidden" onChange={handleFileChange} />
            <div className="flex flex-col">
              <p>Gambar</p>
              <p className="text-xs text-red-400">Max size 10MB</p>
            </div>
          </label>

          {/* ---- OPSI VIDEO ---- */}
          {/* <label className="flex max-sm:flex-col items-center gap-1 cursor-pointer border-2 border-gray-300  p-2 rounded-lg">
            <Film className="text-gray-600 size-10" />
            <input type="file" className="hidden" />
            <p>Video</p>
          </label> */}
        </div>
        <DrawerFooter className="md:w-[60%] lg:w-[50%] xl:w-[40%]  md:mx-auto">
          {/* <Button className="bg-black  text-white cursor-pointer">
            Submit
          </Button> */}
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
