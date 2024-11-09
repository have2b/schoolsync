'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const LangSwitch = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const localActive = useLocale();

  const onSelectChange = (nextLocale: string) => {
    // const nextLocale = e.target.value;

    // Get the path segments after the locale
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.slice(2).join('/');

    // Construct the new path
    const newPath = pathWithoutLocale ? `/${nextLocale}/${pathWithoutLocale}` : `/${nextLocale}`;

    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={localActive} disabled={isPending}>
      <SelectTrigger className="w-[150px] bg-white">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="vi">
          <div className="flex items-center justify-start gap-2">
            <div className="relative size-8">
              <Image src={'/vn-flag.svg'} alt="vn-flag" fill />
            </div>
            <span className="font-medium">Tiếng Việt</span>
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center justify-start gap-2">
            <div className="relative size-8">
              <Image src={'/us-flag.svg'} alt="us-flag" fill />
            </div>
            <span className="font-medium">English</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
