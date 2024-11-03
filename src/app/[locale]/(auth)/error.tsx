'use client';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  ScrollArea,
} from '@/components';
import { AlertOctagon, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const t = useTranslations('Error');

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <AlertOctagon className="h-12 w-12 animate-pulse text-destructive" />
          </div>
          <CardTitle className="text-center text-3xl font-bold">{t('title.default')}</CardTitle>
          <CardDescription className="text-center">{t('description.default')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-4">
            <Button
              variant="destructive"
              onClick={() => reset()}
              className="flex items-center space-x-2"
            >
              <RefreshCcw className="h-4 w-4" />
              <span>{t('button')}</span>
            </Button>
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex w-full items-center space-x-2">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                <span>{isOpen ? t('details.hide') : t('details.show')}</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <ScrollArea className="h-[200px] rounded-md border p-4">
                <h3 className="mb-2 font-semibold">{t('details.title')}</h3>
                <p className="text-sm">{error.message}</p>
                {error.digest && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-semibold">{t('details.id')}:</span> {error.digest}
                  </p>
                )}
                <pre className="mt-4 whitespace-pre-wrap break-words text-xs">{error.stack}</pre>
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
