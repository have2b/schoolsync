import { fetchData, mutateData } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface CrudHookProps {
  modelName: string;
  baseUrl: string;
}

export const useCrud = ({ modelName, baseUrl }: CrudHookProps) => {
  const t = useTranslations('common');
  const queryClient = useQueryClient();

  // Get data by id hook
  const useGet = (id: string) => {
    return useQuery({
      queryKey: [`${modelName}`, id],
      queryFn: async () => {
        const response = await fetchData(`${baseUrl}/${id}/get-by-id`);

        if (response.status !== 200) {
          throw new Error(response.message);
        }

        return response.data;
      },
    });
  };

  // Mutation hook for creating
  const useCreate = () => {
    return useMutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationFn: async (data: any) => {
        const response = await mutateData(`${baseUrl}/create`, data, 'post');

        // Check if response is not successful
        if (response.status !== 201) {
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
        const response = await mutateData(`${baseUrl}/${id}/update`, data, 'put');

        // Check if response is not successful
        if (response.status !== 204) {
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
        const response = await mutateData(`${baseUrl}/${id}/delete`, {}, 'delete');

        // Check if response is not successful
        if (response.status !== 204) {
          throw new Error(response.message);
        }
      },
      onMutate: () => {
        // Show loading toast when mutation starts
        toast.loading(t('deleting'));
      },
      onSuccess: () => {
        // Clear loading toast and show success
        toast.dismiss();
        toast.success(t('deleted'));
        queryClient.invalidateQueries({ queryKey: [modelName] });
      },
      onError: (error: Error) => {
        // Clear loading toast and show error
        toast.dismiss();
        toast.error(t(error.message));
      },
    });
  };

  // Mutation hook for bulk deleting
  const useBulkDelete = () => {
    return useMutation({
      mutationFn: async (ids: string[]) => {
        const response = await mutateData(`${baseUrl}/bulk-delete`, ids, 'post');

        // Check if response is not successful
        if (response.status !== 204) {
          throw new Error(response.message);
        }
      },
      onMutate: () => {
        // Show loading toast when mutation starts
        toast.loading(t('deleting'));
      },
      onSuccess: () => {
        // Clear loading toast and show success
        toast.dismiss();
        toast.success(t('deleted'));
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
    useGet,
    useCreate,
    useUpdate,
    useDelete,
    useBulkDelete,
  };
};
