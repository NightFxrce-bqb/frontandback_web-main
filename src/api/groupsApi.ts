import type GroupInterface from '@/types/GroupInterface';

export const getGroupsApi = async (): Promise<GroupInterface[]> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? '/api/';
    const url = `${baseUrl}groups`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const groups = await response.json() as GroupInterface[];
    return groups;
  }
  catch (err) {
    console.log('>>> getGroupsApi', err);
    return [] as GroupInterface[];
  }
};

export const createGroupApi = async (name: string): Promise<GroupInterface | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? '/api/';
    const url = `${baseUrl}groups`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const group = await response.json() as GroupInterface;
    return group;
  }
  catch (err) {
    console.log('>>> createGroupApi', err);
    return null;
  }
};

export const updateGroupApi = async (id: number, name: string): Promise<GroupInterface | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? '/api/';
    const url = `${baseUrl}groups/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const group = await response.json() as GroupInterface;
    return group;
  }
  catch (err) {
    console.log('>>> updateGroupApi', err);
    return null;
  }
};

export const deleteGroupApi = async (id: number): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? '/api/';
    const url = `${baseUrl}groups/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return true;
  }
  catch (err) {
    console.log('>>> deleteGroupApi', err);
    return false;
  }
};
