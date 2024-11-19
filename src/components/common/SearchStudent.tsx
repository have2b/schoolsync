'use client';

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  ScrollArea,
} from '@/components';
import api from '@/lib/api';
import { SearchStudentsRes } from '@/server/student';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface SearchStudentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchStudent = ({ isOpen, onClose }: SearchStudentProps) => {
  const params = useParams();
  const rosterId = (params.id as string) || '';
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<SearchStudentsRes[]>([]);
  const [searchResults, setSearchResults] = useState<SearchStudentsRes[]>([]);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: string) => {
      const response = await api.post('/students/search', {
        name: body,
        rosterId: Number(rosterId),
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch students');
      }
      setSearchResults(response.data.data);
      return response.data.data;
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(t(error.message));
    },
  });

  const { mutate: addStudents, isPending: isAdding } = useMutation({
    mutationFn: async (body: SearchStudentsRes[]) => {
      const response = await api.post('/grades/add-students', {
        studentIds: body.map((s) => s.id),
        rosterId: Number(rosterId),
      });
      if (response.data.status !== 204) {
        throw new Error('Failed to add students');
      }

      return response.data;
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success(t('common.status.studentAdded'));
      queryClient.invalidateQueries({ queryKey: ['grade'] });
      onClose();
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(t(error.message));
    },
  });

  const handleStudentSelect = (student: SearchStudentsRes, checked: boolean) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, student]);
    } else {
      setSelectedStudents((prev) => prev.filter((s) => s.id !== student.id));
    }
  };

  const handleAddSelected = () => {
    console.log('Selected students:', selectedStudents);
    // Add your logic here
    // Add selected student to the roster
    addStudents(selectedStudents);
    setSelectedStudents([]); // Clear selections after adding
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      setSelectedStudents([]);
      mutate(searchTerm);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setSelectedStudents([]);
        setSearchResults([]); // Clear search results
        setSearchTerm(''); // Also clear search term
        onClose();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('common.search.studentSearch')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2 top-2.5 size-4 text-gray-500" />
              <Input
                placeholder={t('common.search.studentNamePlaceholder')}
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
            <Button
              onClick={handleSearchClick}
              disabled={!searchTerm.trim() || isPending || isAdding}
              type="button"
            >
              {t('common.actions.search')}
            </Button>
          </div>

          <div className="rounded-md border">
            {isPending || isAdding ? (
              <div className="p-4 text-center">{t('common.status.searching')}</div>
            ) : searchResults?.length > 0 ? (
              <ScrollArea className="h-80 rounded-md border p-4">
                <ul className="space-y-2 p-4">
                  {searchResults.map((student: SearchStudentsRes) => (
                    <li key={student.id} className="flex items-center gap-2 text-gray-700">
                      <Checkbox
                        checked={selectedStudents.some((s) => s.id === student.id)}
                        onCheckedChange={(checked) =>
                          handleStudentSelect(student, checked as boolean)
                        }
                      />
                      {student.name}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div className="p-4 text-center text-gray-500">{t('common.search.noResult')}</div>
            )}
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="default"
            disabled={selectedStudents.length === 0 || isAdding}
            onClick={handleAddSelected}
          >
            {t('common.actions.add')} ({selectedStudents.length})
          </Button>
          <Button variant="secondary" className="text-white" onClick={onClose}>
            {t('common.actions.cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
