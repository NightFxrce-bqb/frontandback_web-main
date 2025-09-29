import { useQuery } from '@tanstack/react-query';
import { getGroupsApi } from '@/api/groupsApi';
import type GroupInterface from '@/types/GroupInterface';

interface GroupsHookInterface {
  groups: GroupInterface[];
  refetch: () => void;
}

const useGroups = (): GroupsHookInterface => {
  const { data, refetch } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroupsApi(),
    enabled: true,
  });

  return {
    groups: data ?? [],
    refetch: () => refetch(),
  };
};

export default useGroups;
