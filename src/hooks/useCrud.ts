import { mutateData } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface CrudHookProps {
  modelName: string;
  baseUrl: string;
}

export const useCrud = ({ modelName, baseUrl }: CrudHookProps) => {
  const t = useTranslations('common');
  const queryClient = useQueryClient();

  // Mutation hook for creating
  const useCreate = () => {
    return useMutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationFn: async (data: any) => {
        const response = await mutateData(`${baseUrl}/create-${modelName}`, data);

        // Check if response is not successful
        if (!response.ok && response.status !== 200) {
          throw new Error(response.message);
        }

        return response;
      },
      onMutate: () => {
        // Show loading toast when mutation starts
        toast.loading(t('creating'));
      },
      onSuccess: () => {
        // Clear loading toast and show success
        toast.dismiss();
        toast.success(t('created'));
        queryClient.invalidateQueries({ queryKey: [modelName] });
      },
      onError: (error: Error) => {
        // Clear loading toast and show error
        toast.dismiss();
        toast.error(t(error.message));
      },
    });
  };

  // Mutation hook for updating
  const useUpdate = () => {
    return useMutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationFn: async ({ id, data }: { id: string; data: any }) => {
        const response = await mutateData(`${baseUrl}/${id}/update-${modelName}`, data);

        // Check if response is not successful
        if (!response.ok && response.status !== 200) {
          throw new Error(response.message);
        }

        return response;
      },
      onMutate: () => {
        // Show loading toast when mutation starts
        toast.loading(t('updating'));
      },
      onSuccess: () => {
        // Clear loading toast and show success
        toast.dismiss();
        toast.success(t('updated'));
        queryClient.invalidateQueries({ queryKey: [modelName] });
      },
      onError: (error: Error) => {
        // Clear loading toast and show error
        toast.dismiss();
        toast.error(t(error.message));
      },
    });
  };

  // Mutation hook for deleting
  const useDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const response = await mutateData(`${baseUrl}/${id}/delete-${modelName}`, {});

        // Check if response is not successful
        if (!response.ok && response.status !== 200) {
          throw new Error(response.message);
        }
      },
      onMutate: () => {
        // Show loading toast when mutation starts
        toast.loading(t('updating'));
      },
      onSuccess: () => {
        // Clear loading toast and show success
        toast.dismiss();
        toast.success(t('updated'));
        queryClient.invalidateQueries({ queryKey: [modelName] });
      },
      onError: (error: Error) => {
        // Clear loading toast and show error
        toast.dismiss();
        toast.error(t(error.message));
      },
    });
  };

  return {
    useCreate,
    useUpdate,
    useDelete,
  };
};
